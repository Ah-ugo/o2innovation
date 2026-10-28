'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useApi } from '@/components/useApi';
import { CheckCircle2 } from 'lucide-react';

const inp = 'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';

export default function Applications() {
  const [n, bump] = useState(0);
  const listQuery = useApi<any[]>('/admin/applications', n);
  const list = listQuery.data ?? [];
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  // Bulk import state
  const [bulkCSV, setBulkCSV] = useState('');
  const [bulkMsg, setBulkMsg] = useState('');

  // Manual enrol state
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualCourse, setManualCourse] = useState('');
  const [manualMsg, setManualMsg] = useState('');
  const courses = useApi<any[]>('/courses').data ?? [];

  async function act(id: string, what: string) {
    try {
      const r = await api(`/admin/applications/${id}/${what}`, { method: 'POST' });
      setMsg(r.temp_password
        ? `Account created. Temporary password: ${r.temp_password}`
        : 'Done.');
      bump(n + 1);
    } catch (e: any) { setMsg(e.message); }
  }

  async function bulkImport() {
    try {
      const rows = bulkCSV.trim().split('\n').map(line => {
        const [name, email, course] = line.split(',').map(s => s.trim());
        return { name, email, course_id: course };
      });
      const r = await api('/admin/bulk-enroll', { method: 'POST', body: JSON.stringify({ students: rows }) });
      setBulkMsg(`Imported ${r.count} students.`);
      setBulkCSV('');
      bump(n + 1);
    } catch (e: any) { setBulkMsg(e.message); }
  }

  async function manualEnrol() {
    try {
      const r = await api('/admin/enroll', { method: 'POST', body: JSON.stringify({ name: manualName, email: manualEmail, course_id: manualCourse }) });
      setManualMsg(`Enrolled. Temp password: ${r.temp_password}`);
      setManualName(''); setManualEmail(''); setManualCourse('');
      bump(n + 1);
    } catch (e: any) { setManualMsg(e.message); }
  }

  const visible = list.filter(a =>
    (filter === 'all' || a.status === filter) &&
    (!search || a.full_name?.toLowerCase().includes(search.toLowerCase()) || a.email?.includes(search))
  );

  const counts = { all: list.length, pending: list.filter(a => a.status === 'pending').length, approved: list.filter(a => a.status === 'approved').length, rejected: list.filter(a => a.status === 'rejected').length };

  if (listQuery.loading && !listQuery.data) return <div aria-label="Loading applications" aria-busy="true" className="animate-pulse space-y-5 p-6"><div className="h-16 rounded-2xl bg-white" />{[0,1,2,3,4].map(i => <div key={i} className="h-20 rounded-xl bg-white" />)}</div>;

  return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold md:text-3xl">Applications</h1>
        <p className="mt-0.5 text-sm text-[#0a0e2a]/60">Review and manage student applications, manually enrol students, and bulk-import.</p>
      </div>

      <div className="space-y-6 p-6">
        {msg && (
          <div role="status" className="flex items-center gap-2 rounded-xl border border-[#ff8c1e]/30 bg-[#ff8c1e]/10 p-4 text-sm font-medium">
            <CheckCircle2 size={17} />{msg}
          </div>
        )}

        {/* Filter + search */}
        <div className="flex flex-wrap items-center gap-3">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition
                ${filter === f ? 'bg-[#010f6b] text-white' : 'border border-[#0a0e2a]/20 text-[#0a0e2a] hover:bg-[#0a0e2a]/5'}`}>
              {f} <span className="ml-1 opacity-60">({counts[f]})</span>
            </button>
          ))}
          <label className="ml-auto grid gap-1 text-xs font-semibold">Search applications<input className={`${inp} max-w-xs`} placeholder="Name or email" value={search} onChange={e => setSearch(e.target.value)} /></label>
        </div>

        {/* Applications list */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white shadow-sm overflow-hidden">
          {visible.length === 0 && (
            <p className="p-8 text-center text-sm text-[#0a0e2a]/50">No applications found.</p>
          )}
          {visible.map((a: any, i: number) => (
            <div key={a.id} className={`flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between
              ${i !== 0 ? 'border-t border-[#0a0e2a]/8' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#010f6b] font-bold text-white">
                  {a.full_name?.[0]}
                </div>
                <div>
                  <p className="font-semibold">{a.full_name}</p>
                  <p className="text-xs text-[#0a0e2a]/60">{a.email} · {a.phone} · {a.mode}</p>
                  {a.course && <p className="text-xs text-[#0a0e2a]/60">Course: {a.course}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize
                  ${a.status === 'pending'  ? 'bg-[#ff8c1e]/20 text-[#ff8c1e]' : ''}
                  ${a.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : ''}
                  ${a.status === 'rejected' ? 'bg-red-100 text-red-700'        : ''}`}>
                  {a.status}
                </span>
                {a.status === 'pending' && (
                  <>
                    <button onClick={() => act(a.id, 'approve')}
                      className="rounded-full bg-[#010f6b] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition">
                      Approve
                    </button>
                    <button onClick={() => act(a.id, 'reject')}
                      className="rounded-full border border-[#0a0e2a]/20 px-4 py-1.5 text-sm font-semibold hover:bg-[#0a0e2a]/5 transition">
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Manual enrolment */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Manual enrolment</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-medium">Full name<input className={inp} placeholder="Enter full name" value={manualName} onChange={e => setManualName(e.target.value)} /></label>
            <label className="grid gap-1 text-sm font-medium">Email address<input className={inp} placeholder="you@example.com" type="email" value={manualEmail} onChange={e => setManualEmail(e.target.value)} /></label>
            <label className="grid gap-1 text-sm font-medium">Course<select className={inp} value={manualCourse} onChange={e => setManualCourse(e.target.value)}>
              <option value="">Select course…</option>
              {courses.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select></label>
          </div>
          <button onClick={manualEnrol}
            className="mt-3 rounded-full bg-[#010f6b] px-6 py-2 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition">
            Enrol student
          </button>
          {manualMsg && <p role="status" className="mt-2 flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16} />{manualMsg}</p>}
        </div>

        {/* Bulk CSV import */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-lg font-bold">Bulk import via CSV</h2>
          <p className="mb-3 text-xs text-[#0a0e2a]/60">One student per line: <code>Full Name, email@example.com, course-slug</code></p>
          <label className="grid gap-1 text-sm font-medium">Student list (one per line)<textarea rows={5} className={inp} placeholder={`Ada Obi, ada@example.com, data-science\nEmeka Eze, emeka@example.com, cyber-security`}
            value={bulkCSV} onChange={e => setBulkCSV(e.target.value)} />
          </label>
          <button onClick={bulkImport}
            className="mt-3 rounded-full bg-[#ff8c1e] px-6 py-2 text-sm font-semibold text-[#0a0e2a] hover:brightness-105 transition">
            Import students
          </button>
          {bulkMsg && <p role="status" className="mt-2 flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16} />{bulkMsg}</p>}
        </div>
      </div>
    </div>
  );
}

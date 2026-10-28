'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useApi } from '@/components/useApi';
import { Check, X } from 'lucide-react';

const inp = 'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';

export default function Students() {
  const [n, bump] = useState(0);
  const listQuery = useApi<any[]>('/admin/enrollments', n);
  const list = listQuery.data ?? [];
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [msg, setMsg] = useState('');

  const coursesQuery = useApi<any[]>('/courses');
  const dbCourses = coursesQuery.data ?? [];
  const courses = [...new Set([...dbCourses.map((c: any) => c.title), ...list.map((s: any) => s.course)].filter(Boolean))];

  const visible = list.filter((s: any) =>
    (courseFilter === 'all' || s.course === courseFilter) &&
    (!search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.includes(search))
  );

  if (listQuery.loading && !listQuery.data) return <div aria-label="Loading students" aria-busy="true" className="animate-pulse space-y-5 p-6"><div className="h-16 rounded-2xl bg-white" />{[0,1,2,3,4].map(i => <div key={i} className="h-14 rounded-xl bg-white" />)}</div>;

  async function resetPassword(userId: string) {
    try {
      const r = await api(`/admin/students/${userId}/reset-password`, { method: 'POST' });
      setMsg(`New temp password for student: ${r.temp_password}`);
    } catch (e: any) { setMsg(e.message); }
  }

  return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold md:text-3xl">Students</h1>
        <p className="mt-0.5 text-sm text-[#0a0e2a]/60">{list.length} total enrolments</p>
      </div>

      <div className="space-y-5 p-6">
        {msg && (
          <div className="rounded-xl border border-[#ff8c1e]/30 bg-[#ff8c1e]/10 p-4 text-sm font-medium">
            {msg} <button onClick={() => setMsg('')} aria-label="Dismiss message" className="ml-3 text-[#0a0e2a]/50 hover:text-[#0a0e2a]"><X size={16} /></button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="student-search">Search students by name or email</label><input id="student-search" className={`${inp} max-w-xs`} placeholder="Search name or email…"
            value={search} onChange={e => setSearch(e.target.value)} />
          <label className="grid gap-1 text-xs font-semibold">Filter by course<select className={`${inp} max-w-[200px]`} value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
            <option value="all">All courses</option>
            {courses.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select></label>
          <span className="text-sm text-[#0a0e2a]/60">{visible.length} shown</span>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#f6f7fb] text-xs uppercase tracking-wide text-[#0a0e2a]/60">
                <tr>
                  {['Student', 'Course', 'Progress', 'Score', 'Assignments', 'Certified', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0a0e2a]/8">
                {visible.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-[#0a0e2a]/50">No students found.</td></tr>
                )}
                {visible.map((s: any, i: number) => (
                  <tr key={i} className="hover:bg-[#f6f7fb] transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#010f6b] text-xs font-bold text-white">
                          {s.name?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-xs text-[#0a0e2a]/60">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{s.course}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-[#0a0e2a]/10">
                          <div className="h-1.5 rounded-full bg-[#010f6b]" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span>{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{s.score != null ? `${s.score}%` : '—'}</td>
                    <td className="px-4 py-3">{s.assignments_submitted ?? 0} submitted</td>
                    <td className="px-4 py-3">
                      {s.certified
                        ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700"><Check size={13} />Yes</span>
                        : <span className="text-[#0a0e2a]/40">No</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => resetPassword(s.user_id)}
                        className="text-xs font-semibold text-[#010f6b] underline hover:no-underline">
                        Reset pwd
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

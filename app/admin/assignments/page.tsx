'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useApi } from '@/components/useApi';
import { CheckCircle2, LoaderCircle, X } from 'lucide-react';

const inp = 'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';

export default function Assignments() {
  const [n, bump] = useState(0);
  const { data: assignments, loading, err } = useApi<any[]>('/admin/assignments', n);
  const list = assignments ?? [];
  const [grade, setGrade] = useState<{ id: string; score: string; feedback: string } | null>(null);
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  const isGraded = (a: any) => a.status === 'graded' || a.graded === true;
  const visible = list.filter((a: any) => filter === 'all' || (filter === 'pending' ? !isGraded(a) : isGraded(a)));
  const pending = list.filter((a: any) => !isGraded(a)).length;

  async function submitGrade() {
    if (!grade || saving) return;
    setSaving(true);
    try {
      await api(`/admin/assignments/${grade.id}/grade`, {
        method: 'POST',
        body: JSON.stringify({ grade: `${grade.score}/100`, score: +grade.score, feedback: grade.feedback }),
      });
      setMsg('Grade submitted.');
      setGrade(null);
      bump(n + 1);
    } catch (e: any) { setMsg(e.message); } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold md:text-3xl">Assignments</h1>
        <p className="mt-0.5 text-sm text-[#0a0e2a]/60">
          {pending} pending grade{pending !== 1 ? 's' : ''} · {list.length} total submissions
        </p>
      </div>

      <div className="space-y-5 p-6">
        {msg && (
          <div role="status" className="flex items-center gap-2 rounded-xl border border-[#ff8c1e]/30 bg-[#ff8c1e]/10 p-4 text-sm font-medium">
            <CheckCircle2 size={17} />{msg} <button onClick={() => setMsg('')} aria-label="Dismiss message" className="ml-auto text-[#0a0e2a]/40 hover:text-[#0a0e2a]"><X size={16} /></button>
          </div>
        )}

        {/* Grade modal */}
        {grade && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
              <h2 className="text-xl font-bold">Grade assignment</h2>
              <label className="grid gap-1 text-sm font-medium">Score (0–100)<input className={inp} type="number" min={0} max={100} placeholder="Enter score" value={grade.score} onChange={e => setGrade({ ...grade, score: e.target.value })} /></label>
              <label className="grid gap-1 text-sm font-medium">Feedback for student<textarea className={inp} rows={4} placeholder="Write feedback" value={grade.feedback} onChange={e => setGrade({ ...grade, feedback: e.target.value })} /></label>
              <div className="flex gap-3">
                <button onClick={submitGrade} disabled={saving}
                  className="rounded-full bg-[#010f6b] px-6 py-2 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition">
                  <span className="inline-flex items-center gap-2">{saving && <LoaderCircle className="size-4 animate-spin" />}{saving ? 'Submitting' : 'Submit grade'}</span>
                </button>
                <button onClick={() => setGrade(null)}
                  className="rounded-full border border-[#0a0e2a]/20 px-6 py-2 text-sm font-semibold hover:bg-[#0a0e2a]/5 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(['all', 'pending', 'graded'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition
                ${filter === f ? 'bg-[#010f6b] text-white' : 'border border-[#0a0e2a]/20 text-[#0a0e2a] hover:bg-[#0a0e2a]/5'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Assignment list */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white shadow-sm overflow-hidden">
          {loading && visible.length === 0 && <div aria-label="Loading assignments" aria-busy="true" className="space-y-3 p-5">{[0,1,2].map(i => <div key={i} className="h-16 animate-pulse rounded-xl bg-ink/5" />)}</div>}
          {err && <p role="alert" className="p-5 text-sm text-red-700">{err}</p>}
          {!loading && !err && visible.length === 0 && (
            <p className="p-8 text-center text-sm text-[#0a0e2a]/50">No assignments here.</p>
          )}
          {visible.map((a: any, i: number) => (
            <div key={a.id} className={`flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between
              ${i !== 0 ? 'border-t border-[#0a0e2a]/8' : ''}`}>
              <div>
                <p className="font-semibold">{a.student_name}</p>
                <p className="text-sm text-[#0a0e2a]/60">
                  {a.course} · Lesson: {a.lesson_title}
                </p>
                <p className="text-xs text-[#0a0e2a]/50">
                  Submitted: {new Date(a.submitted_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {a.file_url && (
                  <a href={a.file_url} target="_blank" rel="noreferrer"
                    className="text-sm font-semibold text-[#010f6b] underline">
                    View file ↗
                  </a>
                )}
                {isGraded(a) ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {a.score}/100 graded
                  </span>
                ) : (
                  <button onClick={() => setGrade({ id: a.id, score: '', feedback: '' })}
                    className="rounded-full bg-[#ff8c1e] px-4 py-2 text-sm font-semibold text-[#0a0e2a] hover:brightness-105 transition">
                    Grade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { api, upload } from '@/lib/api';
import { courseImg, photo } from '@/lib/data';
import { CheckCircle2, LoaderCircle, X } from 'lucide-react';

const inp = 'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';

const blank = {
  title: '', summary: '', price: 0, modes: ['onsite', 'online'],
  thumbnail: '', pass_mark: 70, slug: '', level: 'Beginner',
  instructor: '', what_you_learn: [] as string[], requirements: [] as string[],
  lessons: [] as any[], quiz: [] as any[],
};

const blankLesson = (mod = 'Module 1') => ({
  module: mod, title: '', kind: 'recorded', url: '', description: '',
  minutes: 0, resources: [], quiz: [], assignment: '',
});

export default function CoursesAdmin() {
  const [list, setList] = useState<any[]>([]);
  const [c, setC] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const load = () => { setLoading(true); setLoadError(''); api('/admin/courses').then(setList).catch((e: any) => setLoadError(e.message)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  async function save() {
    if (saving) return;
    setSaving(true);
    const { id, ...body } = c;
    try {
      await api(id ? `/admin/courses/${id}` : '/admin/courses', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(body),
      });
      setMsg('Course saved.');
      setC(null);
      load();
    } catch (e: any) { setMsg(e.message); } finally { setSaving(false); }
  }

  const up = (k: string, v: any) => setC({ ...c, [k]: v });
  const setL = (i: number, k: string, v: any) =>
    up('lessons', c.lessons.map((l: any, j: number) => j === i ? { ...l, [k]: v } : l));
  const setQ = (i: number, k: string, v: any) =>
    up('quiz', c.quiz.map((q: any, j: number) => j === i ? { ...q, [k]: v } : q));
  const setLQ = (li: number, qi: number, k: string, v: any) =>
    setL(li, 'quiz', (c.lessons[li].quiz || []).map((q: any, j: number) => j === qi ? { ...q, [k]: v } : q));

  if (!c) return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Courses</h1>
          <p className="mt-0.5 text-sm text-[#0a0e2a]/60">{list.length} courses total</p>
        </div>
        <button onClick={() => setC(blank)}
          className="shrink-0 rounded-full bg-[#010f6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition">
          + New course
        </button>
      </div>
      <div className="space-y-4 p-6">
        {msg && <p role="status" className="flex items-center gap-2 rounded-xl bg-[#ff8c1e]/10 p-3 text-sm font-medium"><CheckCircle2 size={17} />{msg}</p>}
        {loading && <div aria-label="Loading courses" aria-busy="true" className="space-y-4">{[0,1,2].map(i => <div key={i} className="h-24 animate-pulse rounded-2xl bg-white" />)}</div>}
        {loadError && <p role="alert" className="text-sm text-red-700">{loadError}</p>}
        {!loading && !loadError && list.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink/60">No courses yet. Create your first course to begin.</p>}
        {!loading && !loadError && list.map((x: any) => (
          <div key={x.id}
            className="flex flex-col gap-3 rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img src={x.thumbnail || photo(courseImg[x.slug] || '1517694712202-14dd9538aa97')} alt="" className="h-14 w-20 rounded-lg object-cover bg-navy/10" />
              <div>
                <p className="font-bold">{x.title}</p>
                <p className="text-sm text-[#0a0e2a]/60">
                  {x.lessons?.length ?? 0} lessons · {x.quiz?.length ?? 0} final questions · {x.level}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setC(x)}
                className="rounded-full border border-[#010f6b] px-4 py-1.5 text-sm font-semibold text-[#010f6b] hover:bg-[#010f6b]/5 transition">
                Edit
              </button>
              <button onClick={async () => { await api(`/admin/courses/${x.id}`, { method: 'DELETE' }); load(); }}
                className="rounded-full border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{c.id ? 'Edit course' : 'New course'}</h1>
        <button onClick={() => setC(null)}
          className="rounded-full border border-[#0a0e2a]/20 px-4 py-2 text-sm font-semibold hover:bg-[#0a0e2a]/5 transition">
          ← Back
        </button>
      </div>

      <div className="space-y-6 p-6">
        {msg && <p className="rounded-xl bg-[#ff8c1e]/10 p-3 text-sm font-medium">{msg}</p>}

        {/* Basic info */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-lg">Basic info</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-xs font-semibold">Course title<input className={inp} placeholder="e.g. Data Analytics" value={c.title} onChange={e => up('title', e.target.value)} /></label>
            <label className="grid gap-1 text-xs font-semibold">Course URL slug<input className={inp} placeholder="e.g. data-science" value={c.slug} onChange={e => up('slug', e.target.value)} /></label>
          </div>
          <label className="grid gap-1 text-xs font-semibold">Course summary<textarea className={inp} rows={3} placeholder="Describe the course" value={c.summary} onChange={e => up('summary', e.target.value)} /></label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-1 text-xs font-semibold">Level<input className={inp} placeholder="Beginner, intermediate…" value={c.level} onChange={e => up('level', e.target.value)} /></label>
            <label className="grid gap-1 text-xs font-semibold">Instructor<input className={inp} placeholder="Instructor name" value={c.instructor} onChange={e => up('instructor', e.target.value)} /></label>
            <label className="grid gap-1 text-xs font-semibold">Course price (₦)<input className={inp} type="number" placeholder="50000" value={c.price} onChange={e => up('price', +e.target.value)} /></label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-xs font-semibold">Final test pass mark (%)<input className={inp} type="number" min="0" max="100" value={c.pass_mark} onChange={e => up('pass_mark', +e.target.value)} /></label>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#0a0e2a]/20 px-3 py-2.5 text-sm bg-white">
              <span className="text-[#0a0e2a]/60">Thumbnail:</span>
              {c.thumbnail && <img src={c.thumbnail} alt="" className="h-6 w-10 rounded object-cover" />}
              <span className="font-medium text-[#010f6b]">{c.thumbnail ? 'Change' : 'Upload'}</span>
              <input type="file" hidden onChange={async e => e.target.files && up('thumbnail', await upload(e.target.files[0]))} />
            </label>
          </div>
          <label className="grid gap-1 text-xs font-semibold">Learning outcomes, one per line<textarea className={inp} rows={3} placeholder="What learners will learn" value={(c.what_you_learn || []).join('\n')} onChange={e => up('what_you_learn', e.target.value.split('\n'))} /></label>
          <label className="grid gap-1 text-xs font-semibold">Prerequisites, one per line<textarea className={inp} rows={2} placeholder="What learners need" value={(c.requirements || []).join('\n')} onChange={e => up('requirements', e.target.value.split('\n'))} /></label>
        </div>

        {/* Lessons */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Lessons ({c.lessons.length})</h2>
            <button onClick={() => up('lessons', [...c.lessons, blankLesson(c.lessons.at(-1)?.module)])}
              className="rounded-full border border-[#010f6b] px-4 py-1.5 text-sm font-semibold text-[#010f6b] hover:bg-[#010f6b]/5 transition">
              + Add lesson
            </button>
          </div>

          {c.lessons.map((l: any, i: number) => (
            <div key={i} className="rounded-xl border border-[#0a0e2a]/10 bg-[#f6f7fb] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Lesson {i + 1}</span>
                <button onClick={() => up('lessons', c.lessons.filter((_: any, j: number) => j !== i))}
                  className="text-red-600 text-xs font-semibold hover:underline">Remove</button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-xs font-semibold">Module name<input className={inp} placeholder="e.g. Module 1" value={l.module} onChange={e => setL(i, 'module', e.target.value)} /></label>
                <label className="grid gap-1 text-xs font-semibold">Lesson title<input className={inp} placeholder="Lesson title" value={l.title} onChange={e => setL(i, 'title', e.target.value)} /></label>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-xs font-semibold">Lesson format<select className={inp} value={l.kind} onChange={e => setL(i, 'kind', e.target.value)}>
                  <option value="recorded">Recorded (YouTube / Cloudinary)</option>
                  <option value="live">Live (Google Meet link)</option>
                </select></label>
                <label className="grid gap-1 text-xs font-semibold">Lesson video or meeting URL<input className={inp}
                  placeholder={l.kind === 'live' ? 'Google Meet URL' : 'YouTube or Cloudinary video URL'}
                  value={l.url} onChange={e => setL(i, 'url', e.target.value)} /></label>
              </div>
              {l.kind === 'live' && (
                <label className="grid gap-1 text-xs font-semibold">Live class start time<input className={inp} type="datetime-local" value={l.starts_at?.slice(0, 16) || ''}
                  onChange={e => setL(i, 'starts_at', e.target.value)} /></label>
              )}
              {l.kind === 'recorded' && (
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm">
                  <span className="text-[#010f6b] font-medium">Upload video file</span>
                  <input type="file" accept="video/*" hidden
                    onChange={async e => e.target.files && setL(i, 'url', await upload(e.target.files[0]))} />
                </label>
              )}
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-xs font-semibold">Lesson description<textarea className={inp} rows={2} placeholder="Describe the lesson" value={l.description} onChange={e => setL(i, 'description', e.target.value)} /></label>
                <label className="grid gap-1 text-xs font-semibold">Resources, one URL per line<textarea className={inp} rows={2} placeholder="https://…" value={(l.resources || []).join('\n')} onChange={e => setL(i, 'resources', e.target.value.split('\n').filter(Boolean))} /></label>
              </div>
              <label className="grid gap-1 text-xs font-semibold">Duration (minutes)<input className={inp} type="number" min="0" value={l.minutes || 0} onChange={e => setL(i, 'minutes', +e.target.value)} /></label>
              <label className="grid gap-1 text-xs font-semibold">Assignment instructions (optional)<textarea className={inp} rows={2} placeholder="Explain the work learners should submit" value={l.assignment || ''} onChange={e => setL(i, 'assignment', e.target.value)} /></label>

              {/* In-lesson quiz */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">In-lesson quiz ({(l.quiz || []).length} questions)</span>
                  <button onClick={() => setL(i, 'quiz', [...(l.quiz || []), { q: '', options: ['', '', '', ''], answer: 0 }])}
                    className="text-xs font-semibold text-[#010f6b] hover:underline">+ Add question</button>
                </div>
                {(l.quiz || []).map((q: any, qi: number) => (
                  <div key={qi} className="rounded-lg border border-[#0a0e2a]/10 bg-white p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 text-xs font-semibold">Question<input className={`${inp} mt-1`} placeholder="Write a question" value={q.q} onChange={e => setLQ(i, qi, 'q', e.target.value)} /></label>
                      <button onClick={() => setL(i, 'quiz', (l.quiz || []).filter((_: any, j: number) => j !== qi))}
                        aria-label="Remove question" className="shrink-0 text-red-600 text-xs font-semibold"><X size={16} /></button>
                    </div>
                    <label className="grid gap-1 text-xs font-semibold">Answer choices, separated by commas<input className={inp} placeholder="Choice A, Choice B, Choice C" value={(q.options || []).join(',')} onChange={e => setLQ(i, qi, 'options', e.target.value.split(','))} /></label>
                    <label className="grid gap-1 text-xs font-semibold">Correct choice number, starting at 0<input className={inp} type="number" min="0" max={(q.options || []).length - 1} value={q.answer} onChange={e => setLQ(i, qi, 'answer', +e.target.value)} /></label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final test */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Final test ({c.quiz.length} questions)</h2>
            <button onClick={() => up('quiz', [...c.quiz, { q: '', options: ['', '', '', ''], answer: 0 }])}
              className="rounded-full border border-[#010f6b] px-4 py-1.5 text-sm font-semibold text-[#010f6b] hover:bg-[#010f6b]/5 transition">
              + Add question
            </button>
          </div>
          {c.quiz.map((q: any, i: number) => (
            <div key={i} className="rounded-xl border border-[#0a0e2a]/10 bg-[#f6f7fb] p-4 space-y-2">
              <div className="flex items-center gap-2">
                <label className="flex-1 text-xs font-semibold">Question {i + 1}<input className={`${inp} mt-1`} placeholder="Write a question" value={q.q} onChange={e => setQ(i, 'q', e.target.value)} /></label>
                <button onClick={() => up('quiz', c.quiz.filter((_: any, j: number) => j !== i))}
                  aria-label="Remove question" className="shrink-0 text-red-600 text-sm font-bold"><X size={16} /></button>
              </div>
              <label className="grid gap-1 text-xs font-semibold">Answer choices, separated by commas<input className={inp} placeholder="Choice A, Choice B, Choice C" value={(q.options || []).join(',')} onChange={e => setQ(i, 'options', e.target.value.split(','))} /></label>
              <label className="grid gap-1 text-xs font-semibold">Correct choice number, starting at 0<input className={inp} type="number" min="0" max={(q.options || []).length - 1} value={q.answer} onChange={e => setQ(i, 'answer', +e.target.value)} /></label>
            </div>
          ))}
        </div>

        {/* Save */}
        <div className="flex gap-3">
          <button onClick={save} disabled={saving}
            className="rounded-full bg-[#010f6b] px-8 py-3 font-semibold text-white hover:bg-[#010f6b]/90 transition">
            <span className="inline-flex items-center gap-2">{saving && <LoaderCircle className="size-4 animate-spin" />}{saving ? 'Saving course' : 'Save course'}</span>
          </button>
          <button onClick={() => setC(null)}
            className="rounded-full border border-[#0a0e2a]/20 px-6 py-3 font-semibold text-[#0a0e2a] hover:bg-[#0a0e2a]/5 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { use, useState } from 'react';
import { Check, CirclePlay, Star, Video } from 'lucide-react';
import { api } from '@/lib/api';
import { useApi } from '@/components/useApi';
import Ring from '@/components/Ring';
import Discussion from '@/components/Discussion';
import { courseImg, photo } from '@/lib/data';
export default function CourseHome({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, err, loading } = useApi<any>(`/learn/course/${id}`);
  const [tab, setTab] = useState('Overview');
  const [stars, setStars] = useState(0);
  const [cm, setCm] = useState('');
  const [sent, setSent] = useState(false);
  const [finalTestHint, setFinalTestHint] = useState<string | null>(null);
  if (loading && !data) return <CourseSkeleton />;
  if (err) {
    if (err.includes('not enrolled') || err.includes('403')) {
      return (
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h1 className="text-3xl font-bold">Enroll to access this course</h1>
          <p className="mt-3 text-ink/70">You need to be enrolled to view course content. Apply for admission or contact an admin.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/training#apply" className="rounded-full bg-flame px-6 py-3 font-semibold text-ink">Apply for course</Link>
            <Link href="/learn/catalogue" className="rounded-full border border-ink/30 px-6 py-3 font-semibold">Browse courses</Link>
          </div>
        </div>
      );
    }
    return <p role="alert">{err}</p>;
  }
  if (!data?.course) return <p role="alert" className="rounded-xl bg-white p-6">Course data could not be loaded. Please refresh the page.</p>;
  const { course: c, completed = [] } = data;
  const mods: Record<string, any[]> = {};
  const lessons = c.lessons || [];
  lessons.forEach((l: any, i: number) =>
    (mods[l.module || 'Module 1'] ||= []).push({ ...l, i }),
  );
  const pct = Math.round(
    (100 * completed.length) / Math.max(lessons.length, 1),
  );
  const done = completed.length >= lessons.length && lessons.length > 0;
  const mins = lessons.reduce((a: number, l: any) => a + (l.minutes || 0), 0);
  return (
    <div className="max-w-6xl grid gap-8">
      <section className="relative overflow-hidden rounded-3xl bg-navy text-white">
        <img
          src={
            c.thumbnail ||
            photo(courseImg[c.slug] || '1517694712202-14dd9538aa97')
          }
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="text-flame font-semibold">
              {c.level} · {c.language}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-1">{c.title}</h1>
            <p className="mt-3 text-white/85 max-w-2xl">{c.summary}</p>
            <p className="mt-3 text-sm text-white/75">
              {data.rating ? <span className="inline-flex items-center gap-1"><Star size={14} className="fill-current" /> {data.rating} ({data.reviews?.length ?? 0} reviews) · </span> : ''}
              {lessons.length} lessons ·{' '}
              {Math.round((mins / 60) * 10) / 10 || '-'} hours · by{' '}
              {c.instructor}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/learn/courses/${id}/play?l=${Math.min(completed.length, Math.max(lessons.length - 1, 0))}`}
                className="rounded-full bg-flame text-ink px-7 py-3 font-semibold"
              >
                {completed.length ? 'Resume' : 'Start course'}
              </Link>
              {c.quiz_size > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (!done) {
                      setFinalTestHint(
                        'Finish all lessons before unlocking the final test.',
                      );
                      return;
                    }
                    setFinalTestHint(null);
                    window.location.href = `/learn/courses/${id}/test`;
                  }}
                  className={`rounded-full border px-7 py-3 ${done ? 'border-white bg-white/10 text-white' : 'border-white/30 text-white/40'}`}
                >
                  Final test{done ? '' : ' (finish lessons first)'}
                </button>
              )}
            </div>
            {finalTestHint && (
              <p className="mt-3 text-sm text-flame">{finalTestHint}</p>
            )}
          </div>
          <div className="text-white text-center">
            <Ring p={pct} size={110} />
            <p className="text-sm">
              {completed.length}/{lessons.length} done
            </p>
          </div>
        </div>
      </section>
      <nav
        className="flex gap-6 border-b border-ink/15"
        aria-label="Course sections"
      >
        {['Overview', 'Syllabus', 'Discussion', 'Reviews'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 font-semibold ${tab === t ? 'border-b-4 border-flame' : 'text-ink/60'}`}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab === 'Overview' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">What you will learn</h2>
            <ul className="mt-4 grid gap-2">
              {(c.what_you_learn?.filter(Boolean).length
                ? c.what_you_learn
                : [
                    'Practical skills you can use immediately',
                    'Real projects with feedback',
                  ]
              ).map((w: string) => (
                <li key={w} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-flame" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Requirements</h2>
            <ul className="mt-4 grid gap-2 list-disc pl-5">
              {(c.requirements?.filter(Boolean).length
                ? c.requirements
                : ['A phone or computer and internet access']
              ).map((w: string) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mt-8">Instructor</h2>
            <p className="mt-2 flex items-center gap-3">
              <span className="grid place-items-center size-12 rounded-full bg-navy text-white font-bold">
                {c.instructor?.[0]}
              </span>
              {c.instructor}
            </p>
          </div>
        </div>
      )}
      {tab === 'Syllabus' && (
        <div className="grid gap-4">
          {Object.entries(mods).map(([m, ls]) => (
            <details
              key={m}
              open
              className="rounded-2xl bg-white overflow-hidden"
            >
              <summary className="px-5 py-4 font-bold cursor-pointer bg-ink/5">
                {m} · {ls.filter((l) => completed.includes(l.i)).length}/
                {ls.length}
              </summary>
              {ls.map((l) => (
                <Link
                  key={l.i}
                  href={`/learn/courses/${id}/play?l=${l.i}`}
                  className="flex items-center gap-3 px-5 py-3 border-t border-ink/10 hover:bg-paper"
                >
                  <span
                    className={`grid place-items-center size-7 rounded-full text-xs ${completed.includes(l.i) ? 'bg-navy text-white' : 'border border-ink/30'}`}
                  >
                    {completed.includes(l.i) ? <Check size={15} /> : l.kind === 'live' ? <Video size={14} /> : <CirclePlay size={15} />}
                  </span>
                  <span className="flex-1">{l.title}</span>
                  <span className="text-sm text-ink/60">
                    {l.kind === 'live' ? 'Live' : 'Video'}
                    {l.minutes ? ` · ${l.minutes} min` : ''}
                  </span>
                </Link>
              ))}
            </details>
          ))}
          {lessons.length === 0 && (
            <p className="text-ink/60">Lessons are being added.</p>
          )}
        </div>
      )}
      {tab === 'Discussion' && <Discussion cid={id} />}
      {tab === 'Reviews' && (
        <div className="grid gap-4 max-w-2xl">
          <div className="rounded-2xl bg-white p-5">
            <p className="font-bold">Rate this course</p>
            <div
              className="flex gap-1 mt-2"
              role="radiogroup"
              aria-label="Stars"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  role="radio"
                  aria-checked={stars === n}
                  aria-label={`${n} stars`}
                  onClick={() => setStars(n)}
                  className={`text-3xl ${n <= stars ? 'text-flame' : 'text-ink/20'}`}
                >
                  <Star aria-hidden="true" className="inline size-6 fill-current" />
                </button>
              ))}
            </div>
            <label className="mt-3 grid gap-1 text-sm font-medium">Your review<textarea
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              placeholder="Share your experience"
              rows={3}
              className="w-full rounded-lg border border-ink/20 p-3"
            /></label>
            <button
              disabled={!stars}
              onClick={async () => {
                await api(`/learn/${id}/rate`, {
                  method: 'POST',
                  body: JSON.stringify({ stars, comment: cm }),
                });
                setSent(true);
              }}
              className="mt-3 rounded-full bg-navy text-white px-6 py-2 disabled:opacity-40"
            >
              {sent ? 'Thanks!' : 'Submit review'}
            </button>
          </div>
          {(data.reviews || []).map((r: any) => (
            <div key={r.id} className="rounded-xl bg-white p-4">
              <p className="flex text-flame" aria-label={`${r.stars} stars`}>{Array.from({length: r.stars}, (_, i) => <Star key={i} size={15} className="fill-current" />)}</p>
              <p className="font-semibold">{r.name}</p>
              <p className="text-ink/75">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
      {data.certificate && (
        <Link
          href="/learn/certificates"
          className="rounded-2xl bg-flame p-6 font-bold"
        >
          <span className="inline-flex items-center gap-2"><Check size={18} /> You earned a certificate. View it</span>
        </Link>
      )}
    </div>
  );
}

function CourseSkeleton() {
  return <div aria-label="Loading course" aria-busy="true" className="max-w-6xl animate-pulse space-y-8">
    <div className="h-72 rounded-3xl bg-navy/10" />
    <div className="h-10 w-2/3 rounded bg-ink/10" />
    <div className="grid gap-4 md:grid-cols-2">{[0, 1, 2, 3].map((n) => <div key={n} className="h-28 rounded-2xl bg-white" />)}</div>
  </div>;
}

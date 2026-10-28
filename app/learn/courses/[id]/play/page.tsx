'use client';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { api, embed } from '@/lib/api';
import { useApi } from '@/components/useApi';
import Discussion from '@/components/Discussion';

export default function Player({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const idx = Number(useSearchParams().get('l') ?? 0);
  const { data, err, loading } = useApi<any>(`/learn/course/${id}`);
  const [done, setDone] = useState<number[]>([]);
  const [note, setNote] = useState('');
  const [tab, setTab] = useState('Overview');
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [quizBusy, setQuizBusy] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<any[]>([]);
  const [completeBusy, setCompleteBusy] = useState(false);
  const [assignmentUrl, setAssignmentUrl] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [assignment, setAssignment] = useState<any>(null);
  const [assignmentBusy, setAssignmentBusy] = useState(false);
  const [assignmentError, setAssignmentError] = useState('');

  useEffect(() => {
    if (data) setDone(data.completed);
  }, [data]);
  useEffect(() => { setQuizPassed(done.includes(idx)); }, [done, idx]);
  useEffect(() => {
    setNote(localStorage.getItem(`note:${id}:${idx}`) || '');
  }, [id, idx]);
  useEffect(() => {
    if (!data) return;
    api(`/learn/${id}/lessons/${idx}/assignment`).then((value) => {
      setAssignment(value);
      setAssignmentUrl(value?.file_url || '');
      setAssignmentNotes(value?.notes || '');
    }).catch(() => setAssignment(null));
  }, [data, id, idx]);

  if (loading && !data) return <PlayerSkeleton />;
  if (err) return <p role="alert" className="rounded-xl bg-white p-6">{err}</p>;
  if (!data?.course) return <p role="alert" className="rounded-xl bg-white p-6">Course data could not be loaded.</p>;

  const c = data.course,
    l = c.lessons[idx];
  if (!l) return <p>Lesson not found.</p>;

  const pct = Math.round((100 * done.length) / c.lessons.length);
  const last = idx >= c.lessons.length - 1;

  const lessonQuiz = Array.isArray(l.quiz) ? l.quiz : [];

  async function complete() {
    if (completeBusy) return;
    if (lessonQuiz.length && !quizPassed) {
      setQuizResult('Pass the lesson quiz before marking this lesson complete.');
      setTab('Quiz');
      return;
    }
    setCompleteBusy(true);
    try {
      await api(`/learn/${id}/lessons/${idx}/complete`, { method: 'POST' });
      setDone((d) => [...new Set([...d, idx])]);
      location.href = last ? `/learn/courses/${id}` : `/learn/courses/${id}/play?l=${idx + 1}`;
    } catch (e: any) { setQuizResult(e.message); setCompleteBusy(false); }
  }

  async function submitLessonQuiz() {
    if (!lessonQuiz.length || quizBusy) return;
    if (lessonQuiz.some((_: any, i: number) => selectedAnswers[i] === undefined)) {
      setQuizResult('Answer every question before submitting.'); return;
    }
    setQuizBusy(true); setQuizResult(null);
    try {
      const result = await api(`/learn/${id}/lessons/${idx}/quiz`, { method: 'POST', body: JSON.stringify({ answers: lessonQuiz.map((_: any, i: number) => selectedAnswers[i]) }) });
      setQuizResult(result.passed ? `Passed with ${result.score}%. You can continue.` : `You scored ${result.score}%. Review the explanations and try again.`);
      setQuizFeedback(result.feedback || []);
      if (result.passed) { setQuizPassed(true); setDone((d) => [...new Set([...d, idx])]); }
    } catch (e: any) { setQuizResult(e.message); }
    finally { setQuizBusy(false); }
  }

  async function submitAssignment() {
    if (!assignmentUrl.trim() || assignmentBusy) return;
    setAssignmentBusy(true); setAssignmentError('');
    try {
      const result = await api(`/learn/${id}/lessons/${idx}/assignment`, { method: 'POST', body: JSON.stringify({ file_url: assignmentUrl.trim(), notes: assignmentNotes }) });
      setAssignment(result);
      if (!result?.file_url) setAssignment({ file_url: assignmentUrl.trim(), notes: assignmentNotes, status: 'submitted', submitted_at: new Date().toISOString() });
    } catch (e: any) { setAssignmentError(e.message); }
    finally { setAssignmentBusy(false); }
  }

  const m = l.kind === 'recorded' ? embed(l.url) : null;

  return (
    <div className="grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <Link
          href={`/learn/courses/${id}`}
          className="text-sm font-medium text-navy underline"
        >
          {c.title}
        </Link>
        <h1 className="mt-1 text-3xl font-bold">{l.title}</h1>

        <div className="mt-5 overflow-hidden rounded-2xl bg-ink aspect-video">
          {m?.kind === 'iframe' ? (
            <iframe
              src={m.src}
              title={l.title}
              className="h-full w-full"
              allowFullScreen
            />
          ) : m ? (
            <video src={m.src} controls className="h-full w-full" />
          ) : (
            <div className="grid h-full place-items-center p-6 text-center text-white">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
                  Live class
                </p>
                <p className="mt-3 text-2xl font-bold">
                  {l.starts_at
                    ? new Date(l.starts_at).toLocaleString()
                    : 'Time to be announced'}
                </p>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-flame px-8 py-3 font-semibold text-ink"
                >
                  Join on Google Meet
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {idx > 0 && (
            <Link
              href={`/learn/courses/${id}/play?l=${idx - 1}`}
              className="rounded-full border border-ink/30 px-6 py-2"
            >
              Previous
            </Link>
          )}
          <button
            onClick={complete}
            disabled={completeBusy}
            className="rounded-full bg-navy px-6 py-2 font-semibold text-white"
          >
            {completeBusy ? <span className="inline-flex items-center gap-2"><LoaderCircle className="size-4 animate-spin" /> Saving</span> : done.includes(idx)
              ? 'Next'
              : last
                ? 'Complete course'
                : 'Mark complete and continue'}
          </button>
        </div>

        <nav
          className="mt-8 flex flex-wrap gap-5 border-b border-ink/15"
          aria-label="Lesson sections"
        >
          {['Overview', 'Notes', 'Resources', 'Quiz', 'Discussion'].map(
            (item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`pb-3 font-semibold ${tab === item ? 'border-b-4 border-flame text-ink' : 'text-ink/60'}`}
              >
                {item}
              </button>
            ),
          )}
        </nav>

        <div className="mt-6">
          {tab === 'Overview' && (
            <div className="max-w-2xl">
              <p className="text-sm text-ink/60">
                {l.module} ·{' '}
                {l.kind === 'live' ? 'Live class' : 'Recorded lesson'}
                {l.minutes ? ` · ${l.minutes} min` : ''}
              </p>
              <p className="mt-2 text-lg text-ink/80">
                {l.description ||
                  'Work through this lesson, then mark it complete to continue.'}
              </p>
            </div>
          )}

          {tab === 'Notes' && (
            <textarea
              aria-label="My notes"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                localStorage.setItem(`note:${id}:${idx}`, e.target.value);
              }}
              rows={6}
              className="w-full max-w-2xl rounded-xl border border-ink/20 p-3"
              placeholder="Notes are saved on this device."
            />
          )}

          {tab === 'Resources' && (
            <ul className="grid gap-2">
              {l.resources?.length ? (
                l.resources.map((r: string) => (
                  <li key={r}>
                    <a
                      href={r}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy underline"
                    >
                      {r}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-ink/60">No resources for this lesson.</li>
              )}
            </ul>
          )}

          {tab === 'Quiz' && (
            <div className="max-w-2xl rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold">Lesson quiz</h3>
              {!lessonQuiz.length && <p className="mt-3 text-sm text-ink/60">No quiz has been added to this lesson.</p>}
              <div className="mt-4 grid gap-4">
                {lessonQuiz.map((q, i) => (
                  <fieldset key={`${q.q}-${i}`} className="rounded-xl border border-ink/10 p-4">
                    <legend className="px-1 font-semibold">{i + 1}. {q.q}</legend>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((option, optionIndex) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm text-ink/80"
                        >
                          <input
                            type="radio"
                            name={`lessonquiz-${i}`}
                            aria-label={option}
                            disabled={quizResult?.startsWith('Passed')}
                            checked={selectedAnswers[i] === optionIndex}
                            onChange={() =>
                              { setQuizFeedback([]); setQuizResult(null); setSelectedAnswers((prev) => ({
                                ...prev,
                                [i]: optionIndex,
                              })); }
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {quizFeedback[i] && <p className={`mt-3 text-sm ${quizFeedback[i].correct ? 'text-emerald-700' : 'text-ink/70'}`}>{quizFeedback[i].correct ? 'Correct.' : `Review the lesson: the correct answer was “${q.options[quizFeedback[i].correct_answer]}”.`} {quizFeedback[i].explanation}</p>}
                  </fieldset>
                ))}
              </div>
              <button onClick={submitLessonQuiz} disabled={!lessonQuiz.length || quizBusy || quizResult?.startsWith('Passed')} className="mt-5 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-2 font-semibold text-ink disabled:opacity-50">
                {quizBusy && <LoaderCircle className="size-4 animate-spin" />}{quizBusy ? 'Checking answers' : 'Submit quiz'}
              </button>
              {quizResult && (
                <p className="mt-3 text-sm text-navy">{quizResult}</p>
              )}
            </div>
          )}

          {tab === 'Discussion' && <Discussion cid={id} lesson={idx} />}
        </div>
      </div>

      <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm">
        <p className="font-bold">{pct}% complete</p>
        <div className="mt-2 h-2 rounded bg-ink/10">
          <div className="h-2 rounded bg-flame" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-5 rounded-2xl border border-ink/10 bg-paper p-4">
          <p className="font-bold text-ink">Assignment</p>
          <p className="mt-2 text-sm text-ink/60">
            {l.assignment || 'Share a link to your worksheet or project for instructor feedback.'}
          </p>
          {assignment?.status === 'graded' ? <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm"><p className="font-semibold text-emerald-800">Graded · {assignment.score ?? assignment.grade}/100</p><p className="mt-1">{assignment.feedback || 'No written feedback.'}</p></div> : <>
            <label className="mt-4 block text-xs font-semibold">Project or file link<input type="url" value={assignmentUrl} onChange={e => setAssignmentUrl(e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm" /></label>
            <label className="mt-2 block text-xs font-semibold">Notes for your instructor<textarea value={assignmentNotes} onChange={e => setAssignmentNotes(e.target.value)} rows={2} placeholder="Add context for your submission" className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm" /></label>
            <button onClick={submitAssignment} disabled={!assignmentUrl.trim() || assignmentBusy} className="mt-2 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{assignmentBusy && <LoaderCircle className="size-4 animate-spin" />}{assignmentBusy ? 'Submitting' : assignment ? 'Update submission' : 'Submit assignment'}</button>
            {assignment?.status === 'submitted' && <p className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-700"><Check size={15} /> Submitted for instructor review</p>}
          </>}
          {assignmentError && <p role="alert" className="mt-2 text-sm text-red-700">{assignmentError}</p>}
        </div>

        <ol className="mt-4 grid gap-1 text-sm">
          {c.lessons.map((x: any, i: number) => (
            <li key={i}>
              <Link
                href={`/learn/courses/${id}/play?l=${i}`}
                className={`block rounded px-2 py-2 ${i === idx ? 'bg-navy text-white' : 'hover:bg-paper'}`}
              >
                {done.includes(i) ? <Check aria-label="Completed" className="inline size-4" /> : null}
                {x.title}
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

function PlayerSkeleton() {
  return <div aria-label="Loading lesson" aria-busy="true" className="grid max-w-7xl animate-pulse gap-8 lg:grid-cols-[1fr_320px]">
    <div className="space-y-5"><div className="h-6 w-48 rounded bg-ink/10" /><div className="h-10 w-2/3 rounded bg-ink/10" /><div className="aspect-video rounded-2xl bg-ink/10" /><div className="h-12 w-64 rounded-full bg-ink/10" /><div className="h-40 rounded-2xl bg-white" /></div>
    <div className="h-96 rounded-2xl bg-white" />
  </div>;
}

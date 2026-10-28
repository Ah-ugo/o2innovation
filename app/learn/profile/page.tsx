'use client';
import { useApi } from '@/components/useApi';
import { Award, BookOpenCheck, Flag, Star } from 'lucide-react';

export default function StudentProfile() {
  const meQuery = useApi<any>('/me');
  const coursesQuery = useApi<any[]>('/learn/courses');
  const me = meQuery.data;
  const courses = coursesQuery.data ?? [];
  if (meQuery.loading || coursesQuery.loading) return <div aria-label="Loading profile" aria-busy="true" className="mx-auto max-w-6xl animate-pulse space-y-6"><div className="h-40 rounded-3xl bg-navy/10" /><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[0,1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white" />)}</div><div className="h-64 rounded-2xl bg-white" /></div>;
  const completed = courses.reduce((total, m) => total + m.completed.length, 0);
  const avg = courses.length
    ? Math.round(
        courses.reduce((total, m) => total + m.progress, 0) / courses.length,
      )
    : 0;
  const profileBadges = [
    [BookOpenCheck, 'First lesson'],
    [Flag, 'Course complete'],
    [Award, 'Certified'],
    [Star, 'Top scorer'],
  ] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-[28px] bg-navy p-8 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              Student profile
            </p>
            <h1 className="mt-2 text-4xl font-bold">
              {me?.name || 'Your profile'}
            </h1>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80">
            {me?.email || 'student@o2lab.ng'}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Courses enrolled', courses.length],
          ['Lessons completed', completed],
          ['Average progress', `${avg}%`],
          ['Badges earned', 4],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"
          >
            <p className="text-3xl font-extrabold text-navy">{value}</p>
            <p className="mt-2 text-sm text-ink/60">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">Learning summary</h2>
          <ul className="mt-5 space-y-4 text-sm text-ink/75">
            <li className="flex items-center justify-between rounded-xl bg-paper px-4 py-3">
              <span>Current focus</span>
              <strong>{courses[0]?.course?.title || 'No course yet'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-paper px-4 py-3">
              <span>Next live class</span>
              <strong>Thursday, 4:00 PM</strong>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-paper px-4 py-3">
              <span>Latest achievement</span>
              <strong>Course complete badge</strong>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Badges</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {profileBadges.map(([BadgeIcon, title]) => (
              <div key={title} className="rounded-2xl bg-paper p-4 text-center">
                <BadgeIcon aria-hidden="true" className="mx-auto size-8 text-navy" />
                <p className="mt-2 text-xs font-semibold text-ink/75">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

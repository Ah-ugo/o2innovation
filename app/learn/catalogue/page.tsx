'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useApi } from '@/components/useApi';
import { courseImg, photo, naira } from '@/lib/data';
import Reveal from '@/components/Reveal';

const thumb = (c: any) =>
  c.thumbnail || photo(courseImg[c.slug] || '1517694712202-14dd9538aa97');

export default function Catalogue() {
  const { data, loading, err } = useApi<any[]>('/courses');
  const courses = data ?? [];
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesText = `${c.title} ${c.summary}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesLevel = level === 'All' || c.level === level;
      const matchesMode = !onlineOnly || c.modes?.includes('online');
      return matchesText && matchesLevel && matchesMode;
    });
  }, [courses, level, onlineOnly, query]);

  if (loading) return <div aria-label="Loading course catalogue" aria-busy="true" className="mx-auto max-w-7xl animate-pulse space-y-6"><div className="h-52 rounded-3xl bg-navy/10" /><div className="h-16 rounded-2xl bg-white" /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0,1,2,3,4,5].map(i => <div key={i} className="h-72 rounded-2xl bg-white" />)}</div></div>;
  if (err) return <p role="alert" className="rounded-xl bg-white p-5">{err}</p>;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-[28px] bg-navy p-8 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          Course catalogue
        </p>
        <h1 className="mt-2 text-4xl font-bold">
          Find the right course for your next step
        </h1>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1.5fr_200px_auto]">
          <label className="sr-only" htmlFor="course-search">Search courses, skills or topics</label><input
            id="course-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, skills or topics"
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink"
          />

          <label className="sr-only" htmlFor="course-level">Filter by course level</label><select
            id="course-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink"
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <label className="flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
            />
            Online only
          </label>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course, index) => (
          <Reveal key={course.id} delay={index * 0.05}>
          <div className="h-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/learn/courses/${course.id}`}>
              <img
                src={thumb(course)}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
            </Link>
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
                <span>{course.level || 'Beginner'}</span>
                <span>
                  {course.modes?.includes('online') ? 'Online' : 'Onsite'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-ink">{course.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{course.summary}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-bold text-navy">
                  {naira(course.price)}
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/learn/courses/${course.id}`}
                    className="rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white"
                  >
                    View
                  </Link>
                  <Link
                    href={`/learn/courses/${course.id}`}
                    className="rounded-full bg-flame px-3 py-2 text-xs font-semibold text-ink"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          </div></Reveal>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink/70">
          No courses matched your filters. Try a broader search.
        </div>
      )}
    </div>
  );
}

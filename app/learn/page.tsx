"use client";
import Link from "next/link";
import Lottie from "@/components/Lottie";
import Carousel from "@/components/Carousel";
import Ring from "@/components/Ring";
import { useApi } from "@/components/useApi";
import { courseImg, photo, naira } from "@/lib/data";
import LearningGallery from '@/components/LearningGallery';
import Reveal from '@/components/Reveal';
import { Award, BookOpenCheck, Flag, Star, ArrowRight } from 'lucide-react';

const thumb = (c: any) =>
  c.thumbnail || photo(courseImg[c.slug] || "1517694712202-14dd9538aa97");

export default function Dashboard() {
  const mineQuery = useApi<any[]>("/learn/courses");
  const schedQuery = useApi<any[]>("/learn/schedule");
  const allQuery = useApi<any[]>("/courses");
  const meQuery = useApi<any>("/me");
  const mine = mineQuery.data;
  const sched = schedQuery.data;
  const all = allQuery.data;
  const me = meQuery.data;

  if (mineQuery.loading || schedQuery.loading || allQuery.loading || meQuery.loading) return <div aria-label="Loading your dashboard" aria-busy="true" className="mx-auto w-full max-w-7xl animate-pulse space-y-6"><div className="h-64 rounded-3xl bg-navy/10" /><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[0,1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white" />)}</div><div className="grid gap-4 md:grid-cols-2">{[0,1].map(i => <div key={i} className="h-64 rounded-2xl bg-white" />)}</div></div>;

  const lessons =
    mine?.reduce((a, m) => a + m.completed.length, 0) ?? 0;
  const mins =
    mine?.reduce(
      (a, m) =>
        a +
        m.completed.reduce(
          (x: number, i: number) => x + (m.course?.lessons?.[i]?.minutes || 0),
          0,
        ),
      0,
    ) ?? 0;
  const certs = mine?.filter((m) => m.certificate).length ?? 0;
  const active = mine?.filter((m) => m.progress < 100).length ?? 0;
  const avg = mine?.length
    ? Math.round(mine.reduce((a, m) => a + m.progress, 0) / mine.length)
    : 0;
  const next = mine?.find((m) => m.progress < 100) ?? mine?.[0];

  const badges = [
    ["First lesson", lessons > 0, BookOpenCheck],
    ["Course complete", !!mine?.some((m) => m.progress === 100), Flag],
    ["Certified", certs > 0, Award],
    ["Top scorer", !!mine?.some((m) => (m.score ?? 0) >= 90), Star],
  ] as const;

  return (
    /* w-full + overflow-x-hidden prevents any child from causing horizontal scroll */
    <div className="grid w-full max-w-7xl gap-8 overflow-x-hidden">
      {/* Hero banner */}
      <Reveal><section className="relative overflow-hidden rounded-[28px] bg-navy p-8 text-white md:p-10">
        <Lottie
          src="/lottie/pulse.json"
          className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-40"
        />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">
              Welcome back{me?.name ? `, ${me.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
              {next
                ? `You are ${next.progress}% through ${next.course.title}.`
                : "Your courses will appear here once your application is approved."}
            </p>
            {next && (
              <Link
                href={`/learn/courses/${next.course.id}/play?l=${Math.min(
                  next.completed.length,
                  Math.max(next.course.lessons.length - 1, 0),
                )}`}
                className="mt-6 inline-block rounded-full bg-flame px-7 py-3 font-semibold text-ink transition hover:brightness-105"
              >
                Resume learning
              </Link>
            )}
          </div>

          <div className="shrink-0 text-center text-white">
            <Ring p={avg} size={120} />
            <p className="mt-2 text-sm text-white/70">Overall progress</p>
          </div>
        </div>
      </section></Reveal>

      {/* Stats row */}
      <Reveal><section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["In progress", active],
          ["Lessons done", lessons],
          ["Hours learned", (mins / 60).toFixed(1)],
          ["Certificates", certs],
        ].map(([label, value]) => (
          <div
            key={label as string}
            className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm md:p-5"
          >
            <p className="text-2xl font-extrabold text-navy md:text-4xl">
              {value}
            </p>
            <p className="mt-1 text-xs text-ink/60 md:mt-2 md:text-sm">
              {label}
            </p>
          </div>
        ))}
      </section></Reveal>

      {/* My courses + Achievements */}
      <Reveal><section className="grid min-w-0 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* My courses carousel */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">My learning</h2>
            <Link
              href="/learn/catalogue"
              className="text-sm font-semibold text-navy underline"
            >
              Browse catalog
            </Link>
          </div>

          <Carousel label="My courses">
            {mine?.map((m) => (
              <Link
                key={m.course.id}
                href={`/learn/courses/${m.course.id}`}
                className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg md:w-[320px]"
              >
                <img
                  src={thumb(m.course)}
                  alt=""
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-ink">
                      {m.course.title}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-ink/60">
                      {m.certificate
                        ? "Certified"
                        : m.score != null
                          ? `Score ${m.score}%`
                          : `${m.completed.length}/${m.course.lessons.length} lessons`}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Ring p={m.progress} size={52} />
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>

          {mine?.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <Lottie src="/lottie/pulse.json" className="mx-auto w-32" />
              <p className="mt-4 text-ink/70">No courses yet.</p>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="min-w-0">
          <h2 className="mb-4 text-2xl font-bold">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {badges.map(([label, activeState, BadgeIcon]) => (
              <div
                key={label}
                className={`rounded-2xl border p-4 text-center transition ${
                  activeState
                    ? "border-flame bg-white shadow-sm"
                    : "border-transparent bg-ink/5 opacity-50"
                }`}
              >
                <BadgeIcon aria-hidden="true" className="mx-auto size-8 text-navy" />
                <p className="mt-2 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Live classes + Quick actions */}
      <Reveal><section className="grid min-w-0 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Live classes */}
        <div className="min-w-0">
          <h2 className="mb-4 text-2xl font-bold">Upcoming live classes</h2>
          <ul className="grid gap-3">
            {sched?.map((s, i) => {
              const d = new Date(s.starts_at);
              return (
                <li
                  key={i}
                  className="flex min-w-0 items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm"
                >
                  {/* Date badge — fixed width so it never shrinks */}
                  <div className="shrink-0 rounded-xl bg-navy px-3 py-2 text-center text-white">
                    <b className="block text-xl leading-none">{d.getDate()}</b>
                    <span className="text-[10px] uppercase tracking-wide">
                      {d.toLocaleString(undefined, { month: "short" })}
                    </span>
                  </div>

                  {/* Title — takes remaining space, truncates if needed */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{s.title}</p>
                    <p className="truncate text-sm text-ink/60">
                      {s.course} ·{" "}
                      {d.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Join button — fixed, never pushed off */}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-full bg-flame px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Join
                  </a>
                </li>
              );
            })}
            {sched?.length === 0 && (
              <li className="rounded-2xl border border-dashed border-ink/15 p-5 text-center text-ink/60">
                No live classes scheduled yet.
              </li>
            )}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Quick actions</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              ["Explore courses", "/learn/catalogue"],
              ["View certificates", "/learn/certificates"],
              ["Update password", "/learn/password"],
              ["My profile", "/learn/profile"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper px-4 py-3 font-medium text-ink transition hover:border-navy/30 hover:bg-navy/5"
              >
                {label}
                <ArrowRight aria-hidden="true" className="size-4 text-ink/40" />
              </Link>
            ))}
          </div>
        </div>
      </section></Reveal>

      <LearningGallery title="Inside the O2 learning community" limit={3} />

      {/* Explore more */}
      <section className="min-w-0">
        <h2 className="mb-4 text-2xl font-bold">Explore more courses</h2>
        <Carousel label="Recommended">
          {all?.map((c) => (
            <Link
              key={c.id}
              href={c.slug ? `/training/${c.slug}` : "/training"}
              className="w-[75%] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg md:w-[260px]"
            >
              <img
                src={thumb(c)}
                alt=""
                className="h-28 w-full object-cover bg-navy"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="truncate font-bold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm text-ink/60">
                  {c.level || "Beginner"} · {naira(c.price)}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

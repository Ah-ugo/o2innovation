import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import Carousel from "@/components/Carousel";
import Enroll from "@/components/Enroll";
import { Wrap } from "@/components/ui";
import { courseImg, photo, naira, modulesFor, testimonials } from "@/lib/data";
import { getCourse, getCourses } from "@/lib/courses";
import { Check, CirclePlay } from 'lucide-react';

export const dynamicParams = true;

export default async function Course({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCourse(slug);
  if (!c) notFound();

  const allCourses = await getCourses();
  const related = allCourses.filter(x => x.slug !== c.slug);
  const heroImg = c.thumbnail || photo(courseImg[c.slug] || "1517694712202-14dd9538aa97");

  const mods = c.lessons && c.lessons.length > 0
    ? [
        ["Course Curriculum", c.lessons.map((l: any) => l.title || "Lesson")],
        ["Projects & Practice", ["Guided hands-on assignments", "Mentor review & feedback"]],
        ["Assessment & Certification", ["Revision & exam prep", "Final test", "Certificate issuance"]]
      ] as [string, string[]][]
    : modulesFor(c);

  return (
    <main>
      <section className="relative bg-navy text-white overflow-hidden">
        <ParallaxImage src={heroImg} alt="" className="absolute inset-0 h-full w-full opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 grid md:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <div>
            <Link href="/training" className="text-sm text-white/70 underline">All courses</Link>
            <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-[1]">{c.title}</h1>
            <p className="mt-5 text-xl text-white/85 max-w-2xl">{c.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {["Beginner friendly", `${c.weeks} weeks`, c.online ? "Onsite and online" : "Onsite only", "Certificate included"].map(b => (
                <span key={b} className="glass rounded-full px-4 py-1">{b}</span>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl bg-white text-ink p-7 md:sticky md:top-24 shadow-2xl">
            <p className="text-sm text-ink/60">Course fee from</p>
            <p className="text-4xl font-extrabold text-navy">{naira(c.price)}</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li className="flex items-center gap-2"><Check size={16} />Live and recorded classes</li>
              <li className="flex items-center gap-2"><Check size={16} />Projects with mentor feedback</li>
              <li className="flex items-center gap-2"><Check size={16} />Test and verifiable certificate</li>
              <li className="flex items-center gap-2"><Check size={16} />Internship placement support</li>
            </ul>
            <a href="#apply" className="mt-6 block text-center rounded-full bg-flame font-semibold py-3">Apply now</a>
          </aside>
        </div>
      </section>

      <Wrap>
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">What you will learn</h2>
            <ul className="mt-6 grid gap-3">
              {c.outcomes.map((o: string) => (
                <li key={o} className="flex gap-3 text-lg">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-flame" />{o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-3xl md:text-4xl font-bold">Who it is for</h2>
            <p className="mt-6 text-lg text-ink/75">
              Absolute beginners, career changers and students. No experience needed. We take you from zero to a stage where you can learn and build on your own.
            </p>
          </Reveal>
        </div>
      </Wrap>

      <section className="bg-white">
        <Wrap>
          <h2 className="text-3xl md:text-4xl font-bold">Syllabus</h2>
          <div className="mt-8 max-w-3xl grid gap-3">
            {mods.map(([m, ls], i) => (
              <details key={m} open={i === 0} className="rounded-2xl bg-paper p-5">
                <summary className="font-bold text-lg cursor-pointer">
                  Module {i + 1}: {m} <span className="text-sm font-normal text-ink/60">· {ls.length} lessons</span>
                </summary>
                <ul className="mt-3 grid gap-2">
                  {ls.map((l: string) => (
                    <li key={l} className="flex gap-3"><CirclePlay aria-hidden="true" className="size-4 shrink-0" />{l}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Wrap>
      </section>

      <Wrap className="bg-ink text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Choose how you learn</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold">Onsite in Lafia</h3>
            <ul className="mt-4 grid gap-2 text-white/80">
              <li>24/7 electricity and hub computers</li>
              <li>Mentors beside you</li>
              <li>Access to the facility outside class hours</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-flame text-ink p-8">
            <h3 className="text-2xl font-bold">Online on O2 Campus</h3>
            <ul className="mt-4 grid gap-2">
              <li>Live classes on Google Meet</li>
              <li>Recorded lessons to rewatch</li>
              <li>Progress tracking, discussion and tests</li>
              <li>Online certificate</li>
            </ul>
          </div>
        </div>
      </Wrap>

      <Wrap>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What alumni say</h2>
        <Carousel label="Reviews">
          {testimonials.map(t => (
            <figure key={t.name} className="snap-start shrink-0 w-[85%] md:w-[380px] rounded-3xl bg-white p-8">
              <blockquote className="text-lg">“{t.text}”</blockquote>
              <figcaption className="mt-4">
                <b>{t.name}</b><br />
                <span className="text-sm text-ink/60">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Wrap>

      <section id="apply" className="bg-navy text-white">
        <Wrap>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Apply for {c.title}</h2>
            <Enroll courses={[{ id: c.slug, title: c.title }]} />
          </div>
        </Wrap>
      </section>

      <Wrap>
        <h2 className="text-3xl font-bold mb-6">Related courses</h2>
        <Carousel label="Related courses">
          {related.map(r => (
            <Link
              key={r.slug}
              href={`/training/${r.slug}`}
              className="snap-start shrink-0 w-[80%] md:w-[320px] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition"
            >
              <img
                src={r.thumbnail || photo(courseImg[r.slug] || "1517694712202-14dd9538aa97")}
                alt=""
                className="h-36 w-full object-cover bg-navy"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-bold">{r.title}</h3>
                <p className="text-sm text-navy mt-1">From {naira(r.price)}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </Wrap>
    </main>
  );
}

import Link from "next/link";
import { PageHero, Wrap } from "@/components/ui";
import Enroll from "@/components/Enroll";
import { naira, photo, courseImg } from "@/lib/data";
import { getCourses } from "@/lib/courses";
import LearningGallery from '@/components/LearningGallery';

export const metadata = { title: "Training | O2 Innovations Lab" };

export default async function Training() {
  const list = await getCourses();

  return (
    <main>
      <PageHero
        title="Learn tech skills onsite or online"
        text="Beginner-friendly courses that take you from zero to building on your own."
      />
      <Wrap>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-navy text-white p-8">
            <h2 className="text-2xl font-bold">Onsite in Lafia</h2>
            <p className="mt-2 text-white/75">24/7 power, hub computers, mentors beside you, internship placement.</p>
          </div>
          <div className="rounded-3xl bg-flame text-ink p-8">
            <h2 className="text-2xl font-bold">Online e-learning</h2>
            <p className="mt-2">Live classes, recorded lessons, progress tracking, tests and a verifiable certificate.</p>
          </div>
        </div>

        <div className="my-12 md:my-16">
          <LearningGallery title="Learn together. Build together." />
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {list.map(c => (
            <Link
              key={c.slug}
              href={`/training/${c.slug}`}
              className="rounded-2xl bg-white overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
            >
              <img
                src={c.thumbnail || photo(courseImg[c.slug] || "1517694712202-14dd9538aa97")}
                alt=""
                className="h-44 w-full object-cover bg-navy"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-ink/70">{c.blurb}</p>
                <p className="mt-4 font-semibold text-navy">
                  From {naira(c.price)} · {c.weeks} weeks
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Wrap>
      <Wrap className="bg-navy text-white">
        <div id="apply" className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Apply for the next batch</h2>
          <Enroll courses={list.map(c => ({ id: c.slug, title: c.title }))} />
        </div>
      </Wrap>
    </main>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Lottie from "@/components/Lottie";
import ParallaxImage from "@/components/ParallaxImage";

const learningPhotos = [
  {
    src: "/images/learning/classroom-mentoring.png",
    alt: "An instructor guiding learners through a practical technology session",
    title: "Learn by doing",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/learning/workshop-presenter.jpg",
    alt: "A facilitator presenting a workshop to O2 learners in Lafia",
    title: "Ideas in action",
    className: "",
  },
  {
    src: "/images/learning/graduation.png",
    alt: "O2 learners celebrating their course achievements together",
    title: "Progress worth celebrating",
    className: "",
  },
  {
    src: "/images/learning/learning-community.jpg",
    alt: "Learners and community members gathered at an O2 technology event",
    title: "A community that builds together",
    className: "",
  },
  {
    src: "/images/learning/3mtt-orientation.jpg",
    alt: "Learners and facilitators at the 3MTT orientation in Lafia",
    title: "Rooted in Lafia",
    className: "",
  },
];

export function HomeLearningHero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.12 }}
      className="relative block h-56 md:h-[26rem]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
        <ParallaxImage
          src="/images/learning/cohort-study.jpg"
          alt="O2 learners collaborating on laptops during a practical class in Lafia"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07102f]/85 via-[#07102f]/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/75">O2 learning community</p>
          <p className="mt-1 text-xl font-bold md:text-2xl">Skills built together, in Lafia</p>
        </div>
      </div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -left-3 top-5 rounded-xl px-4 py-3 text-xs shadow-lg md:-left-6 md:top-8 md:text-sm"
      >
        Practical tech training
      </motion.div>
      <Lottie src="/lottie/pulse.json" className="pointer-events-none absolute -right-5 -top-8 size-24 opacity-70 md:-right-8 md:-top-10 md:size-36" />
    </motion.div>
  );
}

export function HomeLearningGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="home-learning-title">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-navy/60">Real moments from our community</p>
            <h2 id="home-learning-title" className="mt-2 max-w-2xl text-3xl font-bold text-ink md:text-5xl">People learning, sharing and building in Lafia.</h2>
          </div>
          <p className="max-w-sm text-ink/65">Practical training and a growing technology community, captured at O2.</p>
        </motion.div>

        <div className="grid auto-rows-[145px] grid-cols-2 gap-3 md:auto-rows-[190px] md:grid-cols-4 md:gap-4">
          {learningPhotos.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06, ease: "easeOut" }}
              className={`group relative isolate overflow-hidden rounded-2xl bg-navy min-h-[145px] md:min-h-[190px] ${photo.className} ${index === 0 ? "row-span-2 min-h-[298px] md:min-h-[396px]" : ""}`}
            >
              <ParallaxImage src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.02]" imageClassName="transition duration-700 group-hover:scale-105" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07102f]/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white md:p-4 z-10">{photo.title}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

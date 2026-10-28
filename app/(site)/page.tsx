import Link from "next/link";
import Net from "@/components/Particles";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import Marquee from "@/components/Marquee";
import SolutionPreview from "@/components/SolutionPreview";
import { HomeLearningGallery, HomeLearningHero } from "@/components/HomeLearningVisuals";
import { Wrap } from "@/components/ui";
import { img, services, testimonials, naira, photo, courseImg } from "@/lib/data";
import { getCourses } from "@/lib/courses";

const work = [
  ["AI-assisted e-exams", "Candidates sit tests on any device. AI marks first, lecturers review and approve, so results that took weeks are ready in days.", "e-exams", "/services/e-exams"],
  ["School portals", "Results, fees, student and staff emails and e-learning behind one login, designed, built and deployed for the school.", "school-portals", "/services/school-portals"],
  ["Payroll and payments", "Salaries, tax and deductions calculated with approvals and a full audit trail.", "payroll", "/services/payroll"],
] as const;
const caps = [["IT consulting", "We study how your organisation works, then recommend what to build, buy or fix.", ["Systems audit", "Digital strategy", "Vendor selection"]], ["Enterprise software", "Business management, attendance, e-learning and payroll systems configured for your sector.", ["HR and finance", "Stock and approvals", "Attendance"]], ["Custom development", "Web, mobile and desktop products for fintech, edtech, legaltech, real estate and mining.", ["Web apps", "Android and iOS", "APIs and cloud"]]] as const;
const method = [["Discover", "We sit with your team and map the real problem."], ["Prototype", "You click through a working model before we commit to a build."], ["Build", "Short releases, tested with your users each fortnight."], ["Deploy and support", "We launch, train your staff and stay on call."]];
const sectors = ["Education", "Fintech", "Legaltech", "Real estate", "Mining", "Government", "Healthcare", "Logistics"];
const slide = "snap-start shrink-0 w-[85%] md:w-[380px]";

export default async function Home() {
  const courses = await getCourses();
  return (<main>
    <section className="relative bg-navy text-white overflow-hidden min-h-[92svh] grid items-center" style={{ backgroundImage: `url(${img.code})`, backgroundSize: "cover" }}>
      <video autoPlay muted loop playsInline poster={img.code} className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"><source src={process.env.NEXT_PUBLIC_HERO_VIDEO || "/media/hero.mp4"} type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" /><Net />
      <div className="relative mx-auto max-w-7xl px-5 py-24 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <Reveal><p className="glass inline-block rounded-full px-4 py-1 text-sm">Technology · Innovation · Training</p>
          <h1 className="mt-6 text-5xl md:text-8xl font-extrabold leading-[0.95]">Technology that moves <span className="shine">institutions</span> forward.</h1>
          <p className="mt-8 text-xl text-white/85 max-w-2xl">We design software, advise organisations on technology, and train the people who will run it. Lafia is home; our clients are anywhere.</p>
          <div className="mt-10 flex flex-wrap gap-4"><Link href="#work" className="rounded-full bg-flame text-ink px-7 py-3 font-semibold hover:scale-105 transition">See our work</Link><Link href="/contact" className="rounded-full border border-white/50 px-7 py-3">Start a project</Link></div></Reveal>
        <HomeLearningHero /></div></section>

    <div className="bg-ink text-white py-6 grid gap-3"><Marquee items={sectors} /><Marquee items={[...sectors].reverse()} reverse /></div>

    <HomeLearningGallery />

    <section id="work" className="bg-paper"><Wrap><Reveal><h2 className="text-4xl md:text-6xl font-bold max-w-3xl">Systems that run schools, exams and payrolls</h2></Reveal>
      <div className="mt-16 grid gap-24">{work.map(([t, d, slug, href], i) => (
        <div key={t} className="grid md:grid-cols-2 gap-12 items-center"><Reveal className={i % 2 ? "md:order-2" : ""}><h3 className="text-3xl md:text-4xl font-bold">{t}</h3><p className="mt-4 text-lg text-ink/75">{d}</p><Link href={href} className="mt-6 inline-block font-semibold text-navy underline underline-offset-4">How it works</Link></Reveal>
          <Reveal delay={0.15}><SolutionPreview slug={slug} /></Reveal></div>))}</div></Wrap></section>

    <section className="bg-white"><Wrap><Reveal><h2 className="text-4xl md:text-6xl font-bold max-w-3xl">What we do</h2></Reveal>
      <div className="mt-12 border-t border-ink/15">{caps.map(([t, d, tags]) => <Reveal key={t}><div className="grid md:grid-cols-[1fr_1.4fr_1fr] gap-6 py-10 border-b border-ink/15"><h3 className="text-3xl font-bold">{t}</h3><p className="text-lg text-ink/75">{d}</p><ul className="flex flex-wrap gap-2 content-start">{tags.map(x => <li key={x} className="rounded-full bg-paper px-4 py-1 text-sm">{x}</li>)}</ul></div></Reveal>)}</div>
      <div className="mt-16"><h3 className="text-2xl font-bold mb-4">Our solutions</h3><Carousel label="Solutions">{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`} className={`${slide} group rounded-3xl overflow-hidden bg-paper`}><div className="h-48 overflow-hidden bg-[#f5f7fb]"><SolutionPreview slug={s.slug} className="w-[200%] origin-top-left scale-50 pointer-events-none select-none" /></div><div className="p-6"><h4 className="text-xl font-bold">{s.title}</h4><p className="mt-2 text-ink/70">{s.blurb}</p></div></Link>)}</Carousel></div></Wrap></section>

    <section className="bg-ink text-white"><Wrap><div className="grid md:grid-cols-2 gap-14"><Reveal><h2 className="text-4xl md:text-6xl font-bold">How we solve problems</h2>
      <p className="mt-6 text-white/75 text-lg">Innovation here is practical: start with the people who will use the system, prove the idea early, and ship in small steps. Our lab also incubates startups and hosts the DevEnt community of developers and entrepreneurs.</p>
      <div className="mt-8 flex gap-10"><p><b className="text-4xl text-flame block"><Counter to={5} suffix="" /></b>startups launched</p><p><b className="text-4xl text-flame block"><Counter to={1000} suffix="+" /></b>community members</p></div></Reveal>
      <ol className="grid gap-4">{method.map(([t, d], i) => <Reveal key={t} delay={i * 0.1}><li className="glass rounded-2xl p-6 flex gap-5"><span className="text-flame text-3xl font-extrabold">{i + 1}</span><div><h3 className="text-xl font-bold">{t}</h3><p className="text-white/75">{d}</p></div></li></Reveal>)}</ol></div></Wrap></section>

    <section className="bg-navy text-white"><Wrap><div className="grid md:grid-cols-2 gap-14 items-center"><Reveal>
      <h2 className="text-4xl md:text-6xl font-bold">O2 Campus: serious training, onsite or online</h2>
      <p className="mt-5 text-white/80 text-lg">The same engineers who build our systems teach our courses. Learn at the Lafia hub, or join the online campus with live classes, recorded lessons, progress tracking, discussion, tests and a verifiable certificate.</p>
      <div className="mt-8 flex gap-4"><Link href="/training" className="rounded-full bg-flame text-ink px-7 py-3 font-semibold">Browse courses</Link><Link href="/learn/login" className="rounded-full border border-white/40 px-7 py-3">Student login</Link></div></Reveal>
      <Reveal delay={0.15}><SolutionPreview slug="e-learning" /></Reveal></div>
      <div className="mt-16"><Carousel label="Courses">{courses.map(c => <Link key={c.slug} href={`/training/${c.slug}`} className={`${slide} group rounded-2xl overflow-hidden bg-white text-ink`}><img src={c.thumbnail || photo(courseImg[c.slug] || "1517694712202-14dd9538aa97")} alt="" className="h-44 w-full object-cover bg-ink group-hover:scale-105 transition duration-500" loading="lazy" /><div className="p-5"><h3 className="text-xl font-bold">{c.title}</h3><p className="text-sm text-ink/65 mt-1">{c.blurb}</p><p className="mt-3 font-semibold text-navy">From {naira(c.price)} · {c.weeks} weeks</p></div></Link>)}</Carousel></div></Wrap></section>

    <section className="bg-paper"><Wrap><Reveal><h2 className="text-4xl md:text-6xl font-bold max-w-3xl">Proof, from people we have worked with</h2></Reveal>
      <div className="mt-12"><Carousel label="Testimonials">{testimonials.map(t => <figure key={t.name} className={`${slide} rounded-3xl bg-white p-8`}><blockquote className="text-xl leading-snug">“{t.text}”</blockquote><figcaption className="mt-5"><b>{t.name}</b><br /><span className="text-ink/60 text-sm">{t.role}</span></figcaption></figure>)}</Carousel></div>
      <Reveal><div className="mt-16 rounded-3xl bg-flame text-ink p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center"><div><h2 className="text-3xl md:text-5xl font-bold">Tell us the problem. We&apos;ll show you a plan.</h2><p className="mt-3">Plot 160 AJ Ahmadu Plaza, Lafia · +234 903 902 2216 · 02Innovationslab@gmail.com</p></div>
        <div className="flex flex-wrap gap-3 md:justify-end text-white"><Link href="/contact" className="rounded-full bg-ink text-white px-7 py-3">Book a consultation</Link><Link href="/training#apply" className="rounded-full border-2 border-ink px-7 py-3">Apply for training</Link></div></div></Reveal></Wrap></section>
  </main>);
}

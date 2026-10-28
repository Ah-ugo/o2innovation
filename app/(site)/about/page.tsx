import { PageHero, Wrap, Cta } from "@/components/ui";
import { img, stats } from "@/lib/data";
import Counter from "@/components/Counter";
import ParallaxImage from "@/components/ParallaxImage";
export const metadata = { title: "About | O2 Innovations Lab" };
const offers = [["Hands-on training", "Practical courses taught by industry experts."], ["Co-working space", "A modern workspace for productivity and collaboration."], ["Tech consulting", "Strategic guidance for your digital transformation."], ["Startup incubation", "From idea to market with full support."]];
export default function About() {
  return (<main>
    <PageHero title="A catalyst for technology in Northern Nigeria" text="O2 Innovations Lab sits in the heart of Lafia. We close the gap between classroom learning and what industry needs, and we build software for the institutions that shape our communities." />
    <Wrap><div className="grid md:grid-cols-2 gap-12 items-center"><ParallaxImage src={img.team} alt="The O2 team collaborating" className="w-full aspect-[4/3] rounded-3xl shadow-xl" />
      <div><h2 className="text-4xl font-bold">Our story</h2><p className="mt-4 text-ink/75">We started as a training hub and grew into a full technology partner. Today we train hundreds of learners, support startups through the DevEnt community, and deliver software for schools and organisations.</p>
        <h3 className="mt-8 text-2xl font-bold">Mission</h3><p className="mt-2 text-ink/75">Equip people and institutions with practical technology that works in their reality.</p>
        <h3 className="mt-6 text-2xl font-bold">Vision</h3><p className="mt-2 text-ink/75">A Northern Nigeria where world-class software is built and learned locally.</p></div></div></Wrap>
    <Wrap className="bg-navy text-white"><div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">{stats.map(([n, s, l]) => <div key={l}><p className="text-5xl font-extrabold text-flame"><Counter to={n} suffix={s} /></p><p className="mt-2 text-white/75">{l}</p></div>)}</div></Wrap>
    <Wrap><h2 className="text-4xl font-bold">What we offer</h2><div className="mt-10 grid md:grid-cols-4 gap-5">{offers.map(([t, d]) => <div key={t} className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><h3 className="font-bold text-xl">{t}</h3><p className="mt-2 text-ink/70">{d}</p></div>)}</div></Wrap>
    <Wrap className="bg-white"><h2 className="text-4xl font-bold">DevEnt Community</h2><p className="mt-4 max-w-3xl text-ink/75">Where developers and entrepreneurs unite. Over 1,000 members share ideas, find collaborators, and access mentorship and business support to turn ideas into ventures.</p></Wrap>
    <Cta /></main>);
}

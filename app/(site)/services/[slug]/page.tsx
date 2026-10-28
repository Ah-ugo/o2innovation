import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import Carousel from "@/components/Carousel";
import SolutionPreview from "@/components/SolutionPreview";
import { Wrap, Cta } from "@/components/ui";
import { services, serviceImg, serviceUses, buildSteps, photo } from "@/lib/data";
import { Check } from 'lucide-react';
export const generateStaticParams = () => services.map(s => ({ slug: s.slug }));
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find(x => x.slug === slug); if (!s) notFound();
  const others = services.filter(x => x.slug !== s.slug);
  return (<main>
    <section className="relative bg-navy text-white overflow-hidden"><ParallaxImage src={photo(serviceImg[s.slug])} alt="" className="absolute inset-0 h-full w-full opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-32"><Link href="/services" className="text-sm text-white/70 underline">All services</Link><h1 className="mt-4 text-5xl md:text-7xl font-extrabold max-w-4xl leading-[1]">{s.title}</h1><p className="mt-6 text-xl text-white/85 max-w-2xl">{s.body}</p>
        <div className="mt-8 flex gap-3"><Link href="/contact" className="rounded-full bg-flame text-ink px-7 py-3 font-semibold">Request a demo</Link><a href="#features" className="rounded-full border border-white/50 px-7 py-3">See features</a></div></div></section>
    <Wrap><Reveal><div className="max-w-5xl mx-auto"><SolutionPreview slug={s.slug} /></div></Reveal></Wrap>
    <section id="features" className="bg-white"><Wrap><Reveal><h2 className="text-4xl md:text-5xl font-bold">What you get</h2></Reveal>
      <div className="mt-10 grid md:grid-cols-2 gap-5">{s.points.map((p, i) => <Reveal key={p} delay={i * 0.08}><div className="rounded-2xl bg-paper p-7 flex gap-4"><span className="grid place-items-center size-10 shrink-0 rounded-full bg-navy text-white"><Check size={18} /></span><p className="text-lg">{p}</p></div></Reveal>)}</div></Wrap></section>
    <Wrap className="bg-ink text-white"><h2 className="text-4xl md:text-5xl font-bold">How we deliver it</h2><ol className="mt-10 grid md:grid-cols-4 gap-5">{buildSteps.map(([t, d], i) => <Reveal key={t} delay={i * 0.1}><li className="glass rounded-2xl p-6 h-full"><span className="text-flame text-4xl font-extrabold">0{i + 1}</span><h3 className="mt-2 text-xl font-bold">{t}</h3><p className="mt-2 text-white/75">{d}</p></li></Reveal>)}</ol></Wrap>
    <Wrap><h2 className="text-4xl md:text-5xl font-bold">Who it is for</h2><div className="mt-8 flex flex-wrap gap-3">{(serviceUses[s.slug] || []).map(u => <span key={u} className="rounded-full bg-navy text-white px-6 py-3 text-lg">{u}</span>)}</div></Wrap>
    <section className="bg-white"><Wrap><h2 className="text-4xl font-bold">Common questions</h2><div className="mt-8 max-w-3xl grid gap-3">{[["How long does it take?", "Most projects launch in 6 to 16 weeks, depending on scope. We agree a timeline after discovery."], ["Can it connect to systems we already use?", "Yes. We integrate with your existing databases, payment providers and email."], ["Do you train our staff?", "Yes. Training and a support plan are part of every launch."]].map(([q, a]) => <details key={q} className="rounded-xl bg-paper p-5"><summary className="font-semibold cursor-pointer">{q}</summary><p className="mt-3 text-ink/70">{a}</p></details>)}</div></Wrap></section>
    <Wrap><h2 className="text-3xl font-bold mb-6">More from O2</h2><Carousel label="Other services">{others.map(o => <Link key={o.slug} href={`/services/${o.slug}`} className="snap-start shrink-0 w-[80%] md:w-[340px] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition"><div className="h-40 overflow-hidden bg-[#f5f7fb]"><SolutionPreview slug={o.slug} className="w-[200%] origin-top-left scale-50 pointer-events-none select-none" /></div><div className="p-5"><h3 className="font-bold text-lg">{o.title}</h3><p className="text-sm text-ink/70 mt-1">{o.blurb}</p></div></Link>)}</Carousel></Wrap>
    <Cta /></main>);
}

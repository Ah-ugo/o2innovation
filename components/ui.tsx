import Link from "next/link";
import Reveal from "@/components/Reveal";
export function PageHero({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return <section className="grid-bg relative isolate overflow-hidden bg-navy px-5 py-20 text-white md:py-28"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 size-96 rounded-full bg-flame/15 blur-3xl" /><div className="relative mx-auto max-w-7xl">
    <Reveal><h1 className="max-w-4xl text-4xl font-extrabold leading-[1] md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-white/80">{text}</p>{children}</Reveal></div></section>;
}
export const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) =>
  <section className={`px-5 py-14 md:py-20 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>;
export const Cta = () => (
  <Wrap className="bg-[#ff5a1f]">
    <div className="flex flex-wrap items-center justify-between gap-8">
      <h2 className="text-3xl md:text-5xl font-bold max-w-2xl text-white">
        Have a system to build or a skill to learn?
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
          href="/contact"
          className="rounded-full bg-white text-[#0a0f1e] px-8 py-3.5 font-bold text-sm text-center hover:bg-white/90 transition-colors shadow-md"
        >
          Talk to us
        </Link>
        <Link
          href="/training#apply"
          className="rounded-full border-2 border-white text-white px-8 py-3.5 font-semibold text-sm text-center hover:bg-white/10 transition-colors"
        >
          Apply for training
        </Link>
      </div>
    </div>
  </Wrap>
);

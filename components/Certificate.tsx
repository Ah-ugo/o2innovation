import { Award, BadgeCheck, ShieldCheck } from 'lucide-react';

export default function Certificate({ c }: { c: { code: string; name: string; course: string; issued: string; score?: number } }) {
  const issued = c.issued ? new Date(c.issued).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date unavailable';
  return (
    <article data-certificate-print className="certificate relative isolate overflow-hidden rounded-[28px] border border-[#c9a85b] bg-[#fffdf7] p-5 text-center shadow-[0_24px_70px_rgba(10,14,42,.12)] sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[20px] border border-[#c9a85b]/40" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#c9a85b]/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-navy/5" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div className="grid size-16 place-items-center rounded-full border border-[#c9a85b] bg-white text-[#9c7625] shadow-sm"><Award size={34} strokeWidth={1.5} /></div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[.32em] text-navy">O2 Innovations Lab</p>
        <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-navy sm:text-5xl">Certificate of Completion</h2>
        <div aria-hidden="true" className="my-5 h-px w-28 bg-[#c9a85b]" />
        <p className="text-sm uppercase tracking-[.2em] text-ink/55">This certificate is proudly presented to</p>
        <p className="mt-3 break-words text-3xl font-semibold text-ink sm:text-5xl">{c.name}</p>
        <p className="mt-5 text-base text-ink/70">for successfully completing the course</p>
        <p className="mt-2 text-xl font-bold text-navy sm:text-2xl">{c.course}</p>
        <div className="mt-8 grid w-full gap-5 border-t border-[#c9a85b]/40 pt-5 text-left sm:grid-cols-3 sm:items-end">
          <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-ink/45">Date awarded</p><p className="mt-1 text-sm font-semibold">{issued}</p></div>
          {typeof c.score === 'number' && <div className="sm:text-center"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-ink/45">Final score</p><p className="mt-1 text-sm font-semibold">{c.score}%</p></div>}
          <div className="sm:text-right"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-ink/45">Certificate ID</p><p className="mt-1 font-mono text-xs font-semibold">{c.code}</p></div>
        </div>
        <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-ink/55"><ShieldCheck size={14} /> Verifiable credential <BadgeCheck size={14} className="text-emerald-700" /></p>
        <a href={`/verify/${encodeURIComponent(c.code)}`} className="mt-1 text-[10px] text-ink/45 underline">Verify this certificate</a>
      </div>
    </article>
  );
}

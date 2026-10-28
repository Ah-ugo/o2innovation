"use client";
import { useRef } from "react";
export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * r.current.clientWidth * 0.8, behavior: "smooth" });
  const b = "size-11 rounded-full border border-current/30 hover:bg-flame hover:text-ink hover:border-flame transition";
  return (<div role="region" aria-roledescription="carousel" aria-label={label}>
    <div ref={r} tabIndex={0} className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none]">{children}</div>
    <div className="mt-3 flex gap-2 justify-end"><button aria-label="Previous" onClick={() => go(-1)} className={b}>←</button><button aria-label="Next" onClick={() => go(1)} className={b}>→</button></div></div>);
}

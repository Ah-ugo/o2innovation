export default function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return <div className="overflow-hidden"><div className={`marquee ${reverse ? "marquee-rev" : ""}`}>{[0, 1].map(k => <div key={k} className="flex gap-10 pr-10 whitespace-nowrap">{items.map(i => <span key={i + k} className="text-2xl md:text-4xl font-bold opacity-80">{i} <i className="text-flame not-italic">✦</i></span>)}</div>)}</div></div>;
}

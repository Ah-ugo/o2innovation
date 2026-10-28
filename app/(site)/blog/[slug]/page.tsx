import { notFound } from "next/navigation";
import { PageHero, Wrap, Cta } from "@/components/ui";
import { posts } from "@/lib/data";
export const generateStaticParams = () => posts.map(p => ({ slug: p.slug }));
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find(x => x.slug === slug); if (!p) notFound();
  return (<main><PageHero title={p.title} text={`${p.tag} · ${p.date}`} /><Wrap><article className="max-w-2xl grid gap-5 text-lg leading-8">{p.body.map((t, i) => <p key={i}>{t}</p>)}</article></Wrap><Cta /></main>);
}

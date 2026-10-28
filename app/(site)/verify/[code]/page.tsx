import { PageHero, Wrap } from "@/components/ui";
export default async function Verify({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = await fetch(`${process.env.NEXT_PUBLIC_API}/verify/${code}`, { cache: "no-store" }).then(r => r.ok ? r.json() : null).catch(() => null);
  return (<main><PageHero title={c ? "Certificate verified" : "Certificate not found"} text={c ? `${c.name} completed ${c.course} on ${c.issued.slice(0, 10)}.` : "Check the code and try again."} /><Wrap><p>Code: <b>{code}</b></p></Wrap></main>);
}

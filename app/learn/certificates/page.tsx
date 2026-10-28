"use client";
import { useApi } from "@/components/useApi";
import Certificate from "@/components/Certificate";
export default function Certs() {
  const { data, loading, err } = useApi<any[]>("/learn/courses");
  const list = data?.filter(m => m.certificate);
  if (loading) return <div aria-label="Loading certificates" aria-busy="true" className="max-w-3xl animate-pulse space-y-6"><div className="h-10 w-1/2 rounded bg-ink/10" /><div className="h-96 rounded-3xl bg-white" /></div>;
  if (err) return <p role="alert" className="rounded-xl bg-white p-5">{err}</p>;
  return (<div className="max-w-3xl grid gap-6"><h1 className="text-4xl font-bold">My certificates</h1>{list?.map(m => <Certificate key={m.certificate.code} c={m.certificate} />)}
    {list?.length === 0 && <p className="text-ink/60">Pass a course test to earn your first certificate.</p>}{!!list?.length && <button onClick={() => window.print()} className="rounded-full bg-navy text-white px-6 py-3 w-fit">Print or save as PDF</button>}</div>);
}

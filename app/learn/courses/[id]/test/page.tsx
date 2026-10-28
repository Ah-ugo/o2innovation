"use client";
import { use, useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/components/useApi";
import Certificate from "@/components/Certificate";
import { LoaderCircle } from "lucide-react";
export default function Test({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const { data, err, loading } = useApi<any>(`/learn/${id}/quiz`); 
  const [a, setA] = useState<number[]>([]); 
  const [res, setRes] = useState<any>(null); 
  const [e2, setE2] = useState("");
  const [busy, setBusy] = useState(false);
  
  const questions = Array.isArray(data) ? data : (data?.questions || []);
  const session_token = data?.session_token;
  
  async function submit() { 
    if (busy) return;
    setBusy(true); setE2("");
    try { 
      setRes(await api(`/learn/${id}/quiz`, { 
        method: "POST", 
        body: JSON.stringify({ answers: questions!.map((_: any, i: number) => a[i] ?? -1), session_token }) 
      })); 
    } catch (x: any) { setE2(x.message); } finally { setBusy(false); }
  }
  if (res) return (<div className="max-w-2xl grid gap-6"><h1 className="text-4xl font-bold">{res.passed ? "You passed" : "Not yet"}</h1><p className="text-xl">Your score: {res.score}%</p>
    {res.certificate ? <><Certificate c={res.certificate} /><button onClick={() => window.print()} className="rounded-full bg-navy text-white px-6 py-3 w-fit">Print or save as PDF</button></> : <button onClick={() => { setRes(null); setA([]); }} className="rounded-full bg-flame px-6 py-3 w-fit font-semibold">Try again</button>}</div>);
  if (err) return <p role="alert" className="rounded-xl bg-white p-5">{err}</p>; if (loading || !data) return <div aria-label="Loading final test" aria-busy="true" className="max-w-2xl animate-pulse space-y-5"><div className="h-10 w-1/2 rounded bg-ink/10" />{[0,1,2].map(n => <div key={n} className="h-36 rounded-2xl bg-white" />)}</div>;
  if (!questions.length) return <div className="max-w-2xl rounded-2xl bg-white p-6"><h1 className="text-2xl font-bold">Final test unavailable</h1><p className="mt-2 text-ink/70">Your instructor has not added any questions yet.</p></div>;
  return (<div className="max-w-2xl grid gap-6"><h1 className="text-4xl font-bold">Final test</h1>
    {questions.map((q: any, i: number) => <fieldset key={i} className="rounded-2xl bg-white p-6"><legend className="font-bold px-1">{i + 1}. {q.q}</legend>{q.options.map((o: string, j: number) => <label key={j} className="flex gap-3 py-2"><input type="radio" name={`q${i}`} checked={a[i] === j} onChange={() => { const n = [...a]; n[i] = j; setA(n); }} />{o}</label>)}</fieldset>)}
    {e2 && <p role="alert" className="text-red-700">{e2}</p>}<button disabled={busy || a.length < questions.length || questions.some((_: any, i: number) => a[i] === undefined)} onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-8 py-3 w-fit font-semibold disabled:opacity-50">{busy && <LoaderCircle className="size-4 animate-spin" />}{busy ? 'Submitting' : 'Submit test'}</button></div>);
}

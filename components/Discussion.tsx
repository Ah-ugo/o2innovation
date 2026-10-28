"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
export default function Discussion({ cid, lesson }: { cid: string; lesson?: number }) {
  const [posts, setPosts] = useState<any[]>([]); const [t, setT] = useState("");
  const load = () => api(`/learn/${cid}/discussion`).then(setPosts); useEffect(() => { load(); }, [cid]);
  async function send() { if (!t.trim()) return; await api(`/learn/${cid}/discussion`, { method: "POST", body: JSON.stringify({ text: t, lesson }) }); setT(""); load(); }
  return (<div className="grid gap-4"><div className="flex gap-2"><label className="sr-only" htmlFor={`discussion-${cid}-${lesson ?? 'course'}`}>Your discussion post</label><input id={`discussion-${cid}-${lesson ?? 'course'}`} value={t} onChange={e => setT(e.target.value)} placeholder="Ask a question or share a tip" className="flex-1 rounded-lg border border-ink/20 px-4 py-3" /><button onClick={send} className="rounded-lg bg-navy text-white px-6">Post</button></div>
    {posts.map(p => <div key={p.id} className="rounded-xl bg-white p-4"><p className="text-sm"><b>{p.name}</b> <span className="text-ink/50">· {new Date(p.created).toLocaleDateString()}{p.lesson != null ? ` · Lesson ${p.lesson + 1}` : ""}</span></p><p className="mt-1">{p.text}</p></div>)}
    {posts.length === 0 && <p className="text-ink/60">No posts yet. Start the conversation.</p>}</div>);
}

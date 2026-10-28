'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useApi } from '@/components/useApi';
import { Megaphone, X } from 'lucide-react';

const inp = 'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';

export default function Announcements() {
  const courses = useApi<any[]>('/courses').data ?? [];
  const [target, setTarget] = useState('all');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState<{ target: string; subject: string; text: string; sent: string }[]>([]);

  async function send() {
    try {
      await api('/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({ course: target === 'all' ? null : target, subject, body: text }),
      });
      const entry = { target, subject, text, sent: new Date().toLocaleString() };
      setHistory(h => [entry, ...h]);
      setMsg('Announcement sent.');
      setSubject(''); setText('');
    } catch (e: any) { setMsg(e.message); }
  }

  return (
    <div>
      <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold md:text-3xl">Announcements</h1>
        <p className="mt-0.5 text-sm text-[#0a0e2a]/60">Send announcements to all students or a specific course</p>
      </div>

      <div className="space-y-6 p-6">
        {msg && (
          <div className="rounded-xl border border-[#ff8c1e]/30 bg-[#ff8c1e]/10 p-4 text-sm font-medium">
            {msg} <button onClick={() => setMsg('')} aria-label="Dismiss message" className="ml-3 text-[#0a0e2a]/40"><X size={16} /></button>
          </div>
        )}

        {/* Compose */}
        <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-lg">Compose announcement</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#0a0e2a]/60 uppercase tracking-wide">Send to</label>
              <select className={inp} value={target} onChange={e => setTarget(e.target.value)}>
                <option value="all">All students</option>
                {courses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#0a0e2a]/60 uppercase tracking-wide">Subject</label>
              <input className={inp} placeholder="Email subject line" value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#0a0e2a]/60 uppercase tracking-wide">Message</label>
            <textarea rows={6} className={inp} placeholder="Write your announcement here…" value={text} onChange={e => setText(e.target.value)} />
          </div>
          <button onClick={send}
            className="rounded-full bg-[#010f6b] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition">
            <span className="inline-flex items-center gap-2"><Megaphone size={16} />Send announcement</span>
          </button>
        </div>

        {/* Sent history */}
        {history.length > 0 && (
          <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold text-lg">Sent in this session</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="rounded-xl bg-[#f6f7fb] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{h.subject}</p>
                    <span className="text-xs text-[#0a0e2a]/50">{h.sent}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#0a0e2a]/60">
                    To: {h.target === 'all' ? 'All students' : courses.find((c: any) => c.id === h.target)?.title ?? h.target}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#0a0e2a]/80">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API || "http://localhost:8000";

export default function Enroll({ courses: initialCourses }: { courses?: { id: string; title: string }[] }) {
  const [courses, setCourses] = useState<{ id: string; title: string }[]>(initialCourses || []);
  const [state, set] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (!initialCourses || initialCourses.length === 0) {
      fetch(`${API}/courses`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) {
            setCourses(data.map((c: any) => ({ id: c.slug || c.id, title: c.title })));
          }
        })
        .catch(() => {});
    } else {
      setCourses(initialCourses);
    }
  }, [initialCourses]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); set("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch(`${API}/applications`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    set(r.ok ? "done" : "error");
  }
  if (state === "done") return <p className="text-lg">Thanks. Our team will reach out within 24 hours. Online learners get portal login details once approved.</p>;
  const field = "w-full rounded-lg bg-white/10 border border-white/25 px-4 py-3 placeholder:text-white/60";
  return (
    <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
      <label className="grid gap-1 text-sm font-medium">Full name<input required name="full_name" autoComplete="name" placeholder="Enter your full name" className={field} /></label>
      <label className="grid gap-1 text-sm font-medium">Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={field} /></label>
      <label className="grid gap-1 text-sm font-medium">Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" className={field} /></label>
      <label className="grid gap-1 text-sm font-medium">Course<select required name="course_id" className={field}>{courses.map(c => <option key={c.id} value={c.id} className="text-black">{c.title}</option>)}</select></label>
      <label className="grid gap-1 text-sm font-medium md:col-span-2">Learning format<select required name="mode" className={field}>
        <option value="onsite" className="text-black">Onsite at the Lafia hub</option>
        <option value="online" className="text-black">Online (live and recorded classes)</option></select></label>
      <button disabled={state === "sending"} className="md:col-span-2 rounded-lg bg-flame text-ink font-semibold py-3 hover:brightness-110">
        {state === "sending" ? "Sending..." : "Apply for this course"}</button>
      {state === "error" && <p className="md:col-span-2 text-red-200">Could not send. Check your connection and try again.</p>}
    </form>
  );
}

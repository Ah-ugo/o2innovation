"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import PasswordInput from "@/components/PasswordInput";

export default function Login() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const f = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await api("/auth/login", { method: "POST", body: JSON.stringify(f) });
      localStorage.setItem("o2t", r.token);
      location.href = r.user.role === "admin" ? "/admin" : "/learn";
    } catch (x: any) {
      setErr(x.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left panel */}
      <div
        className="grid-bg bg-navy text-white p-10 md:p-16 flex flex-col justify-end"
        style={{ minHeight: "260px" }}
      >
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
            style={{ backgroundColor: "rgba(255,140,30,0.25)", color: "#ff8c1e" }}
          >
            O2 Campus LMS
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Learn. Grow.<br />Achieve.
          </h1>
          <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
            Live classes, recorded lessons, tests and certificates — all in one place.
            Use the login details we sent after your application was approved.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="p-8 md:p-16 flex items-center justify-center bg-paper">
        <form onSubmit={go} className="w-full max-w-sm grid gap-5">
          <div>
            <h2 className="text-3xl font-bold text-ink">Welcome back</h2>
            <p className="mt-1 text-sm text-ink/60">Sign in to your student account</p>
          </div>

          <label className="grid gap-1 text-sm font-medium text-ink">
            Email address
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-navy/30 transition"
            />
          </label>

          <div className="grid gap-1">
            <PasswordInput
              name="password"
              label="Password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              inputClassName="bg-white"
            />
            <div className="flex justify-end">
              <Link
                href="/learn/forgot-password"
                className="text-xs text-navy hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {err && (
            <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {err}
            </p>
          )}

          <button
            disabled={loading}
            className="rounded-xl bg-navy text-white py-3.5 font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-sm text-center text-ink/60">
            No account?{" "}
            <a href="/training#apply" className="text-navy font-medium hover:underline">
              Apply for a course
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

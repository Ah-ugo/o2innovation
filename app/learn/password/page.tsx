"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import PasswordInput from "@/components/PasswordInput";

export default function PasswordSettings() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setDone(false);

    if (form.next !== form.confirm) {
      setErr("New passwords do not match.");
      return;
    }
    if (form.next.length < 6) {
      setErr("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await api("/me/password", {
        method: "PUT",
        body: JSON.stringify({
          current_password: form.current,
          new_password: form.next,
        }),
      });
      setDone(true);
      setForm({ current: "", next: "", confirm: "" });
    } catch (x: any) {
      setErr(x.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-ink/10 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-navy/70">Account security</p>
      <h1 className="mt-2 text-4xl font-bold">Password &amp; access</h1>
      <p className="mt-2 text-sm text-ink/60">
        Choose a strong password. After updating, you'll get a confirmation email.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-5">
        <PasswordInput
          label="Current password"
          value={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.value })}
          required
          placeholder="Your current password"
          autoComplete="current-password"
        />

        <PasswordInput
          label="New password"
          value={form.next}
          onChange={(e) => setForm({ ...form, next: e.target.value })}
          required
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        <PasswordInput
          label="Confirm new password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
          placeholder="Repeat new password"
          autoComplete="new-password"
        />

        {err && (
          <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {err}
          </p>
        )}

        {done && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            ✓ Password updated. A confirmation email has been sent to your inbox.
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </div>

        <div className="pt-2 border-t border-ink/10">
          <p className="text-sm text-ink/50 mb-2">Forgot your current password?</p>
          <a
            href="/learn/forgot-password"
            className="text-sm text-navy font-medium hover:underline"
          >
            Reset via email →
          </a>
        </div>
      </form>
    </div>
  );
}

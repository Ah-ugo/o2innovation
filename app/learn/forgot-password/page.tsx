"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import PasswordInput from "@/components/PasswordInput";

type Step = "email" | "code" | "done";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await api("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      setMsg(r.message);
      setStep("code");
    } catch (x: any) {
      setErr(x.message);
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: code.trim(),
          new_password: newPassword,
        }),
      });
      setStep("done");
    } catch (x: any) {
      setErr(x.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-5 py-16">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/learn/login"
          className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to sign in
        </Link>

        <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {(["email", "code"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor:
                      step === "done" || (i === 0 && step === "code")
                        ? "var(--navy)"
                        : step === s
                        ? "var(--navy)"
                        : "rgba(0,0,0,0.08)",
                    color:
                      step === "done" || (i === 0 && step === "code")
                        ? "white"
                        : step === s
                        ? "white"
                        : "rgba(0,0,0,0.4)",
                  }}
                >
                  {i === 0 && step !== "email" ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i === 0 && (
                  <div
                    className="flex-1 h-px w-8"
                    style={{ backgroundColor: step === "code" || step === "done" ? "var(--navy)" : "rgba(0,0,0,0.1)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Step 1: Enter email ── */}
          {step === "email" && (
            <>
              <h1 className="text-2xl font-bold text-ink">Reset your password</h1>
              <p className="mt-2 text-sm text-ink/60">
                Enter the email address on your account and we'll send a 6-digit reset code.
              </p>

              <form onSubmit={requestCode} className="mt-6 grid gap-4">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="rounded-xl border border-ink/15 bg-paper px-4 py-3 outline-none focus:ring-2 focus:ring-navy/30 transition"
                  />
                </label>

                {err && (
                  <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {err}
                  </p>
                )}

                <button
                  disabled={loading || !email}
                  className="rounded-xl bg-navy text-white py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Sending code…" : "Send reset code"}
                </button>
              </form>
            </>
          )}

          {/* ── Step 2: Enter code + new password ── */}
          {step === "code" && (
            <>
              <h1 className="text-2xl font-bold text-ink">Enter reset code</h1>
              <p className="mt-2 text-sm text-ink/60">
                We sent a 6-digit code to <strong>{email}</strong>. Check your inbox (and spam).
              </p>

              {msg && (
                <p className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                  {msg}
                </p>
              )}

              <form onSubmit={resetPassword} className="mt-6 grid gap-4">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  6-digit code
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    placeholder="123456"
                    className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-center tracking-[0.5em] text-xl font-bold outline-none focus:ring-2 focus:ring-navy/30 transition"
                  />
                </label>

                <PasswordInput
                  label="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />

                <PasswordInput
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                />

                {err && (
                  <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {err}
                  </p>
                )}

                <button
                  disabled={loading || code.length !== 6 || !newPassword}
                  className="rounded-xl bg-navy text-white py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Resetting…" : "Reset password"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setErr(""); }}
                  className="text-sm text-ink/50 hover:text-ink text-center"
                >
                  Didn't receive a code? Try again
                </button>
              </form>
            </>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="text-center py-4">
              <div
                className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(16,185,129,0.12)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-ink">Password reset!</h1>
              <p className="mt-2 text-sm text-ink/60">
                Your password has been updated successfully. You can now log in with your new password.
              </p>
              <Link
                href="/learn/login"
                className="mt-6 inline-block rounded-xl bg-navy text-white px-8 py-3 font-semibold hover:opacity-90 transition"
              >
                Go to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

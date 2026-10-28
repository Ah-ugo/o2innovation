"use client";
import { useState, forwardRef } from "react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, inputClassName = "", className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <label className={`grid gap-1 text-sm font-medium ${className}`}>
        {label && <span>{label}</span>}
        <span className="relative">
          <input
            ref={ref}
            {...props}
            type={show ? "text" : "password"}
            className={`w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-navy/30 transition ${inputClassName}`}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
            }}
          >
            {show ? (
              /* Eye-off */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              /* Eye */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </span>
      </label>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;

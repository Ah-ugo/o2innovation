"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["Services", "/services"],
  ["Training", "/training"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(10,14,42,0.97)" : "rgba(10,14,42,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.35)" : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="O2 Innovations Lab"
              width={52}
              height={52}
              className="rounded-md bg-white p-1"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {links.map(([t, h]) => (
              <Link
                key={h}
                href={h}
                style={{
                  color: pathname === h ? "var(--flame)" : "rgba(255,255,255,0.9)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { if (pathname !== h) e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { if (pathname !== h) e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
              >
                {t}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/learn"
              className="rounded-full px-5 py-2 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.9)" }}
            >
              Student login
            </Link>
            <Link
              href="/training#apply"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--flame)" }}
            >
              Apply now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <span
              style={{
                display: "block",
                height: "2px",
                width: "20px",
                backgroundColor: "white",
                borderRadius: "2px",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "2px",
                width: "20px",
                backgroundColor: "white",
                borderRadius: "2px",
                transition: "opacity 0.3s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: "2px",
                width: "20px",
                backgroundColor: "white",
                borderRadius: "2px",
                transition: "transform 0.3s",
                transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? "500px" : "0",
            opacity: open ? 1 : 0,
            transition: "max-height 0.35s ease, opacity 0.25s ease",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(8,11,32,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "1.5rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {links.map(([t, h]) => (
              <Link
                key={h}
                href={h}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.925rem",
                  fontWeight: 500,
                  color: pathname === h ? "var(--flame)" : "rgba(255,255,255,0.85)",
                  backgroundColor: pathname === h ? "rgba(255,140,30,0.12)" : "transparent",
                  display: "block",
                }}
              >
                {t}
              </Link>
            ))}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                href="/learn"
                className="rounded-full text-sm text-center py-3"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)" }}
              >
                Student login
              </Link>
              <Link
                href="/training#apply"
                className="rounded-full text-sm font-semibold text-center text-white py-3"
                style={{ backgroundColor: "var(--flame)" }}
              >
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer — keeps content from hiding under fixed nav */}
      <div style={{ height: "68px" }} />
    </>
  );
}

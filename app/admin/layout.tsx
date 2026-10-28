"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, BookOpen, ClipboardList, ExternalLink, FileText, GraduationCap, LayoutGrid, LogOut, Megaphone, Menu, Users, X } from "lucide-react";
import { api } from "@/lib/api";
import RouteMotion from "@/components/RouteMotion";

const NAV = [
  { label: "Overview", href: "/admin", Icon: LayoutGrid },
  { label: "Applications", href: "/admin/applications", Icon: ClipboardList },
  { label: "Students", href: "/admin/students", Icon: Users },
  { label: "Courses", href: "/admin/courses", Icon: BookOpen },
  { label: "Assignments", href: "/admin/assignments", Icon: FileText },
  { label: "Announcements", href: "/admin/announcements", Icon: Megaphone },
  { label: "Analytics", href: "/admin/analytics", Icon: BarChart3 },
];

const item =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition text-white/75 hover:bg-white/10 hover:text-white";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // Auth: must be signed in and be an admin
  useEffect(() => {
    if (!localStorage.getItem("o2t")) { router.replace("/learn/login"); return; }
    api("/me")
      .then(u => (u.role === "admin" ? setMe(u) : router.replace("/learn")))
      .catch(() => { });
  }, [router]);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  if (!me) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper text-ink/60" role="status">
        Checking your access...
      </div>
    );
  }

  return (
    <div className="admin-canvas min-h-screen text-ink">
      {/* ── Fixed Sidebar on desktop ── */}
      <aside className="sticky top-0 z-40 flex max-h-screen flex-col overflow-y-auto bg-navy text-white md:fixed md:inset-y-0 md:left-0 md:w-[260px] md:h-screen">
        <div className="flex items-center justify-between px-5 py-4 md:py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={36} height={36} className="shrink-0 rounded bg-white p-0.5" />
            <span className="font-bold leading-tight">
              O2 Campus<br />
              <span className="text-xs font-normal text-white/60">Admin panel</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="admin-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 hover:bg-white/10 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav
          id="admin-nav"
          aria-label="Admin"
          className={`${open ? "flex" : "hidden"} flex-1 flex-col gap-1 px-3 pb-4 md:flex`}
        >
          <div className="mb-3 rounded-xl bg-white/10 px-3 py-3">
            <p className="truncate text-sm font-semibold">{me.name}</p>
            <p className="truncate text-xs text-white/60">{me.email}</p>
            <span className="mt-2 inline-block rounded-full bg-flame px-2 py-0.5 text-[10px] font-bold text-ink">
              Admin
            </span>
          </div>

          {NAV.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`${item} ${active(href) ? "!bg-white/15 !text-white" : ""}`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="truncate">{label}</span>
              {active(href) && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-flame" />}
            </Link>
          ))}

          <div className="my-2 border-t border-white/10" />

          <Link href="/learn" className={item}><GraduationCap size={18} /><span>Student view</span></Link>
          <Link href="/" className={item}><ExternalLink size={18} /><span>O2 website</span></Link>
          <button
            onClick={() => { localStorage.removeItem("o2t"); location.href = "/learn/login"; }}
            className={`${item} text-left`}
          >
            <LogOut size={18} /><span>Sign out</span>
          </button>
        </nav>

        <p className="hidden border-t border-white/10 px-5 py-4 text-xs text-white/40 md:block">
          O2 Innovations Lab
        </p>
      </aside>

      {/* ── Main content offset by fixed sidebar ── */}
      <main className="min-w-0 p-5 md:p-8 md:ml-[260px]">
        <div className="mx-auto max-w-6xl"><RouteMotion>{children}</RouteMotion></div>
      </main>
    </div>
  );
}

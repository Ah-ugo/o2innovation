'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import RouteMotion from '@/components/RouteMotion';
import { ArrowUpRight, Award, BookOpen, LayoutDashboard, LockKeyhole, LogOut, Menu, Settings, UserRound, X } from 'lucide-react';

const NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  Dashboard: LayoutDashboard,
  Catalogue: BookOpen,
  Certificates: Award,
  Profile: UserRound,
  Password: LockKeyhole,
  Admin: Settings,
};

export default function Campus({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const r = useRouter();
  const [me, setMe] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isPublic = path === '/learn/login' || path === '/learn/forgot-password';

  useEffect(() => {
    if (isPublic) return;
    if (!localStorage.getItem('o2t')) {
      r.replace('/learn/login');
      return;
    }
    api('/me')
      .then(setMe)
      .catch(() => {});
  }, [isPublic, r]);

  if (isPublic) return <>{children}</>;

  const nav = [
    ['Dashboard', '/learn'],
    ['Catalogue', '/learn/catalogue'],
    ['Certificates', '/learn/certificates'],
    ['Profile', '/learn/profile'],
    ['Password', '/learn/password'],
    ...(me?.role === 'admin' ? [['Admin', '/admin']] : []),
  ];

  function signOut() {
    localStorage.removeItem('o2t');
    location.href = '/learn/login';
  }

  return (
    <div className="campus-canvas min-h-screen text-ink">
      <div className="mx-auto max-w-[1800px]">

        {/* ─── Sidebar ─── */}
        <aside className="bg-navy text-white md:fixed md:inset-y-0 md:left-0 md:w-[240px] md:h-screen md:overflow-y-auto md:overflow-x-hidden md:z-40">

          {/* Top bar (logo + mobile hamburger) */}
          <div className="flex items-center justify-between px-5 py-5 md:px-6 md:py-6">
            <Link href="/learn" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="shrink-0 rounded bg-white p-0.5"
              />
              <span className="truncate font-bold text-lg">O2 Campus</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="rounded-lg p-2 hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="block text-lg leading-none">
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </span>
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:flex-col md:gap-0.5 md:px-4 md:pb-6">
            {me && (
              <div className="mb-4 rounded-xl bg-white/10 px-3 py-3">
                <p className="truncate text-sm font-semibold text-white">
                  {me.name}
                </p>
                <p className="truncate text-xs text-white/60">{me.email}</p>
              </div>
            )}

            {nav.map(([label, href]) => {
              const Icon = NAV_ICONS[label] ?? LayoutDashboard;
              return <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  path === href || (href !== '/learn' && path.startsWith(href))
                    ? 'bg-white/15 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0 opacity-70" />
                <span className="truncate">{label}</span>
              </Link>;
            })}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 opacity-70" />
              <span className="truncate">O2 website</span>
            </Link>

            <button
              onClick={signOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <LogOut aria-hidden="true" className="size-4 shrink-0 opacity-70" />
              <span className="truncate">Sign out</span>
            </button>
          </nav>

          {/* Mobile nav — collapsible */}
          {mobileOpen && (
            <nav className="flex flex-col gap-1 px-4 pb-5 md:hidden">
              {nav.map(([label, href]) => {
                const Icon = NAV_ICONS[label] ?? LayoutDashboard;
                return <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium ${
                    path === href
                      ? 'bg-flame text-ink'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0 opacity-70" />
                  {label}
                </Link>;
              })}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-3 text-sm text-white hover:bg-white/10"
              >
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 opacity-70" /> O2 website
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-3 text-left text-sm text-white hover:bg-white/10"
              >
                <LogOut aria-hidden="true" className="size-4 shrink-0 opacity-70" /> Sign out
              </button>
            </nav>
          )}

          {/* Mobile horizontal scroll nav (fallback when not open) */}
          {!mobileOpen && (
            <nav
              className="flex gap-2 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:hidden"
              aria-label="Mobile navigation"
            >
              {nav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap ${
                    path === href
                      ? 'border-flame bg-flame text-ink'
                      : 'border-white/25 bg-white/5 text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/"
                className="shrink-0 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-sm text-white whitespace-nowrap"
              >
                Website
              </Link>
              <button
                onClick={signOut}
                className="shrink-0 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-sm text-white whitespace-nowrap"
              >
                Sign out
              </button>
            </nav>
          )}
        </aside>

        {/* ─── Main content ─── */}
        {/* min-w-0 is CRITICAL: without it a child can exceed column */}
        <main className="min-w-0 overflow-x-hidden p-4 md:p-8 lg:p-10 md:ml-[240px]">
          <RouteMotion>{children}</RouteMotion>
        </main>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Megaphone, ClipboardList, Users, BookOpen, ChartNoAxesColumn, FileCheck, ArrowRight } from 'lucide-react';
import { api, upload } from '@/lib/api';
import { useApi } from '@/components/useApi';
const QUICK_ACTIONS = [
  [ClipboardList, 'Review applications', '/admin/applications'],
  [Users, 'Manage students', '/admin/students'],
  [BookOpen, 'Add / edit courses', '/admin/courses'],
  [Megaphone, 'Send announcement', '/admin/announcements'],
  [ChartNoAxesColumn, 'View analytics', '/admin/analytics'],
  [FileCheck, 'Grade assignments', '/admin/assignments'],
] as const;

/* ─── shared ─── */
const inp =
  'w-full rounded-xl border border-[#0a0e2a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#010f6b]/30';
const btn = (variant: 'navy' | 'flame' | 'ghost' | 'danger') =>
  ({
    navy: 'rounded-full bg-[#010f6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#010f6b]/90 transition',
    flame:
      'rounded-full bg-[#ff8c1e] px-5 py-2 text-sm font-semibold text-[#0a0e2a] hover:brightness-105 transition',
    ghost:
      'rounded-full border border-[#0a0e2a]/20 px-5 py-2 text-sm font-semibold text-[#0a0e2a] hover:bg-[#0a0e2a]/5 transition',
    danger:
      'rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition',
  })[variant];

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#0a0e2a]/10 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color = 'text-[#010f6b]',
}: {
  label: string;
  value: any;
  sub?: string;
  color?: string;
}) {
  return (
    <Card className="p-5">
      <p className={`text-3xl font-extrabold md:text-4xl ${color}`}>
        {value ?? '—'}
      </p>
      <p className="mt-1 text-sm font-medium text-[#0a0e2a]">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-[#0a0e2a]/50">{sub}</p>}
    </Card>
  );
}

function Bar({
  label,
  value,
  color = 'bg-[#010f6b]',
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-[#0a0e2a]/70">{label}</span>
        <span className="font-semibold text-[#0a0e2a]">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#0a0e2a]/8">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ─── page header ─── */
function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0a0e2a] md:text-3xl">
            {title}
          </h1>
          {sub && <p className="mt-0.5 text-sm text-[#0a0e2a]/60">{sub}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   OVERVIEW TAB
══════════════════════════════════════════ */
export default function AdminPage() {
  return <Overview />;
}

function Overview() {
  const overview = useApi<any>('/admin/overview');
  const d = overview.data;
  if (overview.loading) return <div aria-label="Loading admin dashboard" aria-busy="true" className="animate-pulse space-y-6 p-6"><div className="h-14 rounded-2xl bg-white" /><div className="grid grid-cols-2 gap-4 xl:grid-cols-4">{[0,1,2,3].map(i => <div key={i} className="h-28 rounded-2xl bg-white" />)}</div><div className="grid gap-6 lg:grid-cols-2"><div className="h-80 rounded-2xl bg-white" /><div className="h-80 rounded-2xl bg-white" /></div></div>;

  const stats = d
    ? [
        { label: 'Total students', value: d.students, color: 'text-[#010f6b]' },
        { label: 'Active courses', value: d.courses, color: 'text-[#010f6b]' },
        {
          label: 'Pending apps',
          value: d.pending,
          color: d.pending > 0 ? 'text-[#ff8c1e]' : 'text-[#010f6b]',
        },
        {
          label: 'Certs issued',
          value: d.certificates,
          color: 'text-emerald-600',
        },
      ]
    : Array(4).fill({ label: '…', value: '…' });

  return (
    <div>
      <PageHeader
        title="Dashboard overview"
        sub={new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        action={
          <Link
            href="/admin/courses"
            className="rounded-full bg-[#010f6b] px-5 py-2 text-sm font-semibold !text-white hover:bg-[#010f6b]/90 transition"
          >
            + New course
          </Link>
        }
      />

      <div className="space-y-6 p-6">
        {/* Stat row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s: any, i) => (
            <StatCard key={i} label={s.label} value={s.value} color={s.color} />
          ))}
        </div>

        {/* Middle row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Progress bars */}
          <Card className="p-5 lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold">Platform pulse</h2>
            <div className="space-y-4">
              <Bar
                label="Course completion"
                value={d?.completion_rate ?? 72}
                color="bg-[#010f6b]"
              />
              <Bar label="Assignment graded" value={63} color="bg-[#ff8c1e]" />
              <Bar label="Avg test score" value={78} color="bg-emerald-500" />
              <Bar
                label="Student satisfaction"
                value={88}
                color="bg-purple-500"
              />
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="p-5">
            <h2 className="mb-4 text-lg font-bold">Quick actions</h2>
            <div className="space-y-2 text-sm">
              {QUICK_ACTIONS.map(([Icon, label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-xl border border-[#0a0e2a]/10 bg-[#f6f7fb] px-4 py-3 font-medium text-[#0a0e2a] hover:border-[#010f6b]/30 hover:bg-[#010f6b]/5 transition"
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-navy" />
                  <span className="flex-1">{label}</span>
                  <ArrowRight aria-hidden="true" className="size-4 text-[#0a0e2a]/40" />
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent apps + course performance */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentApps />
          <CoursePerf />
        </div>
      </div>
    </div>
  );
}

function RecentApps() {
  const list = useApi<any[]>('/admin/applications').data;
  const pending = list?.filter((a) => a.status === 'pending').slice(0, 5) ?? [];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Pending applications</h2>
        <Link
          href="/admin/applications"
          className="text-sm font-semibold text-[#010f6b] underline"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {pending.length === 0 && (
          <p className="text-sm text-[#0a0e2a]/50">No pending applications.</p>
        )}
        {pending.map((a: any) => (
          <div
            key={a.id}
            className="flex items-center gap-3 rounded-xl bg-[#f6f7fb] px-4 py-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#010f6b] text-sm font-bold text-white">
              {a.full_name?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{a.full_name}</p>
              <p className="truncate text-xs text-[#0a0e2a]/60">
                {a.email} · {a.mode}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#ff8c1e]/20 px-2 py-0.5 text-xs font-bold text-[#ff8c1e]">
              Pending
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CoursePerf() {
  const courses = useApi<any[]>('/courses').data ?? [];
  const analytics = useApi<any>('/admin/analytics').data;
  const colors = [
    'bg-[#010f6b]',
    'bg-[#ff8c1e]',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-sky-500',
    'bg-indigo-500',
  ];

  const rows = courses.map((c: any, i: number) => {
    const stat = analytics?.course_stats?.find(
      (s: any) => s.id === c.id || s.slug === c.slug,
    );
    return [c.title, stat?.avg_progress ?? 75, colors[i % colors.length]];
  });

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Course completion rates</h2>
        <span className="text-xs text-[#0a0e2a]/50">
          {courses.length} courses
        </span>
      </div>
      <div className="space-y-4">
        {rows.slice(0, 6).map(([label, value, color]: any) => (
          <Bar key={label} label={label} value={value} color={color} />
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-[#0a0e2a]/50">Loading courses…</p>
        )}
      </div>
    </Card>
  );
}

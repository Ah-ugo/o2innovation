'use client';
import { useApi } from '@/components/useApi';
import Reveal from '@/components/Reveal';

function Bar({ label, value, color = 'bg-[#010f6b]', max = 100 }: { label: string; value: number; color?: string; max?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-[#0a0e2a]/70">{label}</span>
        <span className="font-semibold text-[#0a0e2a]">{value}{max === 100 ? '%' : ''}</span>
      </div>
      <div className="h-2.5 rounded-full bg-[#0a0e2a]/8">
        <div className={`h-2.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Analytics() {
  const d = useApi<any>('/admin/analytics').data;

  const topStats = [
    { label: 'Completion rate', value: `${d?.completion_rate ?? 78}%`,    color: 'text-[#010f6b]' },
    { label: 'Drop-off rate',   value: `${d?.dropout_rate ?? 22}%`,       color: 'text-red-600' },
    { label: 'Total revenue',   value: d?.revenue ?? '₦1.9M',             color: 'text-emerald-600' },
    { label: 'Active learners', value: d?.active_learners ?? 346,         color: 'text-[#010f6b]' },
    { label: 'Avg test score',  value: `${d?.avg_score ?? 74}%`,          color: 'text-purple-600' },
    { label: 'Certs issued',    value: d?.certificates ?? 0,              color: 'text-[#ff8c1e]' },
  ];

  const courseRows = d?.course_stats ?? [
    { title: 'Cyber Security',  completion: 82, enrolled: 120, revenue: '₦600K' },
    { title: 'Data Science',    completion: 76, enrolled: 98,  revenue: '₦490K' },
    { title: 'Data Analysis',   completion: 68, enrolled: 75,  revenue: '₦375K' },
    { title: 'Mobile Dev',      completion: 84, enrolled: 60,  revenue: '₦360K' },
    { title: 'Software Dev',    completion: 71, enrolled: 87,  revenue: '₦435K' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const enrolled = d?.monthly_enrolled ?? [8, 14, 20, 18, 26, 31, 28, 35, 42, 39];
  const maxE = Math.max(...enrolled);

  return (
    <div>
      <Reveal><div className="border-b border-[#0a0e2a]/10 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold md:text-3xl">Analytics</h1>
        <p className="mt-0.5 text-sm text-[#0a0e2a]/60">Platform performance and revenue overview</p>
      </div></Reveal>

      <div className="space-y-6 p-6">
        {/* Headline stats */}
        <Reveal><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {topStats.map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-4 shadow-sm">
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="mt-1 text-xs text-[#0a0e2a]/60">{label}</p>
            </div>
          ))}
        </div></Reveal>

        {/* Enrolment chart (bar) */}
        <Reveal><div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm">
          <h2 className="mb-5 font-bold text-lg">Monthly enrolments (2025)</h2>
          <div className="flex items-end gap-2 h-40">
            {enrolled.map((v: number, i: number) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-[#0a0e2a]/60">{v}</span>
                <div className="w-full rounded-t-md bg-[#010f6b]" style={{ height: `${(v / maxE) * 120}px` }} />
                <span className="text-[10px] text-[#0a0e2a]/50">{months[i]}</span>
              </div>
            ))}
          </div>
        </div></Reveal>

        {/* Course performance table */}
        <Reveal><div className="rounded-2xl border border-[#0a0e2a]/10 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#0a0e2a]/10 px-5 py-4">
            <h2 className="font-bold text-lg">Course performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-[#f6f7fb] text-xs uppercase tracking-wide text-[#0a0e2a]/60">
                <tr>
                  {['Course', 'Enrolled', 'Completion', 'Revenue'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0a0e2a]/8">
                {courseRows.map((r: any) => (
                  <tr key={r.title} className="hover:bg-[#f6f7fb] transition">
                    <td className="px-5 py-3 font-medium">{r.title}</td>
                    <td className="px-5 py-3">{r.enrolled}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-[#0a0e2a]/10">
                          <div className="h-1.5 rounded-full bg-[#010f6b]" style={{ width: `${r.completion}%` }} />
                        </div>
                        <span>{r.completion}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-emerald-700">{r.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div></Reveal>

        {/* Progress bars section */}
        <Reveal><div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-lg">Platform engagement</h2>
            <Bar label="Course completion" value={d?.completion_rate ?? 78} />
            <Bar label="Lesson watch rate" value={85} color="bg-[#ff8c1e]" />
            <Bar label="Quiz pass rate" value={73} color="bg-purple-500" />
            <Bar label="Assignment submission" value={68} color="bg-sky-500" />
          </div>
          <div className="rounded-2xl border border-[#0a0e2a]/10 bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-lg">Student outcomes</h2>
            <Bar label="Certificates issued" value={d?.certificates ?? 41} max={d?.students ?? 200} color="bg-emerald-500" />
            <Bar label="Top scorers (≥90%)" value={28} max={d?.students ?? 200} color="bg-[#010f6b]" />
            <Bar label="Repeat enrolments" value={15} max={d?.students ?? 200} color="bg-[#ff8c1e]" />
          </div>
        </div></Reveal>
      </div>
    </div>
  );
}

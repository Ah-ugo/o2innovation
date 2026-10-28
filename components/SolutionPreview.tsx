import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, CreditCard,
  FileCheck2, FileText, GraduationCap, LayoutDashboard, MoreHorizontal,
  Play, Search, ShieldCheck, Users, Wallet,
} from 'lucide-react';

const ink = '#111b3b';

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,.18)]">
      <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-[#10182d] px-4">
        <span className="size-2.5 rounded-full bg-[#fa766f]" />
        <span className="size-2.5 rounded-full bg-[#f2c14e]" />
        <span className="size-2.5 rounded-full bg-[#5fc58d]" />
        <div className="ml-3 hidden h-5 max-w-64 flex-1 items-center rounded bg-white/10 px-3 text-[9px] text-white/55 sm:flex">app.o2lab.ng</div>
        <ShieldCheck className="ml-auto size-3.5 text-white/55" />
      </div>
      <div className="min-h-[310px] bg-[#f5f7fb] text-slate-800 sm:min-h-[370px]">{children}</div>
    </figure>
  );
}

function AppTop({ product, crumb }: { product: string; crumb: string }) {
  return <div className="flex h-12 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
    <div className="flex min-w-0 items-center gap-2 text-[10px] sm:text-xs"><span className="grid size-6 shrink-0 place-items-center rounded-md bg-[#101d55] text-[9px] font-bold text-white">O₂</span><span className="truncate font-bold" style={{ color: ink }}>{product}</span><span className="hidden text-slate-300 sm:inline">/</span><span className="hidden truncate text-slate-500 sm:inline">{crumb}</span></div>
    <div className="ml-auto flex items-center gap-3 text-slate-400"><Search className="size-3.5" /><Bell className="size-3.5" /><span className="grid size-6 place-items-center rounded-full bg-[#e8ecff] text-[9px] font-bold text-[#2446d8]">OA</span></div>
  </div>;
}

function Kpi({ label, value, change, icon: Icon }: { label: string; value: string; change?: string; icon: typeof Users }) {
  return <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3"><div className="flex items-center justify-between gap-1"><span className="truncate text-[8px] font-medium text-slate-500 sm:text-[10px]">{label}</span><Icon className="size-3 shrink-0 text-[#5268d5]" /></div><p className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">{value}</p>{change && <p className="mt-0.5 flex items-center gap-0.5 text-[8px] text-emerald-700 sm:text-[9px]"><ArrowUpRight className="size-2.5" />{change}</p>}</div>;
}

function ExamScreen() {
  return <><AppTop product="O2 Assess" crumb="Marking review" /><div className="p-3 sm:p-5">
    <div className="flex items-start justify-between gap-3"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Mathematics · Senior secondary 3</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Marking review</h3><p className="mt-0.5 text-[9px] text-slate-500">May 2026 examination · Paper 2</p></div><button className="hidden rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[9px] font-semibold sm:block">Export results</button></div>
    <div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Scripts marked" value="148 / 152" change="97% complete" icon={FileCheck2} /><Kpi label="Awaiting review" value="12" icon={Clock3} /><Kpi label="Class average" value="74%" change="4.2% this term" icon={GraduationCap} /></div>
    <div className="mt-3 grid gap-2 sm:grid-cols-[1.4fr_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold text-slate-700 sm:text-[10px]">Candidate 0084 <span className="font-normal text-slate-400">· Question 3</span></p><span className="rounded bg-amber-50 px-1.5 py-1 text-[8px] font-semibold text-amber-700">Needs review</span></div><div className="mt-2 rounded-md bg-[#f7f8fc] p-2.5"><p className="text-[9px] font-medium text-slate-500">Response</p><p className="mt-1 line-clamp-3 text-[9px] leading-relaxed text-slate-700 sm:text-[10px]">The gradient is calculated from the change in y divided by the change in x. Substituting the two points gives a gradient of 3.</p></div><div className="mt-2 flex items-center justify-between rounded-md border border-indigo-100 bg-indigo-50/60 p-2"><div><p className="text-[8px] font-semibold text-indigo-900">AI suggested mark</p><p className="text-[8px] text-indigo-700">Key steps are present</p></div><p className="text-sm font-bold text-indigo-900">8<span className="text-[9px] font-medium"> / 10</span></p></div></div>
      <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-3"><p className="text-[9px] font-semibold text-slate-700">Marking guide</p><p className="mt-1.5 text-[8px] leading-relaxed text-slate-500">Award marks for identifying the correct formula, substituting coordinates, and simplifying the result.</p><div className="mt-auto flex gap-1.5 pt-3"><button className="flex-1 rounded-md bg-[#2446d8] py-1.5 text-[8px] font-semibold text-white">Approve 8/10</button><button className="rounded-md border border-slate-200 px-2 py-1.5 text-[8px] font-semibold text-slate-600">Adjust</button></div></div>
    </div>
  </div></>;
}

function PortalScreen() {
  return <><AppTop product="O2 School Portal" crumb="School overview" /><div className="p-3 sm:p-5">
    <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">2025 / 2026 · Second term</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">School overview</h3></div><button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[8px] text-slate-600">Second term <ChevronDown size={11} /></button></div>
    <div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Enrolled students" value="1,284" change="6.8% this year" icon={Users} /><Kpi label="Results published" value="92%" icon={FileText} /><Kpi label="Fees collected" value="₦18.4m" change="Term target 86%" icon={CreditCard} /></div>
    <div className="mt-3 grid gap-2 sm:grid-cols-[1.5fr_1fr]"><div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-3 py-2"><p className="text-[9px] font-semibold text-slate-700">Recent student records</p><button className="text-[8px] font-semibold text-[#2446d8]">View all</button></div><div className="grid grid-cols-[1.3fr_.8fr_.7fr] gap-1 bg-slate-50 px-3 py-1.5 text-[7px] font-semibold uppercase text-slate-400"><span>Student</span><span>Class</span><span>Status</span></div>{[['Amina Yusuf','SS 3A','Published'],['David Okafor','SS 2B','Pending'],['Mary James','JSS 3A','Published']].map(([n,c,s])=><div key={n} className="grid grid-cols-[1.3fr_.8fr_.7fr] items-center gap-1 border-t border-slate-100 px-3 py-2 text-[8px]"><span className="truncate font-medium text-slate-700">{n}</span><span className="text-slate-500">{c}</span><span className={s==='Published'?'text-emerald-700':'text-amber-700'}>{s}</span></div>)}</div><div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold text-slate-700">Fee collection</p><MoreHorizontal size={13} className="text-slate-400" /></div><div className="mt-3 flex h-14 items-end gap-1">{[38,53,45,72,59,83,68,92,76,100,84,94].map((h,i)=><div key={i} className="flex-1 rounded-t-sm bg-[#536fe0]" style={{height:`${h}%`,opacity:.38+i*.045}} />)}</div><div className="mt-2 flex justify-between text-[7px] text-slate-400"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div></div></div>
  </div></>;
}

function PayrollScreen() {
  return <><AppTop product="O2 Payroll" crumb="Payroll overview" /><div className="p-3 sm:p-5">
    <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Finance workspace</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Payroll overview</h3></div><button className="rounded-md bg-[#2446d8] px-2.5 py-1.5 text-[8px] font-semibold text-white">Run payroll</button></div>
    <div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Monthly payroll" value="₦42.8m" change="Within budget" icon={Wallet} /><Kpi label="Staff paid" value="126 / 126" icon={CheckCircle2} /><Kpi label="Next pay date" value="28 May" icon={CalendarDays} /></div>
    <div className="mt-3 grid gap-2 sm:grid-cols-[1.3fr_1fr]"><div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><div><p className="text-[9px] font-semibold text-slate-700">Payroll costs</p><p className="mt-0.5 text-[8px] text-slate-400">January – June 2026</p></div><button className="rounded border border-slate-200 px-1.5 py-1 text-[7px] text-slate-500">This year <ChevronDown size={9} className="inline" /></button></div><div className="mt-3 flex h-16 items-end gap-2">{[55,68,59,82,72,91].map((h,i)=><div key={i} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t bg-[#556de0]" style={{height:`${h}%`}} /><span className="text-[7px] text-slate-400">{'JFMAMJ'[i]}</span></div>)}</div></div>
    <div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-[9px] font-semibold text-slate-700">Recent payroll runs</p><div className="mt-1 divide-y divide-slate-100">{[['May 2026','₦42.8m','Paid'],['April 2026','₦41.9m','Paid'],['March 2026','₦41.9m','Paid']].map(([m,v,s])=><div key={m} className="flex items-center gap-2 py-2"><span className="grid size-6 place-items-center rounded-md bg-indigo-50 text-[#5367c9]"><FileText size={12} /></span><div className="min-w-0 flex-1"><p className="text-[8px] font-medium text-slate-700">{m}</p><p className="text-[7px] text-slate-400">126 employees</p></div><div className="text-right"><p className="text-[8px] font-semibold text-slate-700">{v}</p><p className="text-[7px] text-emerald-700">{s}</p></div></div>)}</div></div></div>
  </div></>;
}

function LearningScreen() {
  return <><AppTop product="O2 Campus" crumb="My learning" /><div className="p-3 sm:p-5">
    <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Good morning, Amina</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Pick up where you left off</h3></div><button className="grid size-7 place-items-center rounded-full bg-indigo-50 text-[#5367c9]"><CircleHelp size={13} /></button></div>
    <div className="mt-3 grid gap-2 sm:grid-cols-[1.35fr_1fr]"><div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="relative grid aspect-[2.1/1] place-items-center overflow-hidden bg-[#111b3b]"><img src="/images/learning/workshop-presenter.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-65" /><div className="absolute inset-0 bg-gradient-to-t from-[#07102f]/70 via-[#07102f]/10 to-[#07102f]/10" /><button className="relative grid size-10 place-items-center rounded-full bg-white text-[#2446d8] shadow-lg"><Play size={16} fill="currentColor" /></button><span className="absolute bottom-2 left-3 text-[8px] font-semibold text-white/90">LESSON 04 · 12:36</span><span className="absolute bottom-2 right-3 text-[8px] font-semibold text-white/90">HD</span></div><div className="p-3"><div className="flex items-center justify-between"><div><p className="text-[8px] font-semibold text-[#5367c9]">DATA ANALYTICS · MODULE 2</p><p className="mt-0.5 text-[10px] font-bold text-[#111b3b]">Building your first dashboard</p></div><button className="rounded-md bg-[#2446d8] px-2 py-1.5 text-[8px] font-semibold text-white">Continue lesson</button></div><div className="mt-2 h-1 rounded-full bg-slate-100"><div className="h-1 w-[64%] rounded-full bg-[#536de0]" /></div></div></div>
    <div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold text-slate-700">Your learning plan</p><span className="text-[8px] font-semibold text-[#5367c9]">64% complete</span></div><div className="mt-2 h-1 rounded-full bg-slate-100"><div className="h-1 w-[64%] rounded-full bg-[#536de0]" /></div><div className="mt-2 divide-y divide-slate-100">{[['Introduction to data','done'],['Clean and prepare data','done'],['Build a dashboard','current'],['Present your findings','next']].map(([t,s],i)=><div key={t} className="flex items-center gap-2 py-2"><span className={`grid size-5 place-items-center rounded-full ${s==='done'?'bg-emerald-50 text-emerald-700':s==='current'?'bg-indigo-50 text-[#5367c9]':'bg-slate-50 text-slate-400'}`}>{s==='done'?<Check size={11} />:s==='current'?<Play size={9} />:<span className="text-[8px]">{i+1}</span>}</span><span className={`min-w-0 flex-1 truncate text-[8px] ${s==='current'?'font-semibold text-[#111b3b]':'text-slate-500'}`}>{t}</span>{s==='current'&&<span className="text-[7px] text-[#5367c9]">12 min</span>}</div>)}</div></div></div>
  </div></>;
}

function AttendanceScreen() {
  return <><AppTop product="O2 Attendance" crumb="Daily register" /><div className="p-3 sm:p-5"><div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Monday · 18 May 2026</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Attendance overview</h3></div><button className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[8px] text-slate-600">Download report <ArrowDownRight size={10} className="inline" /></button></div><div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Present today" value="1,146" change="91% attendance" icon={CheckCircle2} /><Kpi label="Late arrivals" value="38" icon={Clock3} /><Kpi label="Absent" value="74" icon={Users} /></div><div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-3 py-2"><p className="text-[9px] font-semibold text-slate-700">Latest check-ins</p><span className="flex items-center gap-1 text-[8px] text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> Live updates</span></div><div className="grid grid-cols-[1.2fr_.8fr_.6fr] gap-1 bg-slate-50 px-3 py-1.5 text-[7px] font-semibold uppercase text-slate-400"><span>Name</span><span>Check-in</span><span>Method</span></div>{[['Amina Yusuf','08:02','QR scan'],['David Okafor','08:17','Biometric'],['Mary James','08:24','QR scan']].map(([n,t,m])=><div key={n} className="grid grid-cols-[1.2fr_.8fr_.6fr] items-center gap-1 border-t border-slate-100 px-3 py-2 text-[8px]"><span className="truncate font-medium text-slate-700">{n}</span><span className="text-slate-500">{t}</span><span className="text-slate-500">{m}</span></div>)}</div></div></>;
}

function BusinessScreen() {
  return <><AppTop product="O2 Operations" crumb="Business overview" /><div className="p-3 sm:p-5"><div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Tuesday · 19 May 2026</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Business overview</h3></div><button className="rounded-md bg-[#2446d8] px-2.5 py-1.5 text-[8px] font-semibold text-white">New transaction</button></div><div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Revenue this month" value="₦8.42m" change="12.4% vs last month" icon={Wallet} /><Kpi label="Outstanding invoices" value="₦1.28m" icon={FileText} /><Kpi label="Stock items" value="2,418" change="98% in stock" icon={LayoutDashboard} /></div><div className="mt-3 grid gap-2 sm:grid-cols-[1.35fr_1fr]"><div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-[9px] font-semibold text-slate-700">Revenue and expenses</p><div className="mt-3 flex h-16 items-end gap-2">{[[48,30],[60,39],[53,35],[74,46],[68,40],[92,56],[81,51]].map(([a,b],i)=><div key={i} className="flex flex-1 items-end justify-center gap-0.5"><div className="w-2/5 rounded-t-sm bg-[#536de0]" style={{height:`${a}%`}}/><div className="w-2/5 rounded-t-sm bg-[#f6a54c]" style={{height:`${b}%`}}/></div>)}</div><div className="mt-2 flex justify-between text-[7px] text-slate-400"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className="mt-2 flex gap-3 text-[7px] text-slate-500"><span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-[#536de0]"/>Revenue</span><span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-[#f6a54c]"/>Expenses</span></div></div><div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-[9px] font-semibold text-slate-700">Approvals to review</p><div className="mt-1 divide-y divide-slate-100">{[['Purchase order','PO-2048','₦245,000'],['Supplier invoice','INV-0912','₦128,500'],['Leave request','HR-0146','2 days']].map(([a,b,c])=><div key={b} className="flex items-center gap-2 py-2"><span className="grid size-6 place-items-center rounded-md bg-indigo-50 text-[#5367c9]"><FileCheck2 size={12}/></span><div className="min-w-0 flex-1"><p className="truncate text-[8px] font-medium text-slate-700">{a}</p><p className="text-[7px] text-slate-400">{b}</p></div><span className="text-[8px] font-semibold text-slate-700">{c}</span></div>)}</div></div></div></div></>;
}

function CustomSoftwareScreen() {
  return <><AppTop product="O2 Workspace" crumb="Project dashboard" /><div className="p-3 sm:p-5"><div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-wider text-[#5367c9]">Product delivery · Q2 2026</p><h3 className="mt-1 text-sm font-bold text-[#111b3b] sm:text-lg">Project dashboard</h3></div><button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[8px] text-slate-600"><Users size={11}/> Invite team</button></div><div className="mt-3 grid grid-cols-3 gap-2"><Kpi label="Sprint progress" value="78%" change="On track" icon={CheckCircle2} /><Kpi label="Open tasks" value="24" icon={FileCheck2} /><Kpi label="Next release" value="4 days" icon={CalendarDays} /></div><div className="mt-3 grid gap-2 sm:grid-cols-[1.2fr_1fr]"><div className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold text-slate-700">Sprint board</p><button className="text-[8px] font-semibold text-[#2446d8]">View board <ArrowRight size={9} className="inline"/></button></div><div className="mt-2 grid grid-cols-3 gap-1.5">{[['TO DO','5','Define reports'],['IN PROGRESS','3','Payments API'],['DONE','8','User access']].map(([col,num,task])=><div key={col} className="rounded-md bg-slate-50 p-1.5"><div className="flex items-center justify-between text-[7px] font-semibold text-slate-500"><span>{col}</span><span>{num}</span></div><div className="mt-1.5 rounded border border-slate-200 bg-white p-1.5 text-[7px] font-medium text-slate-600">{task}</div><div className="mt-1 h-7 rounded border border-dashed border-slate-200"/></div>)}</div></div><div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-[9px] font-semibold text-slate-700">Recent activity</p><div className="mt-2 space-y-2.5">{[['AM','Amina merged a change','8 min ago'],['DO','David updated the API','42 min ago'],['MJ','Mary closed an issue','2 hours ago']].map(([initial,name,time],i)=><div key={name} className="flex gap-2"><span className={`grid size-5 shrink-0 place-items-center rounded-full ${i===0?'bg-indigo-100 text-indigo-700':i===1?'bg-orange-100 text-orange-700':'bg-emerald-100 text-emerald-700'} text-[7px] font-bold`}>{initial}</span><div><p className="text-[8px] font-medium text-slate-700">{name}</p><p className="text-[7px] text-slate-400">{time}</p></div></div>)}</div></div></div></div></>;
}

const screens: Record<string, () => React.JSX.Element> = {
  'e-exams': ExamScreen,
  'school-portals': PortalScreen,
  payroll: PayrollScreen,
  'e-learning': LearningScreen,
  attendance: AttendanceScreen,
  'business-management': BusinessScreen,
  'custom-software': CustomSoftwareScreen,
};

const names: Record<string, string> = {
  'e-exams': 'Assessment and marking interface',
  'school-portals': 'School administration portal interface',
  payroll: 'Payroll management interface',
  'e-learning': 'Online learning platform interface',
  attendance: 'Attendance management interface',
  'business-management': 'Business management interface',
  'custom-software': 'Custom software project workspace interface',
};

export default function SolutionPreview({ slug, className = '' }: { slug: string; className?: string }) {
  const Screen = screens[slug] || CustomSoftwareScreen;
  return <div role="img" aria-label={names[slug] || names['custom-software']} className={className}><Browser><Screen /></Browser></div>;
}

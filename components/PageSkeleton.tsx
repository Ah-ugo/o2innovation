export default function PageSkeleton({ kind = 'content' }: { kind?: 'content' | 'admin' | 'dashboard' | 'catalogue' }) {
  return (
    <div aria-label="Loading page" aria-busy="true" className="mx-auto w-full max-w-7xl animate-pulse space-y-7 px-4 py-6 sm:px-6">
      {kind === 'admin' && <div className="h-16 rounded-2xl bg-white" />}
      <div className="h-52 rounded-3xl bg-navy/10 sm:h-64" />
      {kind === 'dashboard' && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[0,1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white" />)}</div>}
      <div className="h-9 w-1/3 rounded-lg bg-ink/10" />
      <div className={`grid gap-4 ${kind === 'catalogue' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {[0,1,2,3,4,5].map(i => <div key={i} className="overflow-hidden rounded-2xl bg-white"><div className="h-36 bg-ink/5" /><div className="space-y-3 p-5"><div className="h-5 w-3/4 rounded bg-ink/10" /><div className="h-4 rounded bg-ink/5" /><div className="h-4 w-2/3 rounded bg-ink/5" /></div></div>)}
      </div>
    </div>
  );
}

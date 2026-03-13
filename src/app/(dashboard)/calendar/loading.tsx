export default function ModuleLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-lg bg-accent/50 animate-pulse" />
          <div className="h-4 w-56 rounded bg-accent/30 animate-pulse" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-accent/50 animate-pulse" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/40 bg-card p-5 space-y-2">
            <div className="h-3 w-20 rounded bg-accent/30 animate-pulse" />
            <div className="h-7 w-12 rounded bg-accent/50 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border-b border-border/30 last:border-0">
            <div className="h-8 w-8 rounded-full bg-accent/40 animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-2/3 rounded bg-accent/40 animate-pulse" />
              <div className="h-3 w-1/3 rounded bg-accent/30 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

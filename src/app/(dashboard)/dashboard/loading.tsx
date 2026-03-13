export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-lg bg-accent/50 animate-pulse" />
        <div className="h-4 w-72 rounded bg-accent/30 animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/40 bg-card p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-9 w-9 rounded-lg bg-accent/50 animate-pulse" />
              <div className="h-5 w-12 rounded-full bg-accent/30 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-24 rounded bg-accent/30 animate-pulse" />
              <div className="h-7 w-16 rounded bg-accent/50 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/40 bg-card p-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="h-10 w-10 rounded-lg bg-accent/50 animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-accent/40 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-accent/30 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border/40 bg-card p-4 space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-accent/20 p-4 animate-pulse h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}

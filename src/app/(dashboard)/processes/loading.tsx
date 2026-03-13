export default function ProcessesLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 rounded-lg bg-accent/50 animate-pulse" />
          <div className="h-4 w-64 rounded bg-accent/30 animate-pulse" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-accent/50 animate-pulse" />
      </div>
      <div className="h-10 w-full rounded-xl bg-accent/30 animate-pulse" />
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border-b border-border/30 last:border-0">
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-3/4 rounded bg-accent/40 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-accent/30 animate-pulse" />
            </div>
            <div className="h-4 w-16 rounded bg-accent/30 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

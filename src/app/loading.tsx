export default function Loading() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 w-56 animate-pulse rounded-md bg-slate-800/70" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl bg-slate-800/60" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-800/60" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-800/60" />
      </div>
      <div className="h-72 animate-pulse rounded-2xl bg-slate-800/50" />
    </div>
  );
}

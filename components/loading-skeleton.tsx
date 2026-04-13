export function SchemeCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-blue-100" />
        <div className="h-6 w-20 rounded-full bg-blue-100" />
      </div>
      <div className="h-5 w-3/4 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-11/12 rounded bg-slate-100" />
      <div className="mt-5 h-9 w-28 rounded-xl bg-blue-100" />
    </div>
  );
}

export function SchemeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <SchemeCardSkeleton key={idx} />
      ))}
    </div>
  );
}

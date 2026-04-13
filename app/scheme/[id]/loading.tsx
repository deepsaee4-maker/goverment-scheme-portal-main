export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      <div className="h-5 w-32 animate-pulse rounded bg-blue-100" />
      <div className="mt-4 rounded-3xl border border-blue-100 bg-white p-6">
        <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-slate-100" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </main>
  );
}

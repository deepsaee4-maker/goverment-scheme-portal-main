export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="h-14 w-64 animate-pulse rounded bg-slate-200" />
      <div className="mt-5 h-32 animate-pulse rounded-2xl border border-blue-100 bg-white" />
      <div className="mt-5 h-72 animate-pulse rounded-2xl border border-blue-100 bg-white" />
    </main>
  );
}

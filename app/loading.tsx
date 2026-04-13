import { SchemeGridSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-7 h-44 animate-pulse rounded-3xl border border-blue-100 bg-white" />
      <SchemeGridSkeleton />
    </main>
  );
}

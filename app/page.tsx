import { prisma } from "@/lib/prisma";
import { SchemeListClient } from "@/components/scheme-list-client";
import { HeroSection } from "@/components/hero";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [schemes, categories] = await Promise.all([
    prisma.scheme.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <HeroSection />
      
      <div id="schemes-directory" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-2 rounded-full bg-blue-600"></div>
          <h2 className="text-2xl font-bold text-slate-900">Current Schemes Directory</h2>
        </div>
        <SchemeListClient schemes={schemes} categories={categories} />
      </div>
    </main>
  );
}

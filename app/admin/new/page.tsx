import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SchemeForm } from "@/components/admin/scheme-form";

export default async function NewSchemePage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      <div className="mb-4">
        <Link href="/admin" className="text-sm font-medium text-blue-700 hover:underline">
          Back to admin
        </Link>
      </div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Add New Scheme</h1>
      <SchemeForm categories={categories} mode="create" />
    </main>
  );
}

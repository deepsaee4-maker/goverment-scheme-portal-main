import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SchemeForm } from "@/components/admin/scheme-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSchemePage({ params }: Props) {
  const { id } = await params;

  const [scheme, categories] = await Promise.all([
    prisma.scheme.findUnique({ where: { id: Number(id) } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!scheme) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      <div className="mb-4">
        <Link href="/admin" className="text-sm font-medium text-blue-700 hover:underline">
          Back to admin
        </Link>
      </div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Edit Scheme</h1>
      <SchemeForm
        categories={categories}
        schemeId={scheme.id}
        mode="edit"
        initialData={{
          title: scheme.title,
          shortDescription: scheme.shortDescription,
          fullDescription: scheme.fullDescription,
          eligibility: scheme.eligibility,
          benefits: scheme.benefits,
          documents: scheme.documents,
          applicationProcess: scheme.applicationProcess,
          categoryId: scheme.categoryId,
        }}
      />
    </main>
  );
}

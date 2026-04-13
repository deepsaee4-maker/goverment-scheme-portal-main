import Link from "next/link";
import { PencilLine, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteSchemeButton } from "@/components/admin/delete-scheme-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [schemes, categories] = await Promise.all([
    prisma.scheme.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-600">Manage schemes, categories, and analytics</p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Scheme
        </Link>
      </div>

      <CategoryForm />

      <section className="mt-5 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">Schemes & Views</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2">Scheme</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Views</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{scheme.title}</td>
                  <td className="px-4 py-3 text-slate-600">{scheme.category.name}</td>
                  <td className="px-4 py-3 text-slate-700">{scheme.views}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/edit/${scheme.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
                      >
                        <PencilLine size={14} />
                        Edit
                      </Link>
                      <DeleteSchemeButton id={scheme.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800">Current Categories</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category.id} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {category.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

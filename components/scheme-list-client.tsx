"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SchemeCard } from "@/components/scheme-card";
import { EmptyState } from "@/components/empty-state";

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Scheme = {
  id: number;
  title: string;
  shortDescription: string;
  category: Category;
};

type Props = {
  schemes: Scheme[];
  categories: Category[];
};

export function SchemeListClient({ schemes, categories }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesQuery = scheme.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || scheme.category.id === Number(selectedCategory);

      return matchesQuery && matchesCategory;
    });
  }, [query, schemes, selectedCategory]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-4 md:p-6 shadow-lg shadow-slate-200/40">
        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          <label className="relative block">
            <Search
              size={20}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by scheme name or keywords..."
              className="w-full rounded-2xl border-0 bg-slate-100/50 py-3.5 pr-4 pl-12 text-[15px] text-slate-900 outline-none ring-1 ring-inset ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full appearance-none rounded-2xl border-0 bg-slate-100/50 px-4 py-3.5 text-[15px] font-medium text-slate-700 outline-none ring-1 ring-inset ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredSchemes.length === 0 ? (
        <EmptyState
          title="No schemes found"
          description="Try adjusting your search criteria or select a different category."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </section>
  );
}

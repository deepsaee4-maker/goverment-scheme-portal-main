"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { availableIcons } from "@/lib/category-icons";

type FormState = {
  name: string;
  icon: string;
};

const initialState: FormState = {
  name: "",
  icon: "Landmark",
};

export function CategoryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to create category");
      }

      toast.success("Category added");
      setForm(initialState);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add category");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Add Category</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Category name"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
        />

        <select
          value={form.icon}
          onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
          {availableIcons.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
}

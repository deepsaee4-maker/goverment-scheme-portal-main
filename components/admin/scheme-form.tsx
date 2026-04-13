"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { schemeSchema } from "@/lib/validators";

type Category = {
  id: number;
  name: string;
};

type SchemeDraft = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  eligibility: string;
  benefits: string;
  documents: string;
  applicationProcess: string;
  categoryId: number;
};

type Props = {
  categories: Category[];
  initialData?: SchemeDraft;
  mode: "create" | "edit";
  schemeId?: number;
};

function getInitialState(categories: Category[], initialData?: SchemeDraft): SchemeDraft {
  if (initialData) {
    return initialData;
  }

  return {
    title: "",
    shortDescription: "",
    fullDescription: "",
    eligibility: "",
    benefits: "",
    documents: "",
    applicationProcess: "",
    categoryId: categories[0]?.id ?? 0,
  };
}

export function SchemeForm({ categories, initialData, mode, schemeId }: Props) {
  const [form, setForm] = useState<SchemeDraft>(() => getInitialState(categories, initialData));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const endpoint = useMemo(() => {
    if (mode === "edit" && schemeId) {
      return `/api/schemes/${schemeId}`;
    }

    return "/api/schemes";
  }, [mode, schemeId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = schemeSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please fix form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(payload?.error ?? "Request failed");
      }

      toast.success(mode === "create" ? "Scheme created" : "Scheme updated");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save scheme");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field: keyof SchemeDraft, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Scheme Name">
          <input
            required
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="field-input"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.categoryId}
            onChange={(event) => updateField("categoryId", Number(event.target.value))}
            className="field-input"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Short Description">
        <textarea
          required
          rows={2}
          value={form.shortDescription}
          onChange={(event) => updateField("shortDescription", event.target.value)}
          className="field-input"
        />
      </Field>

      <Field label="Full Description">
        <textarea
          required
          rows={4}
          value={form.fullDescription}
          onChange={(event) => updateField("fullDescription", event.target.value)}
          className="field-input"
        />
      </Field>

      <Field label="Eligibility">
        <textarea
          required
          rows={3}
          value={form.eligibility}
          onChange={(event) => updateField("eligibility", event.target.value)}
          className="field-input"
        />
      </Field>

      <Field label="Benefits">
        <textarea
          required
          rows={3}
          value={form.benefits}
          onChange={(event) => updateField("benefits", event.target.value)}
          className="field-input"
        />
      </Field>

      <Field label="Documents Required">
        <textarea
          required
          rows={3}
          value={form.documents}
          onChange={(event) => updateField("documents", event.target.value)}
          className="field-input"
        />
      </Field>

      <Field label="Application Process">
        <textarea
          required
          rows={3}
          value={form.applicationProcess}
          onChange={(event) => updateField("applicationProcess", event.target.value)}
          className="field-input"
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : mode === "create" ? "Create Scheme" : "Update Scheme"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1.5 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}

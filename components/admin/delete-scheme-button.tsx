"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: number;
};

export function DeleteSchemeButton({ id }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Delete this scheme? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/schemes/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete scheme");
      }

      toast.success("Scheme deleted");
      router.refresh();
    } catch {
      toast.error("Could not delete scheme");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
    >
      <Trash2 size={14} />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}

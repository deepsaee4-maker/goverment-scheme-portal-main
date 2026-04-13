import { z } from "zod";

export const schemeSchema = z.object({
  title: z.string().min(3, "Scheme name must be at least 3 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(180, "Short description must be 180 characters or fewer"),
  fullDescription: z.string().min(30, "Full description must be at least 30 characters"),
  eligibility: z.string().min(10, "Eligibility must be at least 10 characters"),
  benefits: z.string().min(10, "Benefits must be at least 10 characters"),
  documents: z.string().min(10, "Documents must be at least 10 characters"),
  applicationProcess: z.string().min(10, "Application process must be at least 10 characters"),
  categoryId: z.coerce.number().int().positive("Please select a category"),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  icon: z.string().min(2, "Icon name is required"),
});

export type SchemeInput = z.infer<typeof schemeSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;

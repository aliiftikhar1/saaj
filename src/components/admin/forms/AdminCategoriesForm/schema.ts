import { z } from "zod";

export const AdminCategoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  tagline: z.string().optional(),
  imageUrl: z.string().optional(),
  image: z
    .instanceof(Blob)
    .refine((file) => file.size <= 1 * 1024 * 1024, "Max file size is 1MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG and PNG formats are accepted",
    )
    .optional(),
});

export type AdminCategoryFormData = z.output<typeof AdminCategoryFormSchema>;

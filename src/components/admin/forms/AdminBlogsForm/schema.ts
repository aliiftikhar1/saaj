import { z } from "zod";

import { BlogCategory } from "@/types/client";

// === SCHEMA ===
export const AdminBlogsFormSchema = (isEditMode: boolean) =>
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z
      .string()
      .min(1, "Category is required")
      .refine(
        (val) => Object.values(BlogCategory).includes(val as BlogCategory),
        {
          message: "Invalid category",
        },
      ),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase with hyphens only",
      ),
    content: z.string().min(1, "Content is required"),
    authorId: z.string().min(1, "Author is required"),
    image: isEditMode
      ? z.instanceof(Blob).optional()
      : z
          .instanceof(Blob, { message: "Image is required" })
          .refine((file) => file?.size > 0, "Image is required")
          .refine(
            (file) => file.size <= 1 * 1024 * 1024,
            "Max file size is 1MB",
          )
          .refine(
            (file) => ["image/jpeg", "image/png"].includes(file.type),
            "Only JPEG and PNG formats are accepted",
          ),
  });

// === TYPES ===
export type AdminFormSchema = ReturnType<typeof AdminBlogsFormSchema>;
export type AdminBlogsFormData = z.infer<AdminFormSchema>;

export type AdminFormEditBlogsData = z.infer<
  ReturnType<typeof AdminBlogsFormSchema>
>;

export type AdminFormAddBlogsData = Omit<AdminBlogsFormData, "image"> & {
  image: Blob;
};

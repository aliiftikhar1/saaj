import { z } from "zod";

// === SCHEMA ===
export const AdminAuthorsFormSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    occupation: z.string().min(1, "Occupation is required"),
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
export type AdminFormSchema = ReturnType<typeof AdminAuthorsFormSchema>;
export type AdminAuthorsFormData = z.infer<AdminFormSchema>;

export type AdminFormEditAuthorsData = z.infer<
  ReturnType<typeof AdminAuthorsFormSchema>
>;

export type AdminFormAddAuthorsData = Omit<AdminAuthorsFormData, "image"> & {
  image: Blob;
};

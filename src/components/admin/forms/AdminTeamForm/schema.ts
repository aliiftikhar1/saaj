import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be >= 0"),
});

export const AdminTeamFormSchema = (isEditMode: boolean) =>
  baseSchema.extend({
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

export type AdminTeamFormData = z.output<ReturnType<typeof AdminTeamFormSchema>>;
export type AdminFormEditTeamData = AdminTeamFormData;
export type AdminFormAddTeamData = Omit<AdminTeamFormData, "image"> & {
  image: Blob;
};

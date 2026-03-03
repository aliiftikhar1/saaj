import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  text: z.string().min(1, "Review text is required"),
  rating: z.coerce.number().int().min(1).max(5),
  isActive: z.boolean(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be >= 0"),
});

export const AdminTestimonialsFormSchema = (isEditMode: boolean) =>
  baseSchema.extend({
    image: isEditMode
      ? z.instanceof(Blob).optional()
      : z.instanceof(Blob).optional(),
  });

export type AdminTestimonialsFormData = z.output<
  ReturnType<typeof AdminTestimonialsFormSchema>
>;
export type AdminFormEditTestimonialData = AdminTestimonialsFormData;
export type AdminFormAddTestimonialData = AdminTestimonialsFormData;

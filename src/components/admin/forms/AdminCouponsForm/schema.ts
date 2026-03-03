import { z } from "zod";

export const AdminCouponFormSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .regex(/^[A-Za-z0-9_-]+$/, "Code must be alphanumeric"),
  discountPercent: z.coerce
    .number()
    .int()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
  maxUses: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean(),
  expiresAt: z.string().optional(),
});

export type AdminCouponFormData = z.output<typeof AdminCouponFormSchema>;

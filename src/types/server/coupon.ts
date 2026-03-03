export type CouponMutationInput = {
  id: string;
};

export type CouponValidationResult = {
  valid: boolean;
  discountPercent: number;
  code: string;
  message: string;
};

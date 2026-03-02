export const SIZE_TYPES = {
  STANDARD: "Standard",
  SHOE: "ShoeSize",
  ONE_SIZE: "OneSize",
} as const;

export const SIZE_TEMPLATES = {
  [SIZE_TYPES.STANDARD]: ["XS", "S", "M", "L", "XL"],
  [SIZE_TYPES.SHOE]: ["6", "7", "8", "9", "10", "11", "12"],
  [SIZE_TYPES.ONE_SIZE]: ["One Size"],
};

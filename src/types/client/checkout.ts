import { CartItemWithDetails } from "./carts";

export type CheckoutStep = 1 | 2 | 3;

export type CheckoutCartItem = CartItemWithDetails & {
  arrivalDate: string;
};

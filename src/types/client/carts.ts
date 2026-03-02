export type CartQuantityReturn = { quantity: number };

// Cart item with additional product details
export type CartItemWithDetails = {
  id: string;
  cartId: string;
  productId: string;
  sizeId: string;
  quantity: number;
  unitPrice: number;
  title: string;
  image: string;
  size: {
    id: string;
    label: string;
  };
  slug: string;
};

export type FullCart = {
  items: CartItemWithDetails[];
  summary: CartSummary;
};

export type CartSummary = {
  subtotal: string;
  shipping: string;
  total: string;
  itemCount: number;
};

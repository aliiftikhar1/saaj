"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// === TYPES ===
interface DialogProduct {
  productName: string;
  price: string;
  imageUrl: string;
  size?: string;
  category?: string;
  quantity?: number;
}

interface CartContextType {
  dialogOpen: boolean;
  dialogProduct: DialogProduct | null;
  showDialog: (product: DialogProduct) => void;
  hideDialog: () => void;
}

// === CONTEXT ===
const CartContext = createContext<CartContextType | undefined>(undefined);

// === PROVIDER ===
export const CartDialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<DialogProduct | null>(
    null,
  );

  const showDialog = (product: DialogProduct) => {
    setDialogProduct(product);
    setDialogOpen(true);
  };

  const hideDialog = () => {
    setDialogOpen(false);
    setDialogProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        dialogOpen,
        dialogProduct,
        showDialog,
        hideDialog,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartDialog = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartDialog must be used within CartDialogProvider");
  return context;
};

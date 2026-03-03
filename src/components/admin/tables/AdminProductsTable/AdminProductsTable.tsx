"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AdminBaseTable,
  AdminButton,
  AdminDropdownMenu,
  AdminDropdownMenuTrigger,
  AdminDropdownMenuContent,
  AdminDropdownMenuItem,
  AdminDropdownMenuSeparator,
  AdminTooltip,
  AdminTooltipTrigger,
  AdminAlertDialog,
  AdminAlertDialogContent,
  AdminAlertDialogTitle,
  AdminAlertDialogDescription,
  AdminAlertDialogCancel,
  AdminAlertDialogAction,
  AdminAlertDialogHeader,
  AdminAlertDialogFooter,
  AdminInput,
  AdminDropdownMenuLabel,
  AdminDropdownMenuCheckboxItem,
  buttonVariants,
} from "@/components/admin";
import {
  adminRoutes,
  cn,
  formatDateToYYYYMMDD,
} from "@/lib";
import { productColumns, defaultVisibleProductColumnIds } from "./columns";
import { ProductGetAllCounts } from "@/types/client";
import { deleteProductById, toggleProductFeatured } from "@/lib/server/actions";

export function AdminProductsTable({
  products,
}: {
  products: ProductGetAllCounts[];
}) {
  // === STATE ===
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [columnsVisible, setColumnsVisible] = useState<Set<string>>(
    defaultVisibleProductColumnIds,
  );
  const [productsState, setProductsState] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  // === FUNCTIONS ===
  const deleteProduct = async (id: string) => {
    const deleted = await deleteProductById(id);

    if (!deleted.success) {
      console.error("Error deleting product:", deleted.error);
      toast.error("Failed to delete product. Please try again.");
      return;
    }

    setPendingDeleteId(null);
    setProductsState((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully.");
  };

  const formatProducts = (products: ProductGetAllCounts[]) => {
    return products.map((product) => ({
      ...product,
      categoryName: product.categoryName,
      price: `${product.price.toFixed(2)}`,
      isActive: product.isActive ? "Yes" : "No",
      isFeatured: product.isFeatured ? "Yes" : "No",
      createdAt: formatDateToYYYYMMDD(product.createdAt),
      updatedAt: formatDateToYYYYMMDD(product.updatedAt),
    }));
  };

  // === MEMO ===
  const filteredProducts = formatProducts(
    productsState.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminInput
          type="text"
          placeholder="Search for products"
          className="my-3 max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href={adminRoutes.productsCreate}
          className={cn(
            "ms-auto me-3",
            buttonVariants({ variant: "default", size: "default" }),
          )}
        >
          Add Product
        </Link>
        <div className="flex justify-end">
          {/* === COLUMN TOGGLER === */}
          <AdminDropdownMenu>
            <AdminDropdownMenuTrigger asChild>
              <AdminButton variant="outline">Columns</AdminButton>
            </AdminDropdownMenuTrigger>
            <AdminDropdownMenuContent>
              <AdminDropdownMenuLabel>Show/Hide Columns</AdminDropdownMenuLabel>
              {productColumns.map((column) => (
                <AdminDropdownMenuCheckboxItem
                  key={column.accessorKey}
                  checked={columnsVisible.has(column.accessorKey)}
                  onCheckedChange={(checked) =>
                    setColumnsVisible((prev) => {
                      const newSet = new Set(prev);
                      if (checked) {
                        newSet.add(column.accessorKey);
                      } else {
                        newSet.delete(column.accessorKey);
                      }
                      return newSet;
                    })
                  }
                >
                  {column.header}
                </AdminDropdownMenuCheckboxItem>
              ))}
            </AdminDropdownMenuContent>
          </AdminDropdownMenu>
        </div>
      </div>
      <AdminBaseTable
        data={filteredProducts}
        columns={[
          ...productColumns.filter((column) =>
            columnsVisible.has(column.accessorKey),
          ),
          {
            id: "actions",
            enableHiding: false,
            cell: (cell) => {
              const product = cell.row.original;

              return (
                <AdminDropdownMenu>
                  <AdminDropdownMenuTrigger asChild>
                    <AdminButton variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </AdminButton>
                  </AdminDropdownMenuTrigger>

                  <AdminDropdownMenuContent align="end">
                    <Link href={`${adminRoutes.products}/${product.id}/view`}>
                      <AdminDropdownMenuItem>View Details</AdminDropdownMenuItem>
                    </Link>
                    <Link href={`${adminRoutes.products}/${product.id}`}>
                      <AdminDropdownMenuItem>Edit</AdminDropdownMenuItem>
                    </Link>
                    <AdminDropdownMenuSeparator />

                    <AdminDropdownMenuItem
                      onSelect={async () => {
                        const result = await toggleProductFeatured(product.id);
                        if (result.success) {
                          setProductsState((prev) =>
                            prev.map((p) =>
                              p.id === product.id
                                ? { ...p, isFeatured: result.data.isFeatured }
                                : p,
                            ),
                          );
                          toast.success(
                            result.data.isFeatured
                              ? "Product added to New Arrivals"
                              : "Product removed from New Arrivals",
                          );
                        } else {
                          toast.error("Failed to update featured status");
                        }
                      }}
                    >
                      {product.isFeatured === "Yes"
                        ? "Remove from New Arrivals"
                        : "Add to New Arrivals"}
                    </AdminDropdownMenuItem>

                    <AdminDropdownMenuSeparator />

                    <AdminDropdownMenuItem
                      variant="destructive"
                      onSelect={() => {
                        setPendingDeleteId(product.id);
                      }}
                    >
                      <AdminTooltip>
                        <AdminTooltipTrigger asChild>
                          <span className="w-full flex items-center">
                            Delete
                          </span>
                        </AdminTooltipTrigger>
                      </AdminTooltip>
                    </AdminDropdownMenuItem>
                  </AdminDropdownMenuContent>
                </AdminDropdownMenu>
              );
            },
          },
        ]}
      />

      {/* === DELETE CONFIRMATION MODAL === */}
      <AdminAlertDialog
        open={!!pendingDeleteId}
        onOpenChange={() => setPendingDeleteId(null)}
      >
        <AdminAlertDialogContent>
          <AdminAlertDialogHeader>
            <AdminAlertDialogTitle>
              Are you sure you want to delete this product?
            </AdminAlertDialogTitle>
            <AdminAlertDialogDescription>
              This action cannot be undone.
            </AdminAlertDialogDescription>
          </AdminAlertDialogHeader>

          <AdminAlertDialogFooter>
            <AdminAlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AdminAlertDialogCancel>

            <AdminAlertDialogAction
              disabled={!!deletingId}
              onClick={() => {
                setDeletingId(pendingDeleteId);
                if (pendingDeleteId) {
                  deleteProduct(pendingDeleteId);
                }
              }}
            >
              {deletingId ? "Deleting..." : "Delete"}
            </AdminAlertDialogAction>
          </AdminAlertDialogFooter>
        </AdminAlertDialogContent>
      </AdminAlertDialog>
    </>
  );
}

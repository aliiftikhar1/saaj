"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { Category } from "@prisma/client";

import {
  AdminBaseTable,
  AdminButton,
  AdminDropdownMenu,
  AdminDropdownMenuTrigger,
  AdminDropdownMenuContent,
  AdminDropdownMenuItem,
  AdminDropdownMenuSeparator,
  AdminAlertDialog,
  AdminAlertDialogContent,
  AdminAlertDialogTitle,
  AdminAlertDialogDescription,
  AdminAlertDialogCancel,
  AdminAlertDialogAction,
  AdminAlertDialogHeader,
  AdminAlertDialogFooter,
  AdminInput,
} from "@/components/admin";
import { useRouter } from "next/navigation";
import { deleteCategoryById } from "@/lib/server/actions";
import { adminRoutes } from "@/lib";
import { categoryColumns } from "./columns";

export function AdminCategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [categoriesState, setCategoriesState] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteCategory = async (id: string) => {
    setDeletingId(id);
    const deleted = await deleteCategoryById(id);
    if (!deleted.success) {
      setDeletingId(null);
      toast.error("Failed to delete category.");
      return;
    }
    setPendingDeleteId(null);
    setDeletingId(null);
    setCategoriesState((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted successfully.");
  };

  const filteredCategories = categoriesState.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <AdminInput
        type="text"
        placeholder="Search categories"
        className="my-3 max-w-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AdminBaseTable
        data={filteredCategories}
        onRowClick={(row) => router.push(`${adminRoutes.categories}/${row.id}`)}
        columns={[
          ...categoryColumns,
          {
            id: "actions",
            enableHiding: false,
            cell: (cell) => {
              const category = cell.row.original;
              return (
                <div onClick={(e) => e.stopPropagation()}>
                  <AdminDropdownMenu>
                    <AdminDropdownMenuTrigger asChild>
                      <AdminButton variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </AdminButton>
                    </AdminDropdownMenuTrigger>
                    <AdminDropdownMenuContent align="end">
                      <Link href={`${adminRoutes.categories}/${category.id}`}>
                        <AdminDropdownMenuItem>Edit</AdminDropdownMenuItem>
                      </Link>
                      <AdminDropdownMenuSeparator />
                      <AdminDropdownMenuItem
                        variant="destructive"
                        onSelect={() => setPendingDeleteId(category.id)}
                      >
                        Delete
                      </AdminDropdownMenuItem>
                    </AdminDropdownMenuContent>
                  </AdminDropdownMenu>
                </div>
              );
            },
          },
        ]}
      />

      <AdminAlertDialog
        open={!!pendingDeleteId}
        onOpenChange={() => setPendingDeleteId(null)}
      >
        <AdminAlertDialogContent>
          <AdminAlertDialogHeader>
            <AdminAlertDialogTitle>
              Delete this category?
            </AdminAlertDialogTitle>
            <AdminAlertDialogDescription>
              Products in this category will become uncategorized. This action
              cannot be undone.
            </AdminAlertDialogDescription>
          </AdminAlertDialogHeader>
          <AdminAlertDialogFooter>
            <AdminAlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AdminAlertDialogCancel>
            <AdminAlertDialogAction
              disabled={!!deletingId}
              onClick={() => {
                if (pendingDeleteId) {
                  deleteCategory(pendingDeleteId);
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

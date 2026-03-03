"use client";

import { useState } from "react";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  AdminButton,
  AdminField,
  AdminFieldDescription,
  AdminFieldError,
  AdminFieldGroup,
  AdminFieldLabel,
  AdminFieldSet,
  AdminInput,
} from "@/components/admin";
import { AdminCategoryFormData, AdminCategoryFormSchema } from "./schema";
import {
  createCategory,
  deleteCategoryById,
  updateCategoryById,
} from "@/lib/server/actions";

type AdminCategoriesFormProps = {
  isEditMode?: boolean;
  categoryData?: Category;
};

export function AdminCategoriesForm(props: AdminCategoriesFormProps) {
  const { isEditMode = false, categoryData } = props;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActionLocked, setIsActionLocked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminCategoryFormData>({
    resolver: zodResolver(AdminCategoryFormSchema),
    defaultValues: {
      name: categoryData?.name ?? "",
      slug: categoryData?.slug ?? "",
      tagline: categoryData?.tagline ?? "",
      imageUrl: categoryData?.imageUrl ?? "",
    },
  });

  const onSubmit = async (data: AdminCategoryFormData) => {
    setIsActionLocked(true);
    const res = isEditMode
      ? await updateCategoryById(categoryData?.id || "", data)
      : await createCategory(data);

    if (!res.success) {
      setIsActionLocked(false);
      toast.error(
        isEditMode ? "Error updating category" : "Error creating category",
      );
      return;
    }
    toast.success(
      isEditMode
        ? "Category updated successfully!"
        : "Category created successfully!",
    );
    router.back();
  };

  const onDelete = async () => {
    if (!categoryData?.id) return;
    setIsDeleting(true);
    setIsActionLocked(true);
    const res = await deleteCategoryById(categoryData?.id);
    if (!res.success) {
      setIsDeleting(false);
      setIsActionLocked(false);
      toast.error("Error deleting category");
      return;
    }
    toast.success("Category deleted successfully!");
    router.back();
  };

  const isBusy = isActionLocked || isDeleting;

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
        <AdminFieldGroup>
          <AdminFieldSet>
            <AdminFieldDescription>
              {isEditMode
                ? "Edit the category details below."
                : "Create a new product category."}
            </AdminFieldDescription>
            <AdminFieldGroup>
              <AdminField>
                <AdminFieldLabel htmlFor="name">Name</AdminFieldLabel>
                <AdminInput
                  id="name"
                  {...register("name")}
                  placeholder="e.g. Dresses"
                />
                <AdminFieldError errors={[errors.name]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="slug">Slug</AdminFieldLabel>
                <AdminInput
                  id="slug"
                  {...register("slug")}
                  placeholder="e.g. dresses"
                />
                <AdminFieldError errors={[errors.slug]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="tagline">
                  Tagline (optional)
                </AdminFieldLabel>
                <AdminInput
                  id="tagline"
                  {...register("tagline")}
                  placeholder="e.g. Timeless elegance in every silhouette."
                />
                <AdminFieldError errors={[errors.tagline]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="imageUrl">
                  Image URL (optional)
                </AdminFieldLabel>
                <AdminInput
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="/assets/category-dresses.jpg"
                />
                <AdminFieldError errors={[errors.imageUrl]} />
              </AdminField>
            </AdminFieldGroup>
            <div className="flex flex-col gap-3">
              <AdminButton className="flex-1" type="submit" disabled={isBusy}>
                {isActionLocked && !isDeleting
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Category"}
              </AdminButton>
              {isEditMode && (
                <AdminButton
                  type="button"
                  onClick={onDelete}
                  disabled={isBusy}
                  variant="outline"
                  className="flex-1"
                >
                  {isDeleting ? "Deleting..." : "Delete Category"}
                </AdminButton>
              )}
            </div>
          </AdminFieldSet>
        </AdminFieldGroup>
      </form>
    </div>
  );
}

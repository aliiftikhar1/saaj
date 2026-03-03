"use client";

import { useRef, useState } from "react";
import type { Collection } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

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
import {
  AdminCollectionsFormData,
  AdminCollectionsFormSchema,
  AdminFormEditCollectionData,
} from "./schema";
import {
  createCollection,
  deleteCollectionById,
  updateCollectionById,
} from "@/lib/server/actions";
import { usePreviewUrl } from "@/hooks";

type AdminCollectionsFormProps = {
  isEditMode?: boolean;
  collectionData?: Collection;
};

export function AdminCollectionsForm(props: AdminCollectionsFormProps) {
  const { isEditMode = false, collectionData } = props;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActionLocked, setIsActionLocked] = useState(false);

  const preview = usePreviewUrl(file);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminCollectionsFormData>({
    resolver: zodResolver(AdminCollectionsFormSchema(isEditMode)),
    defaultValues: {
      name: collectionData?.name ?? "",
      tagline: collectionData?.tagline ?? "",
      slug: collectionData?.slug ?? "",
      sortOrder: collectionData?.sortOrder ?? 0,
    },
  });

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }
    const compressedFile = await imageCompression(selectedFile, {
      maxSizeMB: 0.25,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });
    if (compressedFile.size > 1 * 1024 * 1024) {
      toast.error("Error compressing image. Please choose a smaller file.");
      clearFileInput();
      return;
    }
    if (!["image/jpeg", "image/png"].includes(compressedFile.type)) {
      toast.error("Only JPEG and PNG formats are accepted");
      clearFileInput();
      return;
    }
    setValue("image", compressedFile, { shouldValidate: true });
    setFile(compressedFile);
  };

  const onAddSubmit = async (data: AdminCollectionsFormData) => {
    if (!data.image) {
      toast.error("Image is required");
      return;
    }
    setIsActionLocked(true);
    const payload = { ...data, image: data.image };
    const addRes = await createCollection(payload);
    if (!addRes.success) {
      setIsActionLocked(false);
      toast.error("Error creating collection");
      return;
    }
    toast.success("Collection created successfully!");
    router.back();
  };

  const onEditSubmit = async (data: AdminFormEditCollectionData) => {
    setIsActionLocked(true);
    const editRes = await updateCollectionById(
      collectionData?.id || "",
      data,
    );
    if (!editRes.success) {
      setIsActionLocked(false);
      toast.error("Error updating collection");
      return;
    }
    toast.success("Collection updated successfully!");
    router.back();
  };

  const onDelete = async () => {
    if (!collectionData?.id) return;
    setIsDeleting(true);
    setIsActionLocked(true);
    const res = await deleteCollectionById(collectionData?.id);
    if (!res.success) {
      setIsDeleting(false);
      setIsActionLocked(false);
      toast.error("Error deleting collection");
      return;
    }
    toast.success("Collection deleted successfully!");
    router.back();
  };

  const isBusy = isActionLocked || isDeleting;

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={
          isEditMode
            ? handleSubmit(onEditSubmit)
            : handleSubmit(onAddSubmit)
        }
        className="pt-3"
      >
        <AdminFieldGroup>
          <AdminFieldSet>
            <AdminFieldDescription>
              {isEditMode
                ? "Edit the collection details below."
                : "Fill in details for the new collection below."}
            </AdminFieldDescription>
            <AdminFieldGroup>
              <AdminField>
                <AdminFieldLabel htmlFor="name">Name</AdminFieldLabel>
                <AdminInput id="name" {...register("name")} />
                <AdminFieldError errors={[errors.name]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="tagline">Tagline</AdminFieldLabel>
                <AdminInput id="tagline" {...register("tagline")} />
                <AdminFieldError errors={[errors.tagline]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="slug">Slug</AdminFieldLabel>
                <AdminInput id="slug" {...register("slug")} />
                <AdminFieldError errors={[errors.slug]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="sortOrder">
                  Sort Order
                </AdminFieldLabel>
                <AdminInput
                  id="sortOrder"
                  type="number"
                  {...register("sortOrder", { valueAsNumber: true })}
                />
                <AdminFieldError errors={[errors.sortOrder]} />
              </AdminField>
              <AdminField>
                <AdminFieldLabel htmlFor="image">
                  Collection Image
                </AdminFieldLabel>
                <AdminInput
                  id="image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <AdminFieldError errors={[errors.image]} />
                {(preview || collectionData?.imageUrl) && (
                  <div className="relative w-60! h-40 mt-2">
                    <Image
                      src={preview || collectionData?.imageUrl || ""}
                      alt="Preview"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 240px"
                      className="rounded object-cover"
                    />
                  </div>
                )}
              </AdminField>
            </AdminFieldGroup>
            <div className="flex flex-col gap-3">
              <AdminButton className="flex-1" type="submit" disabled={isBusy}>
                {isActionLocked && !isDeleting
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Collection"}
              </AdminButton>
              {isEditMode && (
                <AdminButton
                  type="button"
                  onClick={onDelete}
                  disabled={isBusy}
                  variant="outline"
                  className="flex-1"
                >
                  {isDeleting ? "Deleting..." : "Delete Collection"}
                </AdminButton>
              )}
            </div>
          </AdminFieldSet>
        </AdminFieldGroup>
      </form>
    </div>
  );
}

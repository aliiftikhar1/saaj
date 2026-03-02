import { AdminHeading, AdminProductsForm } from "@/components/admin";
import type { Metadata } from "next";
import { getProductById } from "@/lib/server/queries";

type AdminProductPageProps = { params: { id: string } };

export async function generateMetadata(
  props: AdminProductPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getProductById(id);

  if (!product.success || !product.data) {
    return {
      title: "Edit Product",
    };
  }

  return {
    title: `Edit ${product.data.name}`,
  };
}

export default async function Page({ params }: AdminProductPageProps) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const product = await getProductById(id);

  if (!product.success || !product.data) {
    return <p>Product not found.</p>;
  }

  // === PREPARE DATA ===
  const productData = {
    ...product.data,
    price: Number(product.data.price),
  };

  return (
    <div>
      <AdminHeading heading="Edit Product" />
      <AdminProductsForm isEditMode={true} productData={productData} />
    </div>
  );
}

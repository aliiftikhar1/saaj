import { AdminHeading, AdminProductView } from "@/components/admin";
import type { Metadata } from "next";
import { getAdminProductById } from "@/lib/server/queries";

type AdminProductViewPageProps = { params: { id: string } };

export async function generateMetadata(
  props: AdminProductViewPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getAdminProductById(id);

  if (!product.success || !product.data) {
    return { title: "Product" };
  }

  return { title: product.data.name };
}

export default async function Page({ params }: AdminProductViewPageProps) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product.success || !product.data) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AdminHeading heading="Product Details" />
      <AdminProductView product={product.data} />
    </div>
  );
}

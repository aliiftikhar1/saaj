import { getCollectionById } from "@/lib/server/queries";
import type { Metadata } from "next";
import { AdminCollectionsForm, AdminHeading } from "@/components/admin";

type AdminCollectionPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata(
  props: AdminCollectionPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const data = await getCollectionById(id);
  if (!data.success || !data.data) {
    return { title: "Edit Collection" };
  }
  return { title: `Edit ${data.data.name}` };
}

export default async function Page({ params }: AdminCollectionPageProps) {
  const { id } = await params;
  const data = await getCollectionById(id);
  if (!data.success || !data.data) {
    return <p>Collection not found.</p>;
  }
  return (
    <section>
      <AdminHeading heading="Edit Collection" />
      <AdminCollectionsForm isEditMode={true} collectionData={data.data} />
    </section>
  );
}

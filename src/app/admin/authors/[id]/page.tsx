import { getAuthorById } from "@/lib/server/queries";
import type { Metadata } from "next";
import { AdminAuthorsForm, AdminHeading } from "@/components/admin";

type AdminAuthorPageProps = { params: { id: string } };

export async function generateMetadata(
  props: AdminAuthorPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const authorData = await getAuthorById(id);

  if (!authorData.success || !authorData.data) {
    return {
      title: "Edit Author",
    };
  }

  return {
    title: `Edit ${authorData.data.name}`,
  };
}

export default async function Page({ params }: AdminAuthorPageProps) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const authorData = await getAuthorById(id);

  if (!authorData.success || !authorData.data) {
    return <p>Author not found.</p>;
  }

  return (
    <section>
      <AdminHeading heading="Edit Author" />
      <AdminAuthorsForm isEditMode={true} authorData={authorData.data} />
    </section>
  );
}

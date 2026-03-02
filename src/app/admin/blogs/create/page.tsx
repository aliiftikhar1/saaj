import { AdminBlogsForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";
import { getAuthors } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Add Blog",
};

export default async function Page() {
  // === QUERIES ===
  const authors = await getAuthors();
  const authorList = authors.success ? authors.data : [];

  return (
    <div>
      <AdminHeading heading="Add Blog" />
      <AdminBlogsForm authorList={authorList} />
    </div>
  );
}

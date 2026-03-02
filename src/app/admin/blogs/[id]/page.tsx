import { AdminBlogsForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";
import { getAuthors, getBlogById } from "@/lib/server/queries";

type AdminBlogPageProps = { params: { id: string } };

export async function generateMetadata(
  props: AdminBlogPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const blog = await getBlogById(id);

  if (!blog.success || !blog.data) {
    return {
      title: "Edit Blog",
    };
  }

  return {
    title: `Edit ${blog.data.title}`,
  };
}

export default async function Page({ params }: AdminBlogPageProps) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const blogs = await getBlogById(id);
  const authors = await getAuthors();
  const authorList = authors.success ? authors.data : [];

  if (!blogs.success || !blogs.data) {
    return <p>Blog not found.</p>;
  }

  return (
    <div>
      <AdminHeading heading="Edit Blog" />
      <AdminBlogsForm
        isEditMode={true}
        blogData={blogs.data}
        authorList={authorList}
      />
    </div>
  );
}

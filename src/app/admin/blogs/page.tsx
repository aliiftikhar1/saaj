import { AdminHeading, AdminBlogsTable } from "@/components/admin";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Blogs",
};

export default async function Page() {
  // === QUERIES ===
  const blogs = await getBlogs();

  if (!blogs.success) {
    return <div>Error loading blogs: {blogs.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Blogs" />

      <AdminBlogsTable authors={blogs.data} />
    </div>
  );
}

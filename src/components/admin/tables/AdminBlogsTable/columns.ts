export const blogColumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "author.name", header: "Author" },
  { accessorKey: "publishedAt", header: "Published At" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
];

export const defaultVisibleBlogColumnIds = new Set([
  "title",
  "category",
  "author.name",
  "createdAt",
  "updatedAt",
]);

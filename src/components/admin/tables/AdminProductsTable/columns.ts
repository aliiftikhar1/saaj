export const productColumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "categoryName", header: "Category" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "totalSold", header: "Total Sold" },
  { accessorKey: "isActive", header: "Active" },
  { accessorKey: "isFeatured", header: "Featured" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
];

export const defaultVisibleProductColumnIds = new Set([
  "name",
  "categoryName",
  "price",
  "totalSold",
  "isActive",
  "isFeatured",
  "createdAt",
]);

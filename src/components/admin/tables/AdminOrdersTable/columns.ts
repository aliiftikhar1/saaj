export const orderColumns = [
  { accessorKey: "orderNumber", header: "Order #" },
  { accessorKey: "deliveryEmail", header: "Email" },
  { accessorKey: "delieveryName", header: "Name" },
  { accessorKey: "itemsCount", header: "Items" },
  { accessorKey: "totalPrice", header: "Total" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "paymentStatus", header: "Payment" },
  { accessorKey: "paymentMethod", header: "Payment Method" },
  { accessorKey: "createdAt", header: "Date" },
  { accessorKey: "updatedAt", header: "Updated" },
];

export const defaultVisibleOrderColumnIds = new Set([
  "orderNumber",
  "deliveryEmail",
  "itemsCount",
  "totalPrice",
  "status",
  "createdAt",
]);

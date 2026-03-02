"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import {
  AdminBaseTable,
  AdminButton,
  AdminDropdownMenu,
  AdminDropdownMenuTrigger,
  AdminDropdownMenuContent,
  AdminDropdownMenuItem,
  AdminDropdownMenuLabel,
  AdminDropdownMenuCheckboxItem,
  AdminInput,
} from "@/components/admin";
import { adminRoutes, formatDateToYYYYMMDD } from "@/lib";
import { orderColumns, defaultVisibleOrderColumnIds } from "./columns";
import { OrderWithCart } from "@/types/client";

type AdminOrdersTableProps = {
  orders: OrderWithCart[];
};

export function AdminOrdersTable(props: AdminOrdersTableProps) {
  // === PROPS ===
  const { orders } = props;

  // === STATE ===
  const [searchTerm, setSearchTerm] = useState("");
  const [columnsVisible, setColumnsVisible] = useState<Set<string>>(
    defaultVisibleOrderColumnIds,
  );

  // === FUNCTIONS ===
  const formatOrders = (orders: OrderWithCart[]) => {
    return orders.map((order) => {
      const itemsCount = order.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      return {
        ...order,
        itemsCount,
        totalPrice: `$${order.totalPrice.toFixed(2)}`,
        createdAt: formatDateToYYYYMMDD(order.createdAt) ?? "",
        updatedAt: formatDateToYYYYMMDD(order.updatedAt) ?? "",
      };
    });
  };

  // === MEMO ===
  const filteredOrders = formatOrders(
    orders.filter(
      (order) =>
        order.deliveryEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toString().includes(searchTerm),
    ),
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminInput
          type="text"
          placeholder="Search by email or order number"
          className="my-3 max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-end">
          {/* === COLUMN TOGGLER === */}
          <AdminDropdownMenu>
            <AdminDropdownMenuTrigger asChild>
              <AdminButton variant="outline">Columns</AdminButton>
            </AdminDropdownMenuTrigger>
            <AdminDropdownMenuContent>
              <AdminDropdownMenuLabel>Show/Hide Columns</AdminDropdownMenuLabel>
              {orderColumns.map((column) => (
                <AdminDropdownMenuCheckboxItem
                  key={column.accessorKey}
                  checked={columnsVisible.has(column.accessorKey)}
                  onCheckedChange={(checked) =>
                    setColumnsVisible((prev) => {
                      const newSet = new Set(prev);
                      if (checked) {
                        newSet.add(column.accessorKey);
                      } else {
                        newSet.delete(column.accessorKey);
                      }
                      return newSet;
                    })
                  }
                >
                  {column.header}
                </AdminDropdownMenuCheckboxItem>
              ))}
            </AdminDropdownMenuContent>
          </AdminDropdownMenu>
        </div>
      </div>
      <AdminBaseTable
        data={filteredOrders}
        columns={[
          ...orderColumns.filter((column) =>
            columnsVisible.has(column.accessorKey),
          ),
          {
            id: "actions",
            enableHiding: false,
            cell: (cell) => {
              const order = cell.row.original;

              return (
                <AdminDropdownMenu>
                  <AdminDropdownMenuTrigger asChild>
                    <AdminButton variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </AdminButton>
                  </AdminDropdownMenuTrigger>

                  <AdminDropdownMenuContent
                    className="cursor-pointer"
                    align="end"
                  >
                    <Link href={`${adminRoutes.orders}/${order.id}`}>
                      <AdminDropdownMenuItem>
                        View Details
                      </AdminDropdownMenuItem>
                    </Link>
                  </AdminDropdownMenuContent>
                </AdminDropdownMenu>
              );
            },
          },
        ]}
      />
    </>
  );
}

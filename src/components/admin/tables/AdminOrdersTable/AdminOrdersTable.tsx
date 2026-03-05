"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

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
  AdminSelect,
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
  AdminSelectValue,
} from "@/components/admin";
import { useRouter } from "next/navigation";
import { adminRoutes, formatDateToYYYYMMDD } from "@/lib";
import { orderColumns, defaultVisibleOrderColumnIds } from "./columns";
import { OrderWithCart } from "@/types/client";
import { updateOrderStatus } from "@/lib/server/actions/order-actions";

const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

type AdminOrdersTableProps = {
  orders: OrderWithCart[];
};

export function AdminOrdersTable(props: AdminOrdersTableProps) {
  // === PROPS ===
  const { orders } = props;

  // === HOOKS ===
  const router = useRouter();

  // === STATE ===
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersState, setOrdersState] = useState(orders);
  const [columnsVisible, setColumnsVisible] = useState<Set<string>>(
    defaultVisibleOrderColumnIds,
  );

  // === FUNCTIONS ===
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrdersState((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: result.data.status as OrderWithCart["status"] } : o,
        ),
      );
      toast.success(`Order status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update order status");
    }
  };

  const formatOrders = (orders: OrderWithCart[]) => {
    return orders.map((order) => {
      const itemsCount = order.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      return {
        ...order,
        itemsCount,
        totalPrice: `Rs.${order.totalPrice.toFixed(2)}`,
        createdAt: formatDateToYYYYMMDD(order.createdAt) ?? "",
        updatedAt: formatDateToYYYYMMDD(order.updatedAt) ?? "",
      };
    });
  };

  // === MEMO ===
  const filteredOrders = formatOrders(
    ordersState.filter(
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
        onRowClick={(row) => router.push(`${adminRoutes.orders}/${row.id}`)}
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
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {/* Order Status Dropdown */}
                  <AdminSelect
                    value={order.status}
                    onValueChange={(val) => handleStatusChange(order.id, val)}
                  >
                    <AdminSelectTrigger className="w-[130px] h-8 text-xs">
                      <AdminSelectValue />
                    </AdminSelectTrigger>
                    <AdminSelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <AdminSelectItem key={s} value={s}>
                          {s}
                        </AdminSelectItem>
                      ))}
                    </AdminSelectContent>
                  </AdminSelect>

                  {/* Actions Menu */}
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
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
}

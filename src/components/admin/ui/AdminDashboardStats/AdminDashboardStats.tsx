import Link from "next/link";
import { OrderDashboardStats, ProductDashboardStats } from "@/types/client";
import { adminRoutes } from "@/lib";

type AdminDashboardStatsProps = {
  orderStats: OrderDashboardStats;
  productStats: ProductDashboardStats;
};

const cardClasses =
  "bg-white rounded-lg border border-neutral-04 p-6 hover:border-neutral-06 hover:shadow-sm transition-all";

export function AdminDashboardStats(props: AdminDashboardStatsProps) {
  // === PROPS ===
  const { orderStats, productStats } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Revenue */}
      <Link href={adminRoutes.orders} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-neutral-11">
            ${orderStats.totalRevenue.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Total Orders */}
      <Link href={adminRoutes.orders} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Total Orders</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {orderStats.totalOrders}
          </p>
        </div>
      </Link>

      {/* Pending Orders */}
      <Link href={adminRoutes.orders} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Pending Orders</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {orderStats.pendingOrders}
          </p>
          {orderStats.pendingOrders > 0 && (
            <p className="text-xs text-orange-600 mt-1">Requires attention</p>
          )}
        </div>
      </Link>

      {/* Average Order Value */}
      <Link href={adminRoutes.orders} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Average Order Value</p>
          <p className="text-2xl font-semibold text-neutral-11">
            ${orderStats.averageOrderValue.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Total Products */}
      <Link href={adminRoutes.products} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Total Products</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {productStats.totalProducts}
          </p>
        </div>
      </Link>

      {/* Active Products */}
      <Link href={adminRoutes.products} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Active Products</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {productStats.activeProducts}
          </p>
        </div>
      </Link>

      {/* Low Stock Products */}
      <Link href={adminRoutes.products} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Low Stock Items</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {productStats.lowStockProducts}
          </p>
          {productStats.lowStockProducts > 0 && (
            <p className="text-xs text-orange-600 mt-1">
              {productStats.lowStockProducts} items below 5 units
            </p>
          )}
        </div>
      </Link>

      {/* Inactive Products */}
      <Link href={adminRoutes.products} className={cardClasses}>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-09 mb-1">Inactive Products</p>
          <p className="text-2xl font-semibold text-neutral-11">
            {productStats.totalProducts - productStats.activeProducts}
          </p>
        </div>
      </Link>
    </div>
  );
}

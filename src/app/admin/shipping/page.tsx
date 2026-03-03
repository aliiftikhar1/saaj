import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminShippingForm } from "@/components/admin/forms/AdminShippingForm";
import {
  getGlobalShippingRate,
  getAllProductsForShipping,
} from "@/lib/server/actions/shipping-actions";

export const metadata: Metadata = { title: "Shipping" };

export default async function AdminShippingPage() {
  const [rateRes, productsRes] = await Promise.all([
    getGlobalShippingRate(),
    getAllProductsForShipping(),
  ]);

  const globalRate = rateRes.success ? rateRes.data : 0;
  const products = productsRes.success ? productsRes.data : [];

  return (
    <div>
      <AdminHeading heading="Shipping" />
      <p className="text-neutral-10 text-sm mb-6">
        Configure shipping charges. Set a global default and optionally
        override individual products. At checkout the highest applicable
        rate in the cart will be charged.
      </p>
      <AdminShippingForm globalRate={globalRate} products={products} />
    </div>
  );
}

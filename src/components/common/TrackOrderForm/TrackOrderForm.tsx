"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routing/routes";

// ─── STATUS CONFIG ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; step: number }
> = {
  PENDING:    { label: "Order Placed",       step: 1 },
  PAID:       { label: "Payment Confirmed",  step: 2 },
  PROCESSING: { label: "Processing",         step: 2 },
  SHIPPED:    { label: "Shipped",            step: 3 },
  DELIVERED:  { label: "Delivered",          step: 4 },
  CANCELLED:  { label: "Cancelled",          step: 0 },
  REFUNDED:   { label: "Refunded",           step: 0 },
};

const ESTIMATED_DELIVERY: Record<string, string> = {
  PENDING:     "7–10 business days",
  PAID:        "5–7 business days",
  PROCESSING:  "5–7 business days",
  SHIPPED:     "2–4 business days",
  DELIVERED:   "Delivered",
  CANCELLED:   "—",
  REFUNDED:    "—",
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

type OrderItem = {
  title: string;
  quantity: number;
  unitPrice: number;
  image: string;
  size: string;
};

type OrderData = {
  orderNumber: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  customerName: string | null;
  deliveryCity: string | null;
  deliveryState: string | null;
  deliveryCountry: string | null;
  shippingAmount: number;
  discountAmount: number;
  couponCode: string | null;
  totalPrice: number;
  estimatedDelivery?: string;
  items: OrderItem[];
};

// ─── COMPONENT ────────────────────────────────────────────────────────────

export function TrackOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [trackingId, setTrackingId] = useState(searchParams.get("id") ?? "");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = trackingId.trim();
      if (!trimmed) return;

      setLoading(true);
      setError("");
      setOrder(null);
      setSearched(true);

      try {
        const res = await fetch(`/api/track?token=${encodeURIComponent(trimmed)}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Unable to find your order.");
        } else {
          setOrder(data);
          // Update URL without full navigation
          const url = new URL(window.location.href);
          url.searchParams.set("id", trimmed);
          router.replace(url.pathname + url.search, { scroll: false });
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [trackingId, router],
  );

  const statusCfg = order ? (STATUS_CONFIG[order.status] ?? STATUS_CONFIG["PENDING"]) : null;
  const estimatedDelivery = order
    ? (order.estimatedDelivery || ESTIMATED_DELIVERY[order.status] || "—")
    : "";
  const isCancelled = order?.status === "CANCELLED" || order?.status === "REFUNDED";

  const subtotal = order
    ? order.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
    : 0;

  return (
    <main className="min-h-[80vh] bg-neutral-01 py-10 md:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[11px] uppercase tracking-[3px] text-neutral-08 mb-2">
            Saaj Tradition
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-12 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-neutral-09 text-sm mt-2 max-w-md mx-auto">
            Enter the tracking ID from your confirmation email to see your order status.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your tracking ID"
              className="flex-1 h-12 px-4 rounded-xl border border-neutral-04 bg-white text-neutral-12 text-sm placeholder:text-neutral-07 focus:outline-none focus:ring-2 focus:ring-neutral-12/10 focus:border-neutral-06 transition-all"
              required
              minLength={10}
              maxLength={64}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !trackingId.trim()}
              className="h-12 px-6 rounded-xl bg-neutral-12 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching
                </span>
              ) : (
                "Track"
              )}
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-center mb-8">
            <p className="text-red-700 text-sm font-medium">{error}</p>
            <p className="text-red-500 text-xs mt-1">
              Double-check your tracking ID or contact support if the issue persists.
            </p>
          </div>
        )}

        {/* Empty State (before search) */}
        {!searched && !order && (
          <div className="text-center py-12 text-neutral-08">
            <svg className="mx-auto mb-4 w-12 h-12 text-neutral-05" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">Your tracking ID was included in your order confirmation email.</p>
          </div>
        )}

        {/* Order Results */}
        {order && statusCfg && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] text-center">
              <p className="text-[10px] uppercase tracking-[2px] text-neutral-08 mb-1">
                Order #{order.orderNumber} · {new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <div className="mt-4 mb-3">
                <span className={`inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide ${
                  isCancelled
                    ? "bg-red-50 text-red-700"
                    : order.status === "DELIVERED"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}>
                  {statusCfg.label}
                </span>
              </div>

              {!isCancelled && (
                <p className="text-neutral-09 text-xs">
                  Estimated delivery: <span className="font-medium text-neutral-11">{estimatedDelivery}</span>
                </p>
              )}

              <p className="text-neutral-06 text-[10px] mt-2">
                Last updated: {new Date(order.updatedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })} at {new Date(order.updatedAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Progress Steps */}
            {!isCancelled && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-start relative">
                  {/* Connector line */}
                  <div className="absolute top-3.5 left-[12%] right-[12%] h-0.5 bg-neutral-03" />
                  <div
                    className="absolute top-3.5 left-[12%] h-0.5 bg-neutral-12 transition-all duration-500"
                    style={{ width: `${Math.max(0, (statusCfg.step - 1) / 3 * 76)}%` }}
                  />

                  {STEPS.map((label, idx) => {
                    const stepNum = idx + 1;
                    const done = stepNum < statusCfg.step;
                    const active = stepNum === statusCfg.step;
                    return (
                      <div key={label} className="flex flex-col items-center flex-1 relative z-10">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                          done
                            ? "bg-neutral-12 text-white"
                            : active
                            ? "bg-neutral-12 text-white ring-4 ring-neutral-12/10"
                            : "bg-neutral-03 text-neutral-07"
                        }`}>
                          {done ? "✓" : stepNum}
                        </div>
                        <p className={`text-[10px] mt-1.5 text-center leading-tight ${
                          done || active ? "font-semibold text-neutral-12" : "text-neutral-07"
                        }`}>
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Items */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-12 mb-4">
                Items Ordered
              </h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className={`flex gap-3 items-center pb-3 ${i < order.items.length - 1 ? "border-b border-neutral-03" : ""}`}>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={52}
                        height={52}
                        className="w-13 h-13 object-cover rounded-lg shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-12 truncate">{item.title}</p>
                      <p className="text-xs text-neutral-08">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-12 shrink-0">
                      Rs. {(item.unitPrice * item.quantity).toLocaleString("en-PK")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-3 border-t border-neutral-03 space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-08">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString("en-PK")}</span>
                </div>
                {order.shippingAmount > 0 && (
                  <div className="flex justify-between text-xs text-neutral-08">
                    <span>Shipping</span>
                    <span>Rs. {order.shippingAmount.toLocaleString("en-PK")}</span>
                  </div>
                )}
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-green-600">
                    <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
                    <span>−Rs. {order.discountAmount.toLocaleString("en-PK")}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-neutral-12 pt-2 border-t border-neutral-03">
                  <span>Total</span>
                  <span>Rs. {order.totalPrice.toLocaleString("en-PK")}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            {order.customerName && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-12 mb-3">
                  Delivery Information
                </h2>
                <p className="text-sm font-medium text-neutral-12">{order.customerName}</p>
                <p className="text-xs text-neutral-08 mt-1">
                  {[order.deliveryCity, order.deliveryState, order.deliveryCountry].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            {/* Footer note */}
            <div className="text-center pt-2">
              <p className="text-xs text-neutral-07 mb-3">
                This page shows the latest status. Check back for updates.
              </p>
              <Link href={routes.shop} className="text-xs font-medium text-neutral-12 hover:opacity-70 transition-opacity">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Searched but no result and no error */}
        {searched && !order && !error && !loading && (
          <div className="text-center py-12 text-neutral-08">
            <p className="text-sm">No order found. Please check your tracking ID.</p>
          </div>
        )}
      </div>
    </main>
  );
}

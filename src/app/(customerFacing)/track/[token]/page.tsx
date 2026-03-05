import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const order = await getOrderByToken(token);
  if (!order) return { title: "Order Not Found" };
  return { title: `Order #${order.orderNumber} — Saaj Tradition` };
}

// ─── DATA FETCH ──────────────────────────────────────────────────────────────

async function getOrderByToken(token: string) {
  return prisma.order.findUnique({
    where: { trackingToken: token },
    select: {
      orderNumber: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      delieveryName: true,
      deliveryEmail: true,
      // No deliveryPhone — excluded intentionally
      deliveryStreetAddress: true,
      deliveryCity: true,
      deliveryState: true,
      deliveryPostcode: true,
      deliveryCountry: true,
      shippingAmount: true,
      discountAmount: true,
      couponCode: true,
      totalPrice: true,
      cart: {
        select: {
          items: {
            select: {
              title: true,
              quantity: true,
              unitPrice: true,
              image: true,
              size: { select: { label: true } },
            },
          },
        },
      },
    },
  });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; color: string; step: number }
> = {
  PENDING:    { label: "Order Placed",   bg: "#fef3c7", color: "#92400e", step: 1 },
  PAID:       { label: "Payment Confirmed", bg: "#d1fae5", color: "#065f46", step: 2 },
  PROCESSING: { label: "Processing",     bg: "#dbeafe", color: "#1e40af", step: 2 },
  SHIPPED:    { label: "Shipped",        bg: "#ede9fe", color: "#5b21b6", step: 3 },
  DELIVERED:  { label: "Delivered",      bg: "#d1fae5", color: "#065f46", step: 4 },
  CANCELLED:  { label: "Cancelled",      bg: "#fee2e2", color: "#991b1b", step: 0 },
  REFUNDED:   { label: "Refunded",       bg: "#f3f4f6", color: "#374151", step: 0 },
};

const ESTIMATED_DELIVERY: Record<string, string> = {
  PENDING:    "7–10 business days",
  PAID:       "5–7 business days",
  PROCESSING: "5–7 business days",
  SHIPPED:    "2–4 business days",
  DELIVERED:  "Delivered",
  CANCELLED:  "—",
  REFUNDED:   "—",
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function OrderTrackingPage({ params }: Props) {
  const { token } = await params;
  const order = await getOrderByToken(token);

  if (!order) {
    notFound();
  }

  const statusCfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG["PENDING"];
  const estimatedDelivery = ESTIMATED_DELIVERY[order.status] ?? "—";
  const isCancelled = order.status === "CANCELLED" || order.status === "REFUNDED";

  const total = Number(order.totalPrice);
  const discount = order.discountAmount ? Number(order.discountAmount) : 0;
  const shipping = order.shippingAmount ? Number(order.shippingAmount) : 0;
  const subtotal = order.cart.items.reduce(
    (s, i) => s + Number(i.unitPrice) * i.quantity,
    0,
  );

  const hasAddress = order.delieveryName || order.deliveryStreetAddress;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f5f0", fontFamily: "Arial, sans-serif" }}>
      {/* ── Header ── */}
      <div style={{ background: "#1a1a2e", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#8888aa", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 6px" }}>
          Saaj Tradition
        </p>
        <h1 style={{ color: "#c9a84c", fontSize: "20px", margin: 0, fontWeight: 700 }}>
          Order Tracker
        </h1>
        <p style={{ color: "#8888aa", fontSize: "12px", margin: "6px 0 0" }}>
          Order #{order.orderNumber} · {new Date(order.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px 16px" }}>

        {/* ── Current Status Badge ── */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "16px", boxShadow: "0 1px 8px rgba(0,0,0,.06)", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>
            Current Status
          </p>
          <span style={{
            display: "inline-block",
            padding: "10px 28px",
            borderRadius: "24px",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            background: statusCfg.bg,
            color: statusCfg.color,
          }}>
            {statusCfg.label}
          </span>

          {!isCancelled && (
            <p style={{ color: "#888", fontSize: "13px", marginTop: "14px" }}>
              🚚 Estimated delivery: <strong>{estimatedDelivery}</strong>
            </p>
          )}

          <p style={{ color: "#bbb", fontSize: "11px", marginTop: "8px" }}>
            Last updated: {new Date(order.updatedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })} at {new Date(order.updatedAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        {/* ── Progress Steps ── */}
        {!isCancelled && (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
              {/* connector line */}
              <div style={{ position: "absolute", top: "14px", left: "12%", right: "12%", height: "2px", background: "#f0ece8", zIndex: 0 }} />
              <div style={{ position: "absolute", top: "14px", left: "12%", width: `${Math.max(0, (statusCfg.step - 1) / 3 * 76)}%`, height: "2px", background: "#c9a84c", zIndex: 1, transition: "width 0.5s" }} />

              {STEPS.map((label, idx) => {
                const stepNum = idx + 1;
                const done = stepNum < statusCfg.step;
                const active = stepNum === statusCfg.step;
                return (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: done ? "#c9a84c" : active ? "#e94560" : "#e5e7eb",
                      color: (done || active) ? "#fff" : "#9ca3af",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700,
                      boxShadow: active ? "0 0 0 4px rgba(233,69,96,.15)" : "none",
                    }}>
                      {done ? "✓" : stepNum}
                    </div>
                    <p style={{ fontSize: "10px", color: active ? "#e94560" : done ? "#c9a84c" : "#9ca3af", marginTop: "6px", textAlign: "center", fontWeight: (done || active) ? 700 : 400, lineHeight: 1.3 }}>
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Items ── */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 16px" }}>
            Items Ordered
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {order.cart.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", paddingBottom: "12px", borderBottom: i < order.cart.items.length - 1 ? "1px solid #f0ece8" : "none" }}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={56}
                    height={56}
                    style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e", margin: "0 0 4px" }}>{item.title}</p>
                  <p style={{ fontSize: "12px", color: "#888", margin: "0 0 2px" }}>Size: {item.size.label} · Qty: {item.quantity}</p>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: 0, flexShrink: 0 }}>
                  Rs. {(Number(item.unitPrice) * item.quantity).toLocaleString("en-PK")}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ marginTop: "16px", borderTop: "2px solid #f0ece8", paddingTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginBottom: "6px" }}>
              <span>Subtotal</span><span>Rs. {subtotal.toLocaleString("en-PK")}</span>
            </div>
            {shipping > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginBottom: "6px" }}>
                <span>Shipping</span><span>Rs. {shipping.toLocaleString("en-PK")}</span>
              </div>
            )}
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#16a34a", marginBottom: "6px" }}>
                <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
                <span>−Rs. {discount.toLocaleString("en-PK")}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: 700, color: "#1a1a2e", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #eee" }}>
              <span>Total</span>
              <span style={{ color: "#e94560" }}>Rs. {total.toLocaleString("en-PK")}</span>
            </div>
          </div>
        </div>

        {/* ── Customer & Delivery Info ── */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 16px" }}>
            Delivery Details
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "10px", color: "#c9a84c", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 4px", fontWeight: 700 }}>Customer</p>
              <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{order.delieveryName || "—"}</p>
              <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>{order.deliveryEmail || "—"}</p>
            </div>
            {hasAddress && (
              <div>
                <p style={{ fontSize: "10px", color: "#c9a84c", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 4px", fontWeight: 700 }}>Ship To</p>
                <p style={{ fontSize: "13px", color: "#555", margin: 0, lineHeight: 1.7 }}>
                  {[
                    order.deliveryStreetAddress,
                    order.deliveryCity,
                    order.deliveryState,
                    order.deliveryPostcode,
                    order.deliveryCountry,
                  ].filter(Boolean).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <p style={{ fontSize: "12px", color: "#bbb", margin: "0 0 8px" }}>
            This page updates automatically when your order status changes.
          </p>
          <Link href="/" style={{ fontSize: "13px", color: "#e94560", textDecoration: "none", fontWeight: 600 }}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

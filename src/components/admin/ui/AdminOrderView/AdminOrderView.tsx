"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { GetAdminOrder } from "@/types/client";
import { AdminButton } from "../AdminButton";
import {
  AdminSelect,
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
  AdminSelectValue,
} from "../AdminSelect";
import { updateOrderStatus, updatePaymentStatus } from "@/lib/server/actions/order-actions";

const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;

type AdminOrderViewProps = {
  order: GetAdminOrder;
};

export function AdminOrderView(props: AdminOrderViewProps) {
  // === PROPS ===
  const { order } = props;

  // === STATE ===
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [paymentStat, setPaymentStat] = useState(order.paymentStatus);

  const handleExportPDF = () => {
    console.log("Export PDF for order:", order.id);
  };

  const handleEmailOrder = () => {
    console.log("Email order to:", order.deliveryEmail);
  };

  const handleOrderStatusChange = async (newStatus: string) => {
    const result = await updateOrderStatus(order.id, newStatus);
    if (result.success) {
      setOrderStatus(result.data.status as typeof orderStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update order status");
    }
  };

  const handlePaymentStatusChange = async (newStatus: string) => {
    const result = await updatePaymentStatus(order.id, newStatus);
    if (result.success) {
      setPaymentStat(result.data.paymentStatus as typeof paymentStat);
      toast.success(`Payment status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update payment status");
    }
  };

  // === COMPUTED ===
  const subtotal = order.cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-lg border border-neutral-04 p-4 md:p-6 space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b border-neutral-04 pb-4">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-11">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs md:text-sm text-neutral-09 mt-1">
            Created: {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <AdminButton variant="outline" onClick={handleExportPDF}>
            Export PDF
          </AdminButton>
          <AdminButton
            variant="default"
            onClick={handleEmailOrder}
            disabled={!order.deliveryEmail}
          >
            Email to Customer
          </AdminButton>
        </div>
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-2">Order Status</p>
          <AdminSelect value={orderStatus} onValueChange={handleOrderStatusChange}>
            <AdminSelectTrigger className="w-full">
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
        </div>
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-2">Payment Status</p>
          <AdminSelect value={paymentStat} onValueChange={handlePaymentStatusChange}>
            <AdminSelectTrigger className="w-full">
              <AdminSelectValue />
            </AdminSelectTrigger>
            <AdminSelectContent>
              {PAYMENT_STATUSES.map((s) => (
                <AdminSelectItem key={s} value={s}>
                  {s}
                </AdminSelectItem>
              ))}
            </AdminSelectContent>
          </AdminSelect>
        </div>
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-1">Payment Method</p>
          <p className="font-semibold text-neutral-11">{order.paymentMethod}</p>
        </div>
      </div>

      {/* Customer Note */}
      {order.orderNote && (
        <div>
          <h3 className="text-base md:text-lg font-semibold text-neutral-11 mb-3">
            Customer Note
          </h3>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded">
            <p className="text-sm text-neutral-11 italic whitespace-pre-wrap">
              {order.orderNote}
            </p>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-neutral-11 mb-3">
          Order Items
        </h3>
        <div className="space-y-3">
          {order.cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 md:gap-4 border border-neutral-04 rounded p-3 md:p-4"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm md:text-base text-neutral-11 truncate">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-neutral-09">
                  Size: {item.size.label}
                </p>
                <p className="text-xs md:text-sm text-neutral-09">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm md:text-base text-neutral-11">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs md:text-sm text-neutral-09">
                  <span>x{item.quantity + " "}</span>
                  <span>${item.unitPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-neutral-04 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-neutral-10">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {order.shippingAmount != null && (
            <div className="flex justify-between text-sm text-neutral-10">
              <span>Shipping</span>
              <span>
                {order.shippingAmount === 0
                  ? "Free"
                  : `$${order.shippingAmount.toFixed(2)}`}
              </span>
            </div>
          )}

          {order.couponCode && (
            <div className="flex justify-between text-sm text-green-700">
              <span>
                Coupon ({order.couponCode}
                {order.discountPercent ? ` — ${order.discountPercent}%` : ""})
              </span>
              <span>
                {order.discountAmount
                  ? `-$${order.discountAmount.toFixed(2)}`
                  : "—"}
              </span>
            </div>
          )}

          <div className="flex justify-between pt-2 border-t border-neutral-04">
            <span className="text-base font-bold text-neutral-11">Total</span>
            <span className="text-xl md:text-2xl font-bold text-neutral-11">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery & Billing Information */}
      {(order.delieveryName || order.billingName) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Information */}
          {order.delieveryName && (
            <div>
              <h3 className="text-base font-semibold text-neutral-11 mb-3">
                Delivery Information
              </h3>
              <div className="bg-neutral-01 p-3 md:p-4 rounded space-y-1.5">
                <p className="text-sm text-neutral-10">
                  <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                    Name
                  </span>
                  <br />
                  <span className="text-neutral-11">{order.delieveryName}</span>
                </p>
                {order.deliveryEmail && (
                  <p className="text-sm text-neutral-10">
                    <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                      Email
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {order.deliveryEmail}
                    </span>
                  </p>
                )}
                {order.deliveryPhone && (
                  <p className="text-sm text-neutral-10">
                    <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                      Phone
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {order.deliveryPhone}
                    </span>
                  </p>
                )}
                {order.deliveryStreetAddress && (
                  <p className="text-sm text-neutral-10">
                    <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                      Address
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {order.deliveryStreetAddress}
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {[
                        order.deliveryCity,
                        order.deliveryState,
                        order.deliveryPostcode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                    {order.deliveryCountry && (
                      <>
                        <br />
                        <span className="text-neutral-11">
                          {order.deliveryCountry}
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Billing Information */}
          {order.billingName && (
            <div>
              <h3 className="text-base font-semibold text-neutral-11 mb-3">
                Billing Information
              </h3>
              <div className="bg-neutral-01 p-3 md:p-4 rounded space-y-1.5">
                <p className="text-sm text-neutral-10">
                  <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                    Name
                  </span>
                  <br />
                  <span className="text-neutral-11">{order.billingName}</span>
                </p>
                {order.billingStreetAddress && (
                  <p className="text-sm text-neutral-10">
                    <span className="font-medium text-neutral-09 text-xs uppercase tracking-wide">
                      Address
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {order.billingStreetAddress}
                    </span>
                    <br />
                    <span className="text-neutral-11">
                      {[
                        order.billingCity,
                        order.billingState,
                        order.billingPostcode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                    {order.billingCountry && (
                      <>
                        <br />
                        <span className="text-neutral-11">
                          {order.billingCountry}
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

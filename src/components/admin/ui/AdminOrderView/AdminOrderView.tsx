"use client";

import Image from "next/image";

import { GetAdminOrder } from "@/types/client";
import { AdminButton } from "../AdminButton";

type AdminOrderViewProps = {
  order: GetAdminOrder;
};

export function AdminOrderView(props: AdminOrderViewProps) {
  // === PROPS ===
  const { order } = props;

  const handleExportPDF = () => {
    // TO DO: Implement PDF export
    console.log("Export PDF for order:", order.id);
  };

  const handleEmailOrder = () => {
    // TO DO: Implement email functionality
    console.log("Email order to:", order.deliveryEmail);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-1">Order Status</p>
          <p className="font-semibold text-neutral-11">{order.status}</p>
        </div>
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-1">Payment Status</p>
          <p className="font-semibold text-neutral-11">{order.paymentStatus}</p>
        </div>
        <div className="bg-neutral-01 p-4 rounded">
          <p className="text-sm text-neutral-09 mb-1">Payment Method</p>
          <p className="font-semibold text-neutral-11">{order.paymentMethod}</p>
        </div>
      </div>

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

        {/* Total */}
        <div className="border-t border-neutral-04 mt-4 pt-4 flex justify-end">
          <div className="text-right">
            <p className="text-xs md:text-sm text-neutral-09 mb-1">
              Total Amount
            </p>
            <p className="text-xl md:text-2xl font-bold text-neutral-11">
              ${order.totalPrice.toFixed(2)}
            </p>
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

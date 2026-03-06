import type { Metadata } from "next";
import { TrackOrderForm } from "@/components/common/TrackOrderForm/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Your Order — Saaj Tradition",
  description: "Enter your tracking ID to check the status of your order.",
};

export default function TrackOrderPage() {
  return <TrackOrderForm />;
}

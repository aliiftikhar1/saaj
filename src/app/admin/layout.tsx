import React from "react";
import type { Metadata } from "next";

import { AdminNavbar, AdminToaster } from "@/components/admin";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin | Cartelle",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      <main className="flex-1 px-5 md:px-10 xl:px-12 py-6 bg-white">
        {children}
      </main>
      <AdminToaster position="top-right" />
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";

import { AdminNavbar, AdminToaster } from "@/components/admin";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin | Saaj Tradition",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNavbar />
      <main className="flex-1 min-w-0 px-5 md:px-8 xl:px-10 py-6 pt-20 md:pt-6 bg-gray-50 overflow-auto">
        {children}
      </main>
      <AdminToaster position="top-right" />
    </div>
  );
}

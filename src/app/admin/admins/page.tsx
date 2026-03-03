import { AdminHeading } from "@/components/admin";
import {
  getCurrentAdmin,
  getAllAdminUsers,
} from "@/lib/server/actions/admin-auth-actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminUsersTable } from "./AdminUsersTable";
import { CreateAdminForm } from "./CreateAdminForm";

export const metadata: Metadata = {
  title: "Manage Admins",
};

export default async function AdminUsersPage() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin || currentAdmin.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const adminsResponse = await getAllAdminUsers();
  const admins = adminsResponse.success ? adminsResponse.data : [];

  return (
    <div>
      <AdminHeading heading="Manage Admins" />

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Create Admin Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Create New Admin</h3>
            <CreateAdminForm />
          </div>
        </div>

        {/* Admin Users Table */}
        <div className="lg:col-span-2">
          <AdminUsersTable
            admins={admins}
            currentAdminId={currentAdmin.id}
          />
        </div>
      </div>
    </div>
  );
}

import { AdminHeading } from "@/components/admin";
import { getCurrentAdmin } from "@/lib/server/actions/admin-auth-actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PasswordUpdateForm } from "./PasswordUpdateForm";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function AdminSettingsPage() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/admin/login");
  }

  return (
    <div>
      <AdminHeading heading="Settings" />

      <div className="mt-6 max-w-lg">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 w-16">Name:</span>
                <span className="font-medium">{currentAdmin.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 w-16">Email:</span>
                <span className="font-medium">{currentAdmin.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 w-16">Role:</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    currentAdmin.role === "SUPER_ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {currentAdmin.role === "SUPER_ADMIN"
                    ? "Super Admin"
                    : "Admin"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          <h3 className="text-lg font-semibold mb-4">Update Password</h3>
          <PasswordUpdateForm />
        </div>
      </div>
    </div>
  );
}

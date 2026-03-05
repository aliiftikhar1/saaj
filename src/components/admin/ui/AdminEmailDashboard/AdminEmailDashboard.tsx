"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Users, Edit, Trash2, ToggleLeft, ToggleRight, Plus, SendHorizonal, Loader2 } from "lucide-react";
import type { EmailTemplate } from "@prisma/client";
import { adminRoutes } from "@/lib";
import { AdminButton } from "../AdminButton";
import { deleteEmailTemplate, updateEmailTemplate, sendTestEmailsToAddress } from "@/lib/server/actions/email-actions";

const TEMPLATE_TYPE_LABELS: Record<string, string> = {
  ORDER_CONFIRMATION: "Order Confirmation",
  ORDER_ADMIN_NOTIFICATION: "New Order (Admin)",
  ORDER_STATUS_UPDATE: "Order Status Update",
  NEWSLETTER: "Newsletter",
  PRODUCT_UPDATE: "Product Update",
  COLLECTION_UPDATE: "Collection Update",
  CUSTOM: "Custom",
};

type Props = {
  templates: EmailTemplate[];
  subscriberCount: number;
};

export function AdminEmailDashboard({ templates, subscriberCount }: Props) {
  const [items, setItems] = useState(templates);
  const [testEmail, setTestEmail] = useState("");
  const [testSending, setTestSending] = useState(false);

  const handleToggle = async (id: string, current: boolean) => {
    const result = await updateEmailTemplate(id, { isActive: !current });
    if (result.success) {
      setItems((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isActive: !current } : t)),
      );
      toast.success(!current ? "Template activated" : "Template deactivated");
    } else {
      toast.error("Failed to update template");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this template? The system will fall back to the default template.")) return;
    const result = await deleteEmailTemplate(id);
    if (result.success) {
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast.success("Template deleted");
    } else {
      toast.error("Failed to delete template");
    }
  };

  const handleSendTestEmails = async () => {
    if (!testEmail.trim() || !testEmail.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    setTestSending(true);
    const result = await sendTestEmailsToAddress(testEmail.trim());
    setTestSending(false);
    if (result.success) {
      const { sent, failed } = result.data;
      if (failed.length === 0) {
        toast.success(`${sent} test emails sent successfully to ${testEmail}!`);
      } else {
        toast.warning(`${sent} sent, ${failed.length} failed: ${failed.join("; ")}`);
      }
    } else {
      toast.error("Failed to send test emails: " + result.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-blue-50">
            <Mail className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Custom Templates</p>
            <p className="text-2xl font-bold text-gray-900">{items.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-green-50">
            <Users className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Subscribers</p>
            <p className="text-2xl font-bold text-gray-900">{subscriberCount}</p>
          </div>
        </div>
        <Link href={adminRoutes.emailSubscribers} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:border-gray-300 transition-colors">
          <div className="p-2.5 rounded-lg bg-amber-50">
            <Users className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">View Subscribers</p>
            <p className="text-sm font-medium text-blue-600">→ Open list</p>
          </div>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>How templates work:</strong> Each email type has a built-in default template. When you create a custom template for a type, it will override the default. You can add images, edit HTML, and customize subject lines.
        </p>
      </div>

      {/* Test Emails Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <SendHorizonal size={16} className="text-gray-500" /> Send Test Emails
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Send all 4 email types (order confirmation, admin notification, status update, newsletter) to an address to verify they are working correctly.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            onKeyDown={(e) => e.key === "Enter" && handleSendTestEmails()}
          />
          <AdminButton onClick={handleSendTestEmails} disabled={testSending} className="flex items-center gap-2 shrink-0">
            {testSending ? <Loader2 size={14} className="animate-spin" /> : <SendHorizonal size={14} />}
            {testSending ? "Sending…" : "Send Test"}
          </AdminButton>
        </div>
      </div>

      {/* Templates Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Email Templates</h3>
          <Link href={adminRoutes.emailsCreate}>
            <AdminButton size="sm" className="flex items-center gap-1.5">
              <Plus size={14} /> New Template
            </AdminButton>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-12 text-center">
            <Mail className="mx-auto mb-3 text-gray-300" size={36} />
            <p className="text-gray-500 text-sm">No custom templates yet.</p>
            <p className="text-gray-400 text-xs mt-1">System defaults are active. Create one to override.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((t) => (
              <div key={t.id} className="flex items-center gap-4 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{t.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {TEMPLATE_TYPE_LABELS[t.type] ?? t.type}
                    </span>
                    <span className="text-xs text-gray-400 truncate">{t.subject}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(t.id, t.isActive)}
                    title={t.isActive ? "Deactivate" : "Activate"}
                    className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {t.isActive ? (
                      <ToggleRight size={22} className="text-green-500" />
                    ) : (
                      <ToggleLeft size={22} />
                    )}
                  </button>
                  <Link href={`${adminRoutes.emails}/${t.id}`}>
                    <button className="cursor-pointer p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                      <Edit size={15} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="cursor-pointer p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

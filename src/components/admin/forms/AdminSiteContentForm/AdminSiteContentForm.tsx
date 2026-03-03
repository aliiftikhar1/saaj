"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  AdminButton,
  AdminField,
  AdminFieldGroup,
  AdminFieldLabel,
  AdminFieldSet,
  AdminInput,
} from "@/components/admin";
import { bulkUpdateSiteContent } from "@/lib/server/actions";
import { SiteContentItem } from "@/types/client";

type AdminSiteContentFormProps = {
  items: SiteContentItem[];
};

export function AdminSiteContentForm({ items }: AdminSiteContentFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    items.reduce(
      (acc, item) => {
        acc[item.id] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    ),
  );
  const [isSaving, setIsSaving] = useState(false);

  const grouped = items.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, SiteContentItem[]>,
  );

  const handleSave = async () => {
    setIsSaving(true);
    const updates = items
      .filter((item) => values[item.id] !== item.value)
      .map((item) => ({ id: item.id, value: values[item.id] }));

    if (updates.length === 0) {
      toast.info("No changes to save.");
      setIsSaving(false);
      return;
    }

    const res = await bulkUpdateSiteContent(updates);
    if (!res.success) {
      toast.error("Error saving content");
      setIsSaving(false);
      return;
    }
    toast.success(`${updates.length} item(s) updated successfully!`);
    setIsSaving(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="pt-3"
      >
        {Object.entries(grouped).map(([group, groupItems]) => (
          <div key={group} className="mb-8">
            <h3 className="text-lg font-semibold capitalize mb-4 text-black">
              {group.replace(/-/g, " ")}
            </h3>
            <AdminFieldGroup>
              <AdminFieldSet>
                <AdminFieldGroup>
                  {groupItems.map((item) => (
                    <AdminField key={item.id}>
                      <AdminFieldLabel htmlFor={item.key}>
                        {item.label}
                      </AdminFieldLabel>
                      {item.value.length > 80 ? (
                        <textarea
                          id={item.key}
                          className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 min-h-[80px]"
                          value={values[item.id] ?? ""}
                          onChange={(e) =>
                            setValues((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <AdminInput
                          id={item.key}
                          value={values[item.id] ?? ""}
                          onChange={(e) =>
                            setValues((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                        />
                      )}
                    </AdminField>
                  ))}
                </AdminFieldGroup>
              </AdminFieldSet>
            </AdminFieldGroup>
          </div>
        ))}
        <AdminButton type="submit" disabled={isSaving} className="mt-4">
          {isSaving ? "Saving..." : "Save All Changes"}
        </AdminButton>
      </form>
    </div>
  );
}

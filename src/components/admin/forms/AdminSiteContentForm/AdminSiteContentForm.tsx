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

/** Render a colour swatch + hex text input */
function ColorField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-12 cursor-pointer rounded border border-neutral-200 p-0.5 bg-white"
        aria-label="Pick colour"
      />
      <AdminInput
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 font-mono"
        placeholder="#000000"
      />
    </div>
  );
}

/** Render an on/off toggle for "true"/"false" string values */
function ActiveToggle({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isOn = value === "true";
  return (
    <div className="flex items-center gap-3 py-1">
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={isOn}
        onClick={() => onChange(isOn ? "false" : "true")}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${
          isOn ? "bg-neutral-900" : "bg-neutral-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-sm text-neutral-600 select-none">
        {isOn ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

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

  const handleChange = (id: string, v: string) =>
    setValues((prev) => ({ ...prev, [id]: v }));

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
                  {groupItems.map((item) => {
                    const isActive = item.key.endsWith("_active");
                    const isColor = item.key.endsWith("_color");
                    const isLong = (values[item.id] ?? "").length > 80;

                    return (
                      <AdminField key={item.id}>
                        <AdminFieldLabel htmlFor={item.key}>
                          {item.label}
                        </AdminFieldLabel>

                        {isActive ? (
                          <ActiveToggle
                            id={item.key}
                            value={values[item.id] ?? "false"}
                            onChange={(v) => handleChange(item.id, v)}
                          />
                        ) : isColor ? (
                          <ColorField
                            id={item.key}
                            value={values[item.id] ?? "#000000"}
                            onChange={(v) => handleChange(item.id, v)}
                          />
                        ) : isLong ? (
                          <textarea
                            id={item.key}
                            className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 min-h-[80px]"
                            value={values[item.id] ?? ""}
                            onChange={(e) =>
                              handleChange(item.id, e.target.value)
                            }
                          />
                        ) : (
                          <AdminInput
                            id={item.key}
                            value={values[item.id] ?? ""}
                            onChange={(e) =>
                              handleChange(item.id, e.target.value)
                            }
                          />
                        )}
                      </AdminField>
                    );
                  })}
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

"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Globe,
  ImageIcon,
  Monitor,
  Star,
  FileText,
  Settings,
  Upload,
  CheckCircle2,
  Loader2,
  Video,
  Link2,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Mail,
  Truck,
  Clock,
  Megaphone,
  ShoppingBag,
  Handshake,
} from "lucide-react";

import { AdminButton, AdminInput } from "@/components/admin";
import {
  bulkUpdateSiteContent,
  deleteSiteContentById,
  upsertSiteContent,
} from "@/lib/server/actions";
import { SiteContentItem } from "@/types/client";

// -- helpers -------------------------------------------------------------------

function isMediaKey(key: string): boolean {
  return (
    key.includes("_image") ||
    key.includes("_video") ||
    key.endsWith("_mp4") ||
    key.endsWith("_webm") ||
    key.endsWith("_logo")
  );
}

const GROUP_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; description: string }
> = {
  "social-links": {
    label: "Social Links & Contact",
    icon: <Globe size={16} />,
    description:
      "Contact info and social media links shown in the footer and about page.",
  },
  hero: {
    label: "Hero Section",
    icon: <ImageIcon size={16} />,
    description: "Main banner image and text at the top of the home page.",
  },
  "home-page": {
    label: "Home Page — Section Headings",
    icon: <Monitor size={16} />,
    description: "New arrivals, collections, and news section headings.",
  },
  "video-section": {
    label: "Home Video",
    icon: <Video size={16} />,
    description: "The full-width video on the home page. Upload MP4/WebM and set the poster image.",
  },
  "feature-cards": {
    label: "Feature Cards",
    icon: <Star size={16} />,
    description: "The three feature highlight cards on the home page.",
  },
  "about-images": {
    label: "About Page Images",
    icon: <ImageIcon size={16} />,
    description: "Images displayed on the About Us page.",
  },
  "about-page": {
    label: "About Page Text",
    icon: <FileText size={16} />,
    description: "Text content for the About page.",
  },
  "about-features": {
    label: "About Page Features",
    icon: <Star size={16} />,
    description: "Feature cards shown on the About page.",
  },
  newsletter: {
    label: "Newsletter",
    icon: <Mail size={16} />,
    description: "Newsletter heading and description text.",
  },
  shipping: {
    label: "Shipping",
    icon: <Truck size={16} />,
    description: "Shipping charge settings.",
  },
  "delivery-estimates": {
    label: "Delivery Estimates",
    icon: <Clock size={16} />,
    description: "Estimated delivery times shown on order pages.",
  },
  "announcement-marquee": {
    label: "Announcement Marquee",
    icon: <Megaphone size={16} />,
    description: "Top-of-page scrolling announcement bar.",
  },
  "product-marquee": {
    label: "Product Marquee",
    icon: <ShoppingBag size={16} />,
    description: "Scrolling product image marquee on the home page.",
  },
  "partner-logos-marquee": {
    label: "Partner Logos Marquee",
    icon: <Handshake size={16} />,
    description: "Scrolling partner brand logos on the home page.",
  },
};

function getGroupConfig(group: string) {
  return (
    GROUP_CONFIG[group] ?? {
      label: group
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      icon: <Settings size={16} />,
      description: "",
    }
  );
}

// -- MediaUploadField ----------------------------------------------------------

type MediaTab = "preview" | "url" | "upload";

function MediaUploadField({
  id,
  itemKey,
  value,
  onChange,
}: {
  id: string;
  itemKey: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isVideo =
    (itemKey.includes("video") && !itemKey.endsWith("_poster")) ||
    itemKey.endsWith("_mp4") ||
    itemKey.endsWith("_webm");

  const [uploading, setUploading] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");
  const [tab, setTab] = useState<MediaTab>(value ? "preview" : "upload");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeLabel = isVideo ? "200 MB" : "50 MB";
  const maxSizeBytes = isVideo ? 200 * 1024 * 1024 : 50 * 1024 * 1024;
  const acceptTypes = isVideo
    ? "video/mp4,video/webm,video/quicktime"
    : "image/jpeg,image/png,image/webp,image/avif,image/gif";
  const formatHint = isVideo ? "MP4, WebM, MOV" : "JPG, PNG, WebP, AVIF, GIF";

  const handleFile = async (file: File) => {
    if (file.size > maxSizeBytes) {
      toast.error(`File too large � maximum is ${maxSizeLabel}`);
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/site-content/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onChange(json.url);
      setTab("preview");
      toast.success("Uploaded successfully");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlDraft.trim();
    if (!trimmed) return;
    onChange(trimmed);
    setUrlDraft("");
    setTab("preview");
    toast.success("URL applied");
  };

  const handleReplace = () => setTab("upload");

  const TABS: { key: MediaTab; label: string }[] = [
    { key: "preview", label: "Preview" },
    { key: "url", label: "Use URL" },
    { key: "upload", label: "Upload File" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50/40">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 bg-white">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1 ${
              tab === t.key
                ? "border-b-2 border-gray-900 text-gray-900 bg-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t.key === "preview" && (isVideo ? <Video size={11} /> : <ImageIcon size={11} />)}
            {t.key === "url" && <Link2 size={11} />}
            {t.key === "upload" && <Upload size={11} />}
            {t.label}
          </button>
        ))}
      </div>

      {/* Preview tab */}
      {tab === "preview" && (
        <div className="p-4 space-y-3">
          {value ? (
            <>
              {isVideo ? (
                <video
                  key={value}
                  src={value}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full rounded-lg max-h-52 bg-black"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Current"
                  className="w-full rounded-lg max-h-52 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-gray-400 font-mono break-all leading-relaxed flex-1">
                  {value}
                </p>
                <button
                  type="button"
                  onClick={handleReplace}
                  className="shrink-0 text-xs px-2.5 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                >
                  Replace
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-28 text-gray-300 gap-2">
              {isVideo ? <Video size={32} /> : <ImageIcon size={32} />}
              <p className="text-xs text-gray-400">
                No {isVideo ? "video" : "image"} � use Upload or URL tab
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL tab */}
      {tab === "url" && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-gray-500 leading-relaxed">
            Paste any direct {isVideo ? "video" : "image"} URL � Cloudinary CDN,
            Unsplash image links, or any hosted file URL.
          </p>
          <div className="flex gap-2">
            {/* type="text" so any URL (including ones with query params from Unsplash etc.) is accepted */}
            <input
              id={id}
              type="text"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder={`https://images.unsplash.com/photo-... or your CDN URL`}
              className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
              onKeyDown={(e) => e.key === "Enter" && handleApplyUrl()}
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              disabled={!urlDraft.trim()}
              className="shrink-0 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              Apply
            </button>
          </div>
          {value && (
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <CheckCircle2 size={12} className="text-green-500 shrink-0 mt-0.5" />
              <span className="font-mono break-all">Current: {value}</span>
            </div>
          )}
        </div>
      )}

      {/* Upload tab */}
      {tab === "upload" && (
        <div className="p-4">
          <div
            className={`relative border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all ${
              uploading
                ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                : dragOver
                  ? "border-gray-600 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-white"
            }`}
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file && !uploading) handleFile(file);
            }}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 size={28} className="animate-spin" />
                <span className="text-sm font-medium">Uploading to Cloudinary�</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-gray-400">
                <Upload size={28} className={dragOver ? "text-gray-700" : "opacity-60"} />
                <span className="text-sm font-medium text-gray-600">
                  {dragOver ? "Drop to upload" : "Click to browse or drag & drop"}
                </span>
                <span className="text-xs text-gray-400">
                  {formatHint} � Max {maxSizeLabel}
                </span>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={acceptTypes}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// -- ColorField ----------------------------------------------------------------

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

// -- ActiveToggle --------------------------------------------------------------

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

// -- AddItemForm (inline per-section) -----------------------------------------

function AddItemForm({
  group,
  onCreated,
  onCancel,
}: {
  group: string;
  onCreated: (item: SiteContentItem) => void;
  onCancel: () => void;
}) {
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    const k = key.trim().toLowerCase().replace(/\s+/g, "_");
    const l = label.trim();
    if (!k || !l) {
      toast.error("Key and label are required");
      return;
    }
    setSaving(true);
    const res = await upsertSiteContent(k, value.trim(), l, group);
    setSaving(false);
    if (!res.success) {
      toast.error("Failed to create item");
      return;
    }
    toast.success("Item created");
    onCreated({ id: res.data!.id, key: k, value: value.trim(), label: l, group });
  };

  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 space-y-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        New Content Item
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Key (unique ID)</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. hero_subtitle"
            className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white font-mono"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Label (shown in admin)</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Hero Subtitle"
            className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Initial value (can be edited after)"
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleCreate}
          disabled={saving || !key.trim() || !label.trim()}
          className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-40 transition-colors flex items-center gap-1.5"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          {saving ? "Creating…" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 border border-gray-200 text-sm text-gray-500 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <X size={13} /> Cancel
        </button>
      </div>
    </div>
  );
}

// -- AdminSiteContentForm ------------------------------------------------------

type AdminSiteContentFormProps = {
  items: SiteContentItem[];
};

export function AdminSiteContentForm({ items: initialItems }: AdminSiteContentFormProps) {
  const [allItems, setAllItems] = useState<SiteContentItem[]>(initialItems);

  const buildInitial = (list: SiteContentItem[]) =>
    list.reduce(
      (acc, item) => {
        acc[item.id] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    );

  const [values, setValues] = useState<Record<string, string>>(buildInitial(initialItems));
  const [savedValues, setSavedValues] = useState<Record<string, string>>(buildInitial(initialItems));
  const [savingGroup, setSavingGroup] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Accordion: all groups open by default
  const allGroups = [...new Set(initialItems.map((i) => i.group))];
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(allGroups));

  // Per-group "add new item" forms
  const [addingGroup, setAddingGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const grouped = allItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, SiteContentItem[]>,
  );

  const handleChange = (id: string, v: string) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const applyUpdates = (updates: { id: string; value: string }[]) => {
    setSavedValues((prev) => {
      const next = { ...prev };
      updates.forEach((u) => (next[u.id] = u.value));
      return next;
    });
  };

  const handleSaveGroup = async (group: string, groupItems: SiteContentItem[]) => {
    const updates = groupItems
      .filter((item) => values[item.id] !== savedValues[item.id])
      .map((item) => ({ id: item.id, value: values[item.id] }));

    if (updates.length === 0) {
      toast.info("No changes in this section.");
      return;
    }
    setSavingGroup(group);
    const res = await bulkUpdateSiteContent(updates);
    setSavingGroup(null);
    if (!res.success) {
      toast.error("Error saving section");
      return;
    }
    applyUpdates(updates);
    toast.success(`${updates.length} item(s) saved`);
  };

  const handleSaveAll = async () => {
    const updates = allItems
      .filter((item) => values[item.id] !== savedValues[item.id])
      .map((item) => ({ id: item.id, value: values[item.id] }));

    if (updates.length === 0) {
      toast.info("No changes to save.");
      return;
    }
    setSavingAll(true);
    const res = await bulkUpdateSiteContent(updates);
    setSavingAll(false);
    if (!res.success) {
      toast.error("Error saving content");
      return;
    }
    applyUpdates(updates);
    toast.success(`${updates.length} item(s) updated`);
  };

  const handleDelete = async (item: SiteContentItem) => {
    if (!confirm(`Delete "${item.label}"?\n\nKey: ${item.key}\nThis cannot be undone.`)) return;
    setDeletingId(item.id);
    const res = await deleteSiteContentById(item.id);
    setDeletingId(null);
    if (!res.success) {
      toast.error("Failed to delete item");
      return;
    }
    setAllItems((prev) => prev.filter((i) => i.id !== item.id));
    setValues((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    setSavedValues((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    toast.success(`"${item.label}" deleted`);
  };

  const handleItemCreated = (newItem: SiteContentItem) => {
    setAllItems((prev) => [...prev, newItem]);
    setValues((prev) => ({ ...prev, [newItem.id]: newItem.value }));
    setSavedValues((prev) => ({ ...prev, [newItem.id]: newItem.value }));
    setAddingGroup(null);
    // ensure section is open
    setOpenGroups((prev) => new Set([...prev, newItem.group]));
  };

  const totalChanges = allItems.filter(
    (item) => values[item.id] !== savedValues[item.id],
  ).length;

  return (
    <div className="space-y-4 pb-10">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 -mx-6 px-6 py-3 bg-white/95 backdrop-blur border-b border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {totalChanges > 0
            ? `${totalChanges} unsaved change${totalChanges === 1 ? "" : "s"}`
            : "All changes saved"}
        </p>
        <AdminButton
          type="button"
          onClick={handleSaveAll}
          disabled={savingAll || totalChanges === 0}
        >
          {savingAll ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Saving…
            </span>
          ) : (
            `Save All${totalChanges > 0 ? ` (${totalChanges})` : ""}`
          )}
        </AdminButton>
      </div>

      {/* Section accordion cards � hero & home-page first */}
      {Object.entries(grouped)
        .sort(([a], [b]) => {
          const ORDER = [
            "hero",
            "video-section",
            "home-page",
            "feature-cards",
            "about-images",
            "about-page",
            "about-features",
            "social-links",
            "newsletter",
            "shipping",
            "delivery-estimates",
            "announcement-marquee",
            "product-marquee",
            "partner-logos-marquee",
          ];
          const ai = ORDER.indexOf(a);
          const bi = ORDER.indexOf(b);
          if (ai === -1 && bi === -1) return a.localeCompare(b);
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        })
        .map(([group, groupItems]) => {
        const config = getGroupConfig(group);
        const isOpen = openGroups.has(group);
        const sectionChanges = groupItems.filter(
          (item) => values[item.id] !== savedValues[item.id],
        ).length;

        return (
          <div
            key={group}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Accordion header � click to open/close */}
            <button
              type="button"
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-50/80 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500">
                  {config.icon}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">
                    {config.label}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {groupItems.length} item{groupItems.length !== 1 ? "s" : ""}
                  </span>
                  {sectionChanges > 0 && (
                    <span className="ml-2 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      {sectionChanges} unsaved
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {config.description && isOpen && (
                  <p className="hidden sm:block text-xs text-gray-400 max-w-xs text-right">
                    {config.description}
                  </p>
                )}
                {isOpen ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Accordion body */}
            {isOpen && (
              <div className="border-t border-gray-100">
                <div className="p-5 space-y-5">
                  {groupItems.map((item) => {
                    const isActive = item.key.endsWith("_active");
                    const isColor = item.key.endsWith("_color");
                    const isMedia = isMediaKey(item.key);
                    const isLong =
                      !isMedia && (values[item.id] ?? "").length > 80;
                    const hasChange =
                      values[item.id] !== savedValues[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`rounded-lg border p-4 transition-colors ${
                          hasChange
                            ? "border-amber-200 bg-amber-50/30"
                            : "border-gray-100 bg-white"
                        }`}
                      >
                        {/* Item header */}
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={item.key}
                              className="block text-sm font-medium text-gray-800 cursor-pointer"
                            >
                              {item.label}
                            </label>
                            <span className="text-xs text-gray-400 font-mono">
                              {item.key}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {hasChange && (
                              <span className="text-xs text-amber-600 font-semibold">
                                unsaved
                              </span>
                            )}
                            <button
                              type="button"
                              title={`Delete "${item.label}"`}
                              onClick={() => handleDelete(item)}
                              disabled={deletingId === item.id}
                              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                            >
                              {deletingId === item.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Field */}
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
                        ) : isMedia ? (
                          <MediaUploadField
                            id={item.key}
                            itemKey={item.key}
                            value={values[item.id] ?? ""}
                            onChange={(v) => handleChange(item.id, v)}
                          />
                        ) : isLong ? (
                          <textarea
                            id={item.key}
                            className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[72px] resize-y"
                            value={values[item.id] ?? ""}
                            onChange={(e) => handleChange(item.id, e.target.value)}
                          />
                        ) : (
                          <AdminInput
                            id={item.key}
                            value={values[item.id] ?? ""}
                            onChange={(e) => handleChange(item.id, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Add item form or button */}
                  {addingGroup === group ? (
                    <AddItemForm
                      group={group}
                      onCreated={handleItemCreated}
                      onCancel={() => setAddingGroup(null)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingGroup(group)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50/60 transition-colors"
                    >
                      <Plus size={14} /> Add item to this section
                    </button>
                  )}
                </div>

                {/* Section footer */}
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end">
                  <button
                    type="button"
                    disabled={sectionChanges === 0 || savingGroup === group}
                    onClick={() => handleSaveGroup(group, groupItems)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      sectionChanges > 0
                        ? "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-default"
                    }`}
                  >
                    {savingGroup === group ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 size={12} className="animate-spin" />
                        Saving…
                      </span>
                    ) : sectionChanges > 0 ? (
                      `Save Section (${sectionChanges})`
                    ) : (
                      "Saved ✓"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

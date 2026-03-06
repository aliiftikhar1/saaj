import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { BLOB_STORAGE_PREFIXES } from "@/lib";

const ADMIN_COOKIE_NAME = "admin_session";
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function isAdminAuthenticated(req: NextRequest): boolean {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`),
  );
  const token = match?.[1];
  if (!token) return false;
  try {
    const decoded = JSON.parse(
      Buffer.from(decodeURIComponent(token), "base64").toString("utf-8"),
    );
    return Boolean(decoded.id && decoded.role);
  } catch {
    return false;
  }
}

/*

    API route to upload product images to vercel blob storage.
    Requires an active admin session.

*/

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();

  const entries = form.getAll("files");
  const files = entries.filter((v): v is File => v instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }

  const invalidFile = files.find((f) => !ALLOWED_MIME_TYPES.has(f.type));
  if (invalidFile) {
    return NextResponse.json(
      { error: `Invalid file type: ${invalidFile.type}. Only images are allowed.` },
      { status: 400 },
    );
  }

  const uploadPromises = files.map((file) =>
    put(BLOB_STORAGE_PREFIXES.PRODUCTS + file.name, file, {
      access: "public",
      addRandomSuffix: true,
    }),
  );

  const blobs = await Promise.all(uploadPromises);
  const urls = blobs.map((blob) => blob.url);

  return NextResponse.json({ urls });
}

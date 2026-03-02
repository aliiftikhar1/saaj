import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { BLOB_STORAGE_PREFIXES } from "@/lib";

/*

    API route to upload product images to vercel blob storage.

*/

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const entries = form.getAll("files");
  const files = entries.filter((v): v is File => v instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
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

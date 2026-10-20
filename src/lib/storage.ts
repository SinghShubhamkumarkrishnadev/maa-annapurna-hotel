import path from "path";
import fs from "fs";
import { getSupabase } from "./supabase";

const BUCKET_NAME = "hotel-images";

export interface UploadResult {
  url: string;
  fileName: string;
  storagePath?: string;
}

/**
 * Ensures bucket exists on Supabase
 */
async function ensureBucket() {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === BUCKET_NAME);
    if (!exists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }
  } catch (err) {
    console.warn("Could not check/create bucket on Supabase:", err);
  }
}

/**
 * Uploads a buffer directly to Supabase Storage & local public/uploads fallback
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  folder: string = "photos"
): Promise<UploadResult> {
  // Sanitize filename
  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const baseName = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);

  const timestamp = Date.now();
  const safeFilename = `${baseName || "photo"}-${timestamp}${ext}`;
  const storagePath = `${folder}/${safeFilename}`;

  let publicUrl = "";

  // 1. Try Supabase Storage
  const supabase = getSupabase();
  if (supabase) {
    try {
      await ensureBucket();
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, buffer, {
          contentType: mimeType || "image/jpeg",
          upsert: true,
          cacheControl: "31536000",
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      } else if (error) {
        console.error("Supabase storage upload error:", error.message);
      }
    } catch (err) {
      console.error("Supabase upload exception:", err);
    }
  }

  // 2. Also write to public/uploads on disk for local dev / direct file serving
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const localFilePath = path.join(uploadDir, safeFilename);
    await fs.promises.writeFile(localFilePath, buffer);

    // If Supabase wasn't available, use the local path
    if (!publicUrl) {
      publicUrl = `/uploads/${safeFilename}`;
    }
  } catch (localErr) {
    console.warn("Local filesystem write skipped/failed:", localErr);
  }

  if (!publicUrl) {
    throw new Error("Failed to store image in either cloud storage or local disk");
  }

  return {
    url: publicUrl,
    fileName: safeFilename,
    storagePath,
  };
}

/**
 * Deletes an image from Supabase storage or local disk based on its src
 */
export async function deleteStoredImage(src: string): Promise<boolean> {
  if (!src) return false;

  let deleted = false;

  // Check Supabase URL
  if (src.includes(BUCKET_NAME)) {
    const supabase = getSupabase();
    if (supabase) {
      try {
        // Extract path after bucket name
        const match = src.match(new RegExp(`${BUCKET_NAME}/(.+)$`));
        if (match && match[1]) {
          const filePath = decodeURIComponent(match[1].split("?")[0]);
          const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);
          if (!error) deleted = true;
        }
      } catch (err) {
        console.warn("Failed to delete from Supabase storage:", err);
      }
    }
  }

  // Check local uploads
  if (src.startsWith("/uploads/")) {
    try {
      const fileName = path.basename(src);
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        deleted = true;
      }
    } catch (err) {
      console.warn("Failed to delete from local uploads:", err);
    }
  }

  return deleted;
}

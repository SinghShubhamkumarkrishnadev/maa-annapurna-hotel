import { isRequestAuthenticated } from "@/lib/auth";
import { getPhotos, savePhotos, PhotoItem } from "@/lib/data";
import { uploadImageBuffer } from "@/lib/storage";

function humanizeFilename(filename: string): string {
  // Strip extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  // Replace hyphens, underscores, dots with spaces
  const clean = nameWithoutExt.replace(/[-_.]+/g, " ").trim();
  // Capitalize words
  return clean
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Collect all files from "files" or single "file"
    const files: File[] = [];
    const filesFromMulti = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    if (filesFromMulti && filesFromMulti.length > 0) {
      files.push(...filesFromMulti.filter((f) => f && f.size > 0));
    }
    if (singleFile && singleFile.size > 0 && !files.includes(singleFile)) {
      files.push(singleFile);
    }

    if (files.length === 0) {
      return Response.json({ error: "No image file provided in upload" }, { status: 400 });
    }

    const defaultCategory = (formData.get("category") as string) || "rooms";
    const category: "rooms" | "bathrooms" | "exterior" =
      defaultCategory === "bathrooms"
        ? "bathrooms"
        : defaultCategory === "exterior"
        ? "exterior"
        : "rooms";

    const customTitle = (formData.get("title") as string) || "";
    const customCaption = (formData.get("caption") as string) || "";
    const addToGallery = formData.get("addToGallery") !== "false";

    const existingPhotos = await getPhotos();
    let nextId = existingPhotos.length > 0 ? Math.max(...existingPhotos.map((p) => p.id)) + 1 : 1;

    const createdPhotos: PhotoItem[] = [];
    const uploadResults: { url: string; fileName: string }[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        return Response.json(
          { error: `File "${file.name}" exceeds the maximum limit of 15MB.` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await uploadImageBuffer(buffer, file.name, file.type, "photos");
      uploadResults.push({ url: uploadRes.url, fileName: uploadRes.fileName });

      if (addToGallery) {
        const title = customTitle || humanizeFilename(file.name) || `Hotel Photo ${nextId}`;
        const caption =
          customCaption || `${title} at Maa Annapurna Hotel Bodhgaya`;

        const newPhoto: PhotoItem = {
          id: nextId++,
          title,
          category,
          src: uploadRes.url,
          width: 1600,
          height: 1060,
          alt: `${title} - Maa Annapurna Bodhgaya`,
          caption,
        };

        createdPhotos.push(newPhoto);
      }
    }

    if (uploadResults.length === 0) {
      return Response.json(
        { error: "No valid image files could be processed. Please check file format." },
        { status: 400 }
      );
    }

    if (addToGallery && createdPhotos.length > 0) {
      const updatedPhotos = [...existingPhotos, ...createdPhotos];
      await savePhotos(updatedPhotos);
    }

    return Response.json({
      success: true,
      message: `Successfully uploaded ${uploadResults.length} image(s)`,
      photo: createdPhotos[0] || null,
      photos: createdPhotos,
      url: uploadResults[0]?.url,
      fileName: uploadResults[0]?.fileName,
      results: uploadResults,
    });
  } catch (err: unknown) {
    console.error("Image upload exception:", err);
    const message = err instanceof Error ? err.message : "Internal image upload error";
    return Response.json({ error: message }, { status: 500 });
  }
}

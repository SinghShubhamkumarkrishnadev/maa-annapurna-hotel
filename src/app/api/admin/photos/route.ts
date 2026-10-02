import { isRequestAuthenticated } from "@/lib/auth";
import { getPhotos, savePhotos, PhotoItem } from "@/lib/data";

export async function GET() {
  const photos = await getPhotos();
  return Response.json({ success: true, photos });
}

export async function POST(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.src) {
      return Response.json({ error: "Photo URL/path is required" }, { status: 400 });
    }

    const photos = await getPhotos();
    const newId = photos.length > 0 ? Math.max(...photos.map((p) => p.id)) + 1 : 1;

    const newPhoto: PhotoItem = {
      id: newId,
      title: data.title || `Photo ${newId} - Maa Annapurna Bodhgaya`,
      category: data.category === "bathrooms" ? "bathrooms" : data.category === "exterior" ? "exterior" : "rooms",
      src: data.src,
      width: Number(data.width) || 1600,
      height: Number(data.height) || 900,
      alt: data.alt || data.title || "Photo at Maa Annapurna Hotel Bodhgaya",
      caption: data.caption || data.title || "Guest room view at Maa Annapurna Hotel Bodhgaya",
    };

    photos.push(newPhoto);
    await savePhotos(photos);

    return Response.json({ success: true, message: "Photo added successfully", photo: newPhoto }, { status: 201 });
  } catch (error) {
    console.error("Error adding photo:", error);
    return Response.json({ error: "Failed to add photo" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return Response.json({ error: "Photo ID is required" }, { status: 400 });
    }

    const photos = await getPhotos();
    const filtered = photos.filter((p) => p.id !== id);

    if (filtered.length === photos.length) {
      return Response.json({ error: "Photo not found" }, { status: 404 });
    }

    await savePhotos(filtered);
    return Response.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return Response.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}

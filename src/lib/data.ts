import fs from "fs/promises";
import path from "path";
import os from "os";
import { getSupabase } from "./supabase";

export interface RoomItem {
  id: string;
  name: string;
  badge: string;
  image: string;
  beds: string;
  guests: string;
  price: number;
  originalPrice: number;
  discount: string;
  priceNote: string;
  status: string;
  statusType: "available" | "limited" | "sold_out";
  availableUnits: number;
  totalUnits: number;
  bookedToday: number;
  availabilityText: string;
  isAvailable: boolean;
  isActive: boolean;
  features: string[];
  description: string;
  alt: string;
}

export interface PhotoItem {
  id: number;
  title: string;
  category: "rooms" | "bathrooms" | "exterior";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment?: string;
  avatar: string;
  date: string;
  stayType?: string;
  verified?: boolean;
  createdAt: string;
}

// Source paths bundled with application
const ROOMS_FILE_PATH = path.join(process.cwd(), "src", "data", "rooms.json");
const PHOTOS_FILE_PATH = path.join(process.cwd(), "src", "data", "photos.json");
const REVIEWS_FILE_PATH = path.join(process.cwd(), "src", "data", "reviews.json");

// Fallback writable paths for serverless environments (e.g. Vercel)
const TMP_ROOMS_FILE_PATH = path.join(os.tmpdir(), "maa_rooms.json");
const TMP_PHOTOS_FILE_PATH = path.join(os.tmpdir(), "maa_photos.json");
const TMP_REVIEWS_FILE_PATH = path.join(os.tmpdir(), "maa_reviews.json");

// In-memory caching for zero-latency lookups
let cachedRooms: RoomItem[] | null = null;
let cachedPhotos: PhotoItem[] | null = null;
let cachedReviews: ReviewItem[] | null = null;

async function readFileSafe<T>(primaryPath: string, tmpPath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(tmpPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    // Fall back to primary bundled file
  }

  try {
    const raw = await fs.readFile(primaryPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read ${primaryPath}:`, err);
    return null;
  }
}

async function writeFileSafe<T>(primaryPath: string, tmpPath: string, data: T): Promise<void> {
  const serialized = JSON.stringify(data, null, 2);

  // 1. Try writing to repo directory (for local dev)
  try {
    const dir = path.dirname(primaryPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(primaryPath, serialized, "utf-8");
    return;
  } catch {
    // Expected on read-only serverless filesystems (e.g., Vercel Lambda)
  }

  // 2. Fall back to writing in OS temp directory
  try {
    await fs.writeFile(tmpPath, serialized, "utf-8");
  } catch (tmpErr) {
    console.warn(`Could not persist to ${tmpPath}:`, tmpErr);
  }
}

// ==========================================
// ROOMS (Supabase + Local Fallback)
// ==========================================
export async function getRooms(): Promise<RoomItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });

      if (!error && data && data.length > 0) {
        cachedRooms = data as RoomItem[];
        return cachedRooms;
      }
    } catch (err) {
      console.warn("Supabase getRooms fallback:", err);
    }
  }

  if (cachedRooms && cachedRooms.length > 0) {
    return cachedRooms;
  }
  const localData = await readFileSafe<RoomItem[]>(ROOMS_FILE_PATH, TMP_ROOMS_FILE_PATH);
  cachedRooms = localData || [];

  // Auto-seed Supabase if empty
  if (supabase && cachedRooms.length > 0) {
    (async () => {
      try {
        await supabase.from("rooms").upsert(cachedRooms, { onConflict: "id" });
      } catch {
        // Ignored
      }
    })();
  }

  return cachedRooms;
}

export async function saveRooms(rooms: RoomItem[]): Promise<void> {
  cachedRooms = rooms;
  await writeFileSafe(ROOMS_FILE_PATH, TMP_ROOMS_FILE_PATH, rooms);

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("rooms").upsert(rooms, { onConflict: "id" });
      if (error) {
        console.error("Supabase saveRooms error:", error.message);
      }
    } catch (err) {
      console.error("Failed to persist rooms to Supabase:", err);
    }
  }
}

export async function deleteRoomFromDb(id: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("rooms").delete().eq("id", id);
    } catch (err) {
      console.error("Supabase delete room error:", err);
    }
  }
}

// ==========================================
// REVIEWS (Supabase + Local Fallback)
// ==========================================
export async function getReviews(): Promise<ReviewItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("createdAt", { ascending: false });

      if (!error && data && data.length > 0) {
        cachedReviews = data as ReviewItem[];
        return cachedReviews;
      }
    } catch (err) {
      console.warn("Supabase getReviews fallback:", err);
    }
  }

  if (cachedReviews && cachedReviews.length > 0) {
    return cachedReviews;
  }
  const localData = await readFileSafe<ReviewItem[]>(REVIEWS_FILE_PATH, TMP_REVIEWS_FILE_PATH);
  cachedReviews = localData || [];

  // Auto-seed Supabase if empty
  if (supabase && cachedReviews.length > 0) {
    (async () => {
      try {
        await supabase.from("reviews").upsert(cachedReviews, { onConflict: "id" });
      } catch {
        // Ignored
      }
    })();
  }

  return cachedReviews;
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  cachedReviews = reviews;
  await writeFileSafe(REVIEWS_FILE_PATH, TMP_REVIEWS_FILE_PATH, reviews);

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("reviews").upsert(reviews, { onConflict: "id" });
      if (error) {
        console.error("Supabase saveReviews error:", error.message);
      }
    } catch (err) {
      console.error("Failed to persist reviews to Supabase:", err);
    }
  }
}

export async function deleteReviewFromDb(id: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("reviews").delete().eq("id", id);
    } catch (err) {
      console.error("Supabase delete review error:", err);
    }
  }
}

// ==========================================
// PHOTOS (Supabase + Local Fallback)
// ==========================================
export async function getPhotos(): Promise<PhotoItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data && data.length > 0) {
        cachedPhotos = data as PhotoItem[];
        return cachedPhotos;
      }
    } catch (err) {
      console.warn("Supabase getPhotos fallback:", err);
    }
  }

  if (cachedPhotos && cachedPhotos.length > 0) {
    return cachedPhotos;
  }
  const localData = await readFileSafe<PhotoItem[]>(PHOTOS_FILE_PATH, TMP_PHOTOS_FILE_PATH);
  cachedPhotos = localData || [];
  return cachedPhotos;
}

export async function savePhotos(photos: PhotoItem[]): Promise<void> {
  cachedPhotos = photos;
  await writeFileSafe(PHOTOS_FILE_PATH, TMP_PHOTOS_FILE_PATH, photos);

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("photos").upsert(photos, { onConflict: "id" });
      if (error) {
        console.error("Supabase savePhotos error:", error.message);
      }
    } catch (err) {
      console.error("Failed to persist photos to Supabase:", err);
    }
  }
}

import fs from "fs/promises";
import path from "path";
import os from "os";

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

// In-memory caching for zero-latency lookups and resilient serverless writes
let cachedRooms: RoomItem[] | null = null;
let cachedPhotos: PhotoItem[] | null = null;
let cachedReviews: ReviewItem[] | null = null;

async function readFileSafe<T>(primaryPath: string, tmpPath: string): Promise<T | null> {
  // First try reading from /tmp if updated in this runtime
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

export async function getRooms(): Promise<RoomItem[]> {
  if (cachedRooms && cachedRooms.length > 0) {
    return cachedRooms;
  }
  const data = await readFileSafe<RoomItem[]>(ROOMS_FILE_PATH, TMP_ROOMS_FILE_PATH);
  cachedRooms = data || [];
  return cachedRooms;
}

export async function saveRooms(rooms: RoomItem[]): Promise<void> {
  cachedRooms = rooms;
  await writeFileSafe(ROOMS_FILE_PATH, TMP_ROOMS_FILE_PATH, rooms);
}

export async function getPhotos(): Promise<PhotoItem[]> {
  if (cachedPhotos && cachedPhotos.length > 0) {
    return cachedPhotos;
  }
  const data = await readFileSafe<PhotoItem[]>(PHOTOS_FILE_PATH, TMP_PHOTOS_FILE_PATH);
  cachedPhotos = data || [];
  return cachedPhotos;
}

export async function savePhotos(photos: PhotoItem[]): Promise<void> {
  cachedPhotos = photos;
  await writeFileSafe(PHOTOS_FILE_PATH, TMP_PHOTOS_FILE_PATH, photos);
}

export async function getReviews(): Promise<ReviewItem[]> {
  if (cachedReviews && cachedReviews.length > 0) {
    return cachedReviews;
  }
  const data = await readFileSafe<ReviewItem[]>(REVIEWS_FILE_PATH, TMP_REVIEWS_FILE_PATH);
  cachedReviews = data || [];
  return cachedReviews;
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  cachedReviews = reviews;
  await writeFileSafe(REVIEWS_FILE_PATH, TMP_REVIEWS_FILE_PATH, reviews);
}

import fs from "fs/promises";
import path from "path";

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

const ROOMS_FILE_PATH = path.join(process.cwd(), "src", "data", "rooms.json");
const PHOTOS_FILE_PATH = path.join(process.cwd(), "src", "data", "photos.json");
const REVIEWS_FILE_PATH = path.join(process.cwd(), "src", "data", "reviews.json");

export async function getRooms(): Promise<RoomItem[]> {
  try {
    const raw = await fs.readFile(ROOMS_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading rooms.json, using empty array fallback:", error);
    return [];
  }
}

export async function saveRooms(rooms: RoomItem[]): Promise<void> {
  const dir = path.dirname(ROOMS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(ROOMS_FILE_PATH, JSON.stringify(rooms, null, 2), "utf-8");
}

export async function getPhotos(): Promise<PhotoItem[]> {
  try {
    const raw = await fs.readFile(PHOTOS_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading photos.json, using empty array fallback:", error);
    return [];
  }
}

export async function savePhotos(photos: PhotoItem[]): Promise<void> {
  const dir = path.dirname(PHOTOS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(PHOTOS_FILE_PATH, JSON.stringify(photos, null, 2), "utf-8");
}

export async function getReviews(): Promise<ReviewItem[]> {
  try {
    const raw = await fs.readFile(REVIEWS_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading reviews.json, using empty array fallback:", error);
    return [];
  }
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  const dir = path.dirname(REVIEWS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(reviews, null, 2), "utf-8");
}


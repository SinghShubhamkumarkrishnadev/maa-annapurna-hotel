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

// In-memory caching for zero-latency lookups across requests in the active instance
let cachedRooms: RoomItem[] | null = null;
let cachedPhotos: PhotoItem[] | null = null;
let cachedReviews: ReviewItem[] | null = null;

// ==========================================
// ROOMS (100% Supabase Database Driven)
// ==========================================
export async function getRooms(): Promise<RoomItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });

      if (!error && data) {
        cachedRooms = data as RoomItem[];
        return cachedRooms;
      }
      if (error) {
        console.error("Supabase getRooms error:", error.message);
      }
    } catch (err) {
      console.error("Failed to fetch rooms from Supabase:", err);
    }
  }

  return cachedRooms || [];
}

export async function saveRooms(rooms: RoomItem[]): Promise<void> {
  cachedRooms = rooms;

  const supabase = getSupabase();
  if (supabase && rooms.length > 0) {
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
  if (cachedRooms) {
    cachedRooms = cachedRooms.filter((r) => r.id !== id);
  }
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("rooms").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete room error:", error.message);
      }
    } catch (err) {
      console.error("Supabase delete room error:", err);
    }
  }
}

// ==========================================
// REVIEWS (100% Supabase Database Driven)
// ==========================================
export async function getReviews(): Promise<ReviewItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("createdAt", { ascending: false });

      if (!error && data) {
        cachedReviews = data as ReviewItem[];
        return cachedReviews;
      }
      if (error) {
        console.error("Supabase getReviews error:", error.message);
      }
    } catch (err) {
      console.error("Failed to fetch reviews from Supabase:", err);
    }
  }

  return cachedReviews || [];
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  cachedReviews = reviews;

  const supabase = getSupabase();
  if (supabase && reviews.length > 0) {
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
  if (cachedReviews) {
    cachedReviews = cachedReviews.filter((r) => r.id !== id);
  }
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete review error:", error.message);
      }
    } catch (err) {
      console.error("Supabase delete review error:", err);
    }
  }
}

// ==========================================
// PHOTOS (100% Supabase Database Driven)
// ==========================================
export async function getPhotos(): Promise<PhotoItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        cachedPhotos = data as PhotoItem[];
        return cachedPhotos;
      }
      if (error) {
        console.error("Supabase getPhotos error:", error.message);
      }
    } catch (err) {
      console.error("Failed to fetch photos from Supabase:", err);
    }
  }

  return cachedPhotos || [];
}

export async function savePhotos(photos: PhotoItem[]): Promise<void> {
  cachedPhotos = photos;

  const supabase = getSupabase();
  if (supabase && photos.length > 0) {
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

export async function deletePhotoFromDb(id: number): Promise<void> {
  if (cachedPhotos) {
    cachedPhotos = cachedPhotos.filter((p) => p.id !== id);
  }
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("photos").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete photo error:", error.message);
      }
    } catch (err) {
      console.error("Supabase delete photo error:", err);
    }
  }
}

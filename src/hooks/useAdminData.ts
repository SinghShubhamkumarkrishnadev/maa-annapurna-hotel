import { useState, useCallback, useEffect } from "react";
import { RoomItem, PhotoItem, ReviewItem } from "@/types/admin";
import { roomService } from "@/services/roomService";
import { photoService } from "@/services/photoService";
import { reviewService } from "@/services/reviewService";

export function useAdminData(enabled = true, onError?: (msg: string) => void) {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [roomsData, photosData, reviewsResult] = await Promise.all([
        roomService.getRooms(),
        photoService.getPhotos(),
        reviewService.getReviews(),
      ]);

      setRooms(roomsData);
      setPhotos(photosData);
      setReviews(reviewsResult.reviews);
    } catch (err: unknown) {
      console.error("Failed to load admin inventory:", err);
      onError?.("Failed to load inventory data");
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    if (enabled) {
      refreshData();
    }
  }, [enabled, refreshData]);

  return {
    rooms,
    setRooms,
    photos,
    setPhotos,
    reviews,
    setReviews,
    isLoading,
    refreshData,
  };
}

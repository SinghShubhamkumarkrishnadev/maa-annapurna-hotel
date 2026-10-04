import { useState, useCallback, useEffect, useRef } from "react";
import { RoomItem, PhotoItem, ReviewItem } from "@/types/admin";
import { roomService } from "@/services/roomService";
import { photoService } from "@/services/photoService";
import { reviewService } from "@/services/reviewService";

export function useAdminData(enabled = true, onError?: (msg: string) => void) {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Stable ref for onError callback to prevent re-triggering fetch loop
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Ref to prevent concurrent duplicate fetches
  const isFetchingRef = useRef(false);

  const refreshData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
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
      onErrorRef.current?.("Failed to load inventory data");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

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

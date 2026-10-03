import { request } from "./apiClient";
import { ReviewItem } from "@/types/admin";

interface ReviewsApiResponse {
  success: boolean;
  reviews: ReviewItem[];
  stats?: {
    totalCount: number;
    averageRating: number;
    breakdown: Record<number, number>;
    recommendedPercentage: number;
  };
}

interface ReviewSingleResponse {
  success: boolean;
  review: ReviewItem;
  message?: string;
}

export const reviewService = {
  getReviews: async (): Promise<{ reviews: ReviewItem[]; stats?: ReviewsApiResponse["stats"] }> => {
    const data = await request<ReviewsApiResponse>("/api/reviews");
    return {
      reviews: data.reviews || [],
      stats: data.stats,
    };
  },

  submitReview: async (reviewData: {
    name: string;
    rating: number;
    comment: string;
    avatar: string;
    stayType: string;
  }): Promise<ReviewItem> => {
    const data = await request<ReviewSingleResponse>("/api/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
    return data.review;
  },

  deleteReview: async (id: string): Promise<void> => {
    await request<{ success: boolean }>(`/api/reviews?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },
};

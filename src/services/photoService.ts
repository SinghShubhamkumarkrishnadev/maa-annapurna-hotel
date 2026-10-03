import { request } from "./apiClient";
import { PhotoItem, PhotoFormData } from "@/types/admin";

interface PhotosApiResponse {
  success: boolean;
  photos: PhotoItem[];
}

interface PhotoSingleResponse {
  success: boolean;
  photo: PhotoItem;
  message?: string;
}

export const photoService = {
  getPhotos: async (): Promise<PhotoItem[]> => {
    const data = await request<PhotosApiResponse>("/api/admin/photos");
    return data.photos || [];
  },

  addPhoto: async (formData: PhotoFormData): Promise<PhotoItem> => {
    const data = await request<PhotoSingleResponse>("/api/admin/photos", {
      method: "POST",
      body: JSON.stringify({
        src: formData.url,
        title: formData.title,
        category: formData.category,
        caption: formData.caption,
      }),
    });
    return data.photo;
  },

  deletePhoto: async (id: number): Promise<void> => {
    await request<{ success: boolean }>(`/api/admin/photos?id=${id}`, {
      method: "DELETE",
    });
  },
};

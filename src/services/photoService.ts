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

export interface PhotoUploadResponse {
  success: boolean;
  photo: PhotoItem | null;
  photos: PhotoItem[];
  url: string;
  fileName: string;
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

  uploadPhoto: async (
    file: File,
    options?: {
      category?: "rooms" | "bathrooms" | "exterior";
      title?: string;
      caption?: string;
      addToGallery?: boolean;
    }
  ): Promise<PhotoUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    if (options?.category) formData.append("category", options.category);
    if (options?.title) formData.append("title", options.title);
    if (options?.caption) formData.append("caption", options.caption);
    if (options?.addToGallery !== undefined) {
      formData.append("addToGallery", String(options.addToGallery));
    }

    return await request<PhotoUploadResponse>("/api/admin/photos/upload", {
      method: "POST",
      body: formData,
    });
  },

  uploadMultiplePhotos: async (
    files: File[],
    options?: {
      category?: "rooms" | "bathrooms" | "exterior";
      addToGallery?: boolean;
    }
  ): Promise<PhotoUploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (options?.category) formData.append("category", options.category);
    if (options?.addToGallery !== undefined) {
      formData.append("addToGallery", String(options.addToGallery));
    }

    return await request<PhotoUploadResponse>("/api/admin/photos/upload", {
      method: "POST",
      body: formData,
    });
  },

  deletePhoto: async (id: number): Promise<void> => {
    await request<{ success: boolean }>(`/api/admin/photos?id=${id}`, {
      method: "DELETE",
    });
  },
};

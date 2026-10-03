import { request } from "./apiClient";
import { RoomItem, RoomFormData, QuickRoomUpdate } from "@/types/admin";

interface RoomsApiResponse {
  success: boolean;
  rooms: RoomItem[];
}

interface RoomSingleResponse {
  success: boolean;
  room: RoomItem;
}

export const roomService = {
  getRooms: async (isAdmin = true): Promise<RoomItem[]> => {
    const endpoint = isAdmin ? "/api/admin/rooms" : "/api/rooms";
    const data = await request<RoomsApiResponse>(endpoint);
    return data.rooms || [];
  },

  createRoom: async (formData: RoomFormData): Promise<RoomItem> => {
    const data = await request<RoomSingleResponse>("/api/admin/rooms", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return data.room;
  },

  updateRoom: async (id: string, formData: Partial<RoomFormData>): Promise<RoomItem> => {
    const data = await request<RoomSingleResponse>("/api/admin/rooms", {
      method: "PUT",
      body: JSON.stringify({ id, ...formData }),
    });
    return data.room;
  },

  quickUpdate: async (id: string, updates: QuickRoomUpdate): Promise<RoomItem> => {
    const data = await request<RoomSingleResponse>("/api/admin/rooms", {
      method: "PUT",
      body: JSON.stringify({ id, ...updates }),
    });
    return data.room;
  },

  deleteRoom: async (id: string): Promise<void> => {
    await request<{ success: boolean }>(`/api/admin/rooms?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  toggleActive: async (room: RoomItem): Promise<RoomItem> => {
    const updatedStatus = !room.isActive;
    return roomService.quickUpdate(room.id, { isActive: updatedStatus });
  },
};

import { RoomItem, PhotoItem, ReviewItem } from "@/lib/data";

export type AdminTab = "rooms" | "quick-pricing" | "photos" | "reviews";

export interface ToastNotificationState {
  text: string;
  type: "success" | "error";
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

export interface RoomFormData {
  id?: string;
  name: string;
  badge: string;
  image: string;
  beds: string;
  guests: string;
  price: number;
  originalPrice: number;
  priceNote: string;
  status: string;
  statusType: "available" | "limited" | "sold_out";
  availableUnits: number;
  totalUnits: number;
  bookedToday: number;
  availabilityText: string;
  isActive: boolean;
  description: string;
  features: string[];
}

export interface PhotoFormData {
  url: string;
  title: string;
  category: "rooms" | "bathrooms" | "exterior";
  caption: string;
}

export interface DeleteModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isProcessing?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export interface QuickRoomUpdate {
  price?: number;
  originalPrice?: number;
  availableUnits?: number;
  totalUnits?: number;
  bookedToday?: number;
  status?: string;
  statusType?: "available" | "limited" | "sold_out";
  isActive?: boolean;
}

export type { RoomItem, PhotoItem, ReviewItem };

import { ReactNode } from "react";
import { RoomItem, PhotoItem, ReviewItem } from "@/lib/data";

export type { RoomItem, PhotoItem, ReviewItem };

export interface AmenityItem {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  icon: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomName: string;
  guestName?: string;
  guestPhone?: string;
  needPickDrop?: boolean;
  needTours?: boolean;
}

import React from "react";
import Image from "next/image";
import { RoomItem } from "@/types/admin";

interface AdminRoomsTabProps {
  rooms: RoomItem[];
  isLoading: boolean;
  onOpenAddRoom: () => void;
  onOpenEditRoom: (room: RoomItem) => void;
  onToggleActive: (room: RoomItem) => void;
  onRequestDeleteRoom: (room: RoomItem) => void;
}

export default function AdminRoomsTab({
  rooms,
  isLoading,
  onOpenAddRoom,
  onOpenEditRoom,
  onToggleActive,
  onRequestDeleteRoom,
}: AdminRoomsTabProps) {
  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs text-stone-500">
        Loading room inventory...
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
        <span className="text-3xl block mb-2">🛏️</span>
        <h3 className="font-serif text-lg font-bold text-stone-900">No Rooms Added Yet</h3>
        <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
          Click the &quot;+ Add New Room&quot; button to create your first room category with pricing and photos.
        </p>
        <button
          onClick={onOpenAddRoom}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer hover:bg-emerald-700 transition"
        >
          + Add First Room
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden flex flex-col justify-between ${
            room.isActive ? "border-stone-200" : "border-stone-300 opacity-60 bg-stone-50/70"
          }`}
        >
          <div>
            {/* Thumbnail & Badges */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-stone-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {room.badge || "Room"}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span
                  className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                    room.isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-700 text-stone-200"
                  }`}
                >
                  {room.isActive ? "Live" : "Hidden"}
                </span>
              </div>
              <div className="absolute bottom-2.5 right-3 bg-stone-950/80 backdrop-blur text-white text-[11px] px-2.5 py-0.5 rounded-full">
                {room.guests}
              </div>
            </div>

            {/* Room Card Body */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {room.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    🛏️ {room.beds}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-[11px] text-stone-400 line-through">
                      ₹{room.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="font-serif text-xl font-bold text-stone-900">
                      ₹{room.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {room.discount}
                  </span>
                </div>
              </div>

              {/* Availability Pill & Inventory Status */}
              <div
                className={`mt-3 p-2.5 rounded-xl border text-xs ${
                  room.statusType === "available"
                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                    : "bg-amber-50/80 border-amber-200 text-amber-950"
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        room.statusType === "available"
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-amber-500 animate-pulse"
                      }`}
                    ></span>
                    <span>{room.status}</span>
                  </span>
                  <span className="text-[10.5px] bg-white px-2 py-0.5 rounded border border-stone-200">
                    {room.bookedToday} Booked
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 mt-1.5 font-medium">
                  <span>
                    <strong>{room.availableUnits}</strong> of {room.totalUnits} available
                  </span>
                  <span className="text-stone-500">{room.availabilityText}</span>
                </div>
              </div>

              {/* Features Tags Preview */}
              <div className="flex flex-wrap gap-1 mt-3">
                {(room.features || []).slice(0, 3).map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded"
                  >
                    ✓ {feat}
                  </span>
                ))}
                {(room.features || []).length > 3 && (
                  <span className="text-[10px] text-stone-400 self-center">
                    +{room.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="px-5 py-3.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={() => onToggleActive(room)}
              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition border cursor-pointer ${
                room.isActive
                  ? "bg-stone-200 text-stone-800 border-stone-300 hover:bg-stone-300"
                  : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
              }`}
            >
              {room.isActive ? "Hide from Site" : "Publish Live"}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenEditRoom(room)}
                className="text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded-lg transition shadow-2xs cursor-pointer"
              >
                Edit Details
              </button>
              <button
                onClick={() => onRequestDeleteRoom(room)}
                className="text-xs text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                title="Delete room"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

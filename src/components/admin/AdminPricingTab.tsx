import React from "react";
import { RoomItem, QuickRoomUpdate } from "@/types/admin";

interface AdminPricingTabProps {
  rooms: RoomItem[];
  onQuickUpdate: (id: string, updates: QuickRoomUpdate) => void;
  onToggleActive: (room: RoomItem) => void;
}

export default function AdminPricingTab({
  rooms,
  onQuickUpdate,
  onToggleActive,
}: AdminPricingTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-stone-200 bg-stone-50/70">
        <h2 className="font-serif text-lg font-bold text-stone-900">
          Fast Live Rate &amp; Inventory Adjuster
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Quickly adjust tonight&apos;s rates and room inventory counts in one click. Changes save directly to the live website.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100/80 text-stone-600 uppercase font-semibold text-[10.5px] border-b border-stone-200">
            <tr>
              <th className="py-3 px-4">Room Category</th>
              <th className="py-3 px-4">Direct Rate (₹)</th>
              <th className="py-3 px-4">OTA Price (₹)</th>
              <th className="py-3 px-4">Available Units</th>
              <th className="py-3 px-4">Booked Today</th>
              <th className="py-3 px-4">Status Tag</th>
              <th className="py-3 px-4">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-stone-50/50 transition">
                <td className="py-3.5 px-4 font-semibold text-stone-900">
                  {room.name}
                  <span className="block text-[10.5px] text-stone-500 font-normal">
                    {room.beds}
                  </span>
                </td>

                {/* Direct Price Input */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 font-bold">₹</span>
                    <input
                      type="number"
                      defaultValue={room.price}
                      onBlur={(e) => {
                        const newPrice = Number(e.target.value);
                        if (newPrice > 0 && newPrice !== room.price) {
                          onQuickUpdate(room.id, { price: newPrice });
                        }
                      }}
                      className="w-24 px-2 py-1 rounded border border-stone-300 font-bold text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </td>

                {/* OTA Price Input */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400">₹</span>
                    <input
                      type="number"
                      defaultValue={room.originalPrice}
                      onBlur={(e) => {
                        const newOta = Number(e.target.value);
                        if (newOta > 0 && newOta !== room.originalPrice) {
                          onQuickUpdate(room.id, { originalPrice: newOta });
                        }
                      }}
                      className="w-24 px-2 py-1 rounded border border-stone-200 text-stone-500"
                    />
                  </div>
                </td>

                {/* Available Units Counter */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        onQuickUpdate(room.id, {
                          availableUnits: Math.max(0, room.availableUnits - 1),
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-stone-900">
                      {room.availableUnits}
                    </span>
                    <button
                      onClick={() =>
                        onQuickUpdate(room.id, {
                          availableUnits: room.availableUnits + 1,
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Booked Today Counter */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        onQuickUpdate(room.id, {
                          bookedToday: Math.max(0, (room.bookedToday || 0) - 1),
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-stone-900">
                      {room.bookedToday || 0}
                    </span>
                    <button
                      onClick={() =>
                        onQuickUpdate(room.id, {
                          bookedToday: (room.bookedToday || 0) + 1,
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Status Tag Select */}
                <td className="py-3.5 px-4">
                  <select
                    value={room.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      const newType =
                        newStatus === "Sold Out"
                          ? "sold_out"
                          : newStatus.includes("High Demand") || newStatus.includes("Limited")
                          ? "limited"
                          : "available";
                      onQuickUpdate(room.id, {
                        status: newStatus,
                        statusType: newType,
                      });
                    }}
                    className="px-2 py-1 rounded border border-stone-300 font-medium text-xs bg-white cursor-pointer"
                  >
                    <option value="Available Today">Available Today</option>
                    <option value="High Demand">High Demand</option>
                    <option value="Limited Availability">Limited Availability</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </td>

                {/* Active Status Toggle */}
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => onToggleActive(room)}
                    className={`text-[11px] font-bold px-2 py-1 rounded-md transition cursor-pointer ${
                      room.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {room.isActive ? "● Live" : "○ Hidden"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";
import { RoomItem } from "@/types/hotel";

interface QuickBookingBarProps {
  rooms: RoomItem[];
  checkIn: string;
  checkOut: string;
  guests: string;
  selectedRoom: string;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestsChange: (val: string) => void;
  onSelectedRoomChange: (val: string) => void;
  onSearch: () => void;
}

export default function QuickBookingBar({
  rooms,
  checkIn,
  checkOut,
  guests,
  selectedRoom,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSelectedRoomChange,
  onSearch,
}: QuickBookingBarProps) {
  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md shadow-stone-200/50 border border-stone-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 items-end">
          {/* Check-In */}
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Check-In Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => onCheckInChange(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-stone-300 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:ring-1.5 focus:ring-stone-900 bg-stone-50/50"
            />
          </div>

          {/* Check-Out */}
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => onCheckOutChange(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-stone-300 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:ring-1.5 focus:ring-stone-900 bg-stone-50/50"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Total Guests
            </label>
            <select
              value={guests}
              onChange={(e) => onGuestsChange(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-stone-300 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:ring-1.5 focus:ring-stone-900 bg-stone-50/50"
            >
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests (Couple / Friends)</option>
              <option value="3 Guests">3 Guests (Triple Room)</option>
              <option value="Family / 4+ Guests">Family / Group (4+ Guests)</option>
            </select>
          </div>

          {/* Room Preference */}
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Room Category
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => onSelectedRoomChange(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-stone-300 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:ring-1.5 focus:ring-stone-900 bg-stone-50/50"
            >
              {rooms.filter((r) => r.isActive !== false).map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={onSearch}
              className="w-full h-[38px] sm:h-[40px] px-3 rounded-xl bg-stone-900 hover:bg-amber-900 text-white font-semibold text-xs sm:text-[13px] butter-touch shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Check Availability</span>
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

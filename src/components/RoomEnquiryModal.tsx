import React from "react";
import { RoomItem, BookingDetails } from "@/types/hotel";

interface RoomEnquiryModalProps {
  isOpen: boolean;
  roomTitle: string;
  rooms: RoomItem[];
  bookingDetails: BookingDetails;
  onUpdateBookingDetails: (updates: Partial<BookingDetails>) => void;
  onClose: () => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
}

export default function RoomEnquiryModal({
  isOpen,
  roomTitle,
  rooms,
  bookingDetails,
  onUpdateBookingDetails,
  onClose,
  onWhatsAppBooking,
}: RoomEnquiryModalProps) {
  if (!isOpen) return null;

  const modalRoom = rooms.find((r) => r.name === roomTitle) || rooms[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
          Direct Home Stay &amp; Hotel Inquiry
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
          Book {roomTitle}
        </h3>
        <p className="text-stone-500 text-xs mt-1">
          Submit your dates to connect directly with the host on WhatsApp for availability and best rates in Bodhgaya.
        </p>

        {modalRoom && (
          <div className="mt-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/90 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl font-bold text-stone-900">
                  ₹{modalRoom.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  ₹{modalRoom.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  {modalRoom.discount}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                Direct Rate • {modalRoom.beds}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  modalRoom.statusType === "available"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    modalRoom.statusType === "available"
                      ? "bg-emerald-600 animate-pulse"
                      : "bg-amber-600 animate-pulse"
                  }`}
                ></span>
                {modalRoom.status}
              </span>
              <p className="text-[10.5px] text-stone-500 mt-0.5 font-medium">
                {modalRoom.availableUnits} of {modalRoom.totalUnits} available
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3.5 mt-5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Anand Kumar"
              value={bookingDetails.guestName || ""}
              onChange={(e) => onUpdateBookingDetails({ guestName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Check-In</label>
              <input
                type="date"
                value={bookingDetails.checkIn}
                onChange={(e) => onUpdateBookingDetails({ checkIn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Check-Out</label>
              <input
                type="date"
                value={bookingDetails.checkOut}
                onChange={(e) => onUpdateBookingDetails({ checkOut: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Total Guests</label>
            <select
              value={bookingDetails.guests}
              onChange={(e) => onUpdateBookingDetails({ guests: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3 Guests">3 Guests</option>
              <option value="4+ Guests (Family)">4+ Guests (Family)</option>
            </select>
          </div>

          <div className="pt-1 flex flex-col gap-2 text-xs text-stone-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!bookingDetails.needPickDrop}
                onChange={(e) => onUpdateBookingDetails({ needPickDrop: e.target.checked })}
                className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-stone-300"
              />
              <span>Need Airport / Railway Pick &amp; Drop</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!bookingDetails.needTours}
                onChange={(e) => onUpdateBookingDetails({ needTours: e.target.checked })}
                className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-stone-300"
              />
              <span>Need Tours &amp; Travels Desk Assistance</span>
            </label>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onWhatsAppBooking(roomTitle);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer butter-touch"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
              </svg>
              <span>Connect on WhatsApp Now</span>
            </button>

            <a
              href="tel:+919931924027"
              className="w-full py-2.5 text-center text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition butter-touch"
            >
              Or Call Host at +91 99319 24027
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { RoomItem, BookingDetails } from "@/types/hotel";
import ScrollReveal from "./ScrollReveal";

interface ContactSectionProps {
  rooms: RoomItem[];
  bookingDetails: BookingDetails;
  onUpdateBookingDetails: (updates: Partial<BookingDetails>) => void;
  onSubmit: () => void;
}

export default function ContactSection({
  rooms,
  bookingDetails,
  onUpdateBookingDetails,
  onSubmit,
}: ContactSectionProps) {
  const activeRooms = rooms.filter((r) => r.isActive !== false);

  return (
    <section id="contact" className="py-12 sm:py-20 bg-stone-50/70 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="scale">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Direct Home Stay &amp; Hotel Enquiry
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mt-1">
              Plan Your Home Stay &amp; Hotel Visit in Bodhgaya
            </h2>
            <p className="hidden sm:block text-stone-500 text-xs sm:text-sm mt-1.5">
              Send us your dates and room requirements. Experience genuine homestay hospitality with hotel comfort at the best direct host rates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={bookingDetails.guestName || ""}
                onChange={(e) => onUpdateBookingDetails({ guestName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={bookingDetails.guestPhone || ""}
                onChange={(e) => onUpdateBookingDetails({ guestPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Check-In Date</label>
              <input
                type="date"
                value={bookingDetails.checkIn}
                onChange={(e) => onUpdateBookingDetails({ checkIn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Check-Out Date</label>
              <input
                type="date"
                value={bookingDetails.checkOut}
                onChange={(e) => onUpdateBookingDetails({ checkOut: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Room</label>
              <select
                value={bookingDetails.roomName}
                onChange={(e) => onUpdateBookingDetails({ roomName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              >
                {activeRooms.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Number of Guests</label>
              <select
                value={bookingDetails.guests}
                onChange={(e) => onUpdateBookingDetails({ guests: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="Family (4+ Guests)">Family (4+ Guests)</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-1 flex flex-wrap gap-4 text-xs text-stone-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!bookingDetails.needPickDrop}
                  onChange={(e) => onUpdateBookingDetails({ needPickDrop: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-stone-300"
                />
                <span>Need Airport / Railway Station Pick &amp; Drop</span>
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
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSubmit}
              className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm butter-touch shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
              </svg>
              <span>Send WhatsApp Enquiry</span>
            </button>

            <a
              href="tel:+919931924027"
              className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm butter-touch text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Host Directly</span>
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

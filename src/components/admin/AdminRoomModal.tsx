import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RoomItem, RoomFormData } from "@/types/admin";

interface AdminRoomModalProps {
  isOpen: boolean;
  editingRoom: RoomItem | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (formData: RoomFormData) => void | Promise<void>;
}

const DEFAULT_FEATURE_OPTIONS = [
  "Split Air Conditioner",
  "Attached Modern Bath",
  "24/7 Hot Water Geyser",
  "High-Speed Wi-Fi",
  "In-room Kitchenette Sink",
  "Dressing Table & Mirror",
  "Wooden Accent Paneling",
  "Tiled Flooring",
  "Daily Housekeeping",
  "Free Parking",
  "Electric Kettle",
];

const PRESET_GALLERY_IMAGES = [
  "/images/deluxe-room-dressing-table.jpg",
  "/images/room-triple-kitchenette.jpg",
  "/images/room-twin-wooden-paneling.jpg",
  "/images/family-suite-blue-linens.jpg",
  "/images/room-bedside-table-ac.jpg",
  "/images/room-double-single-beds.jpg",
  "/images/room-window-ac.jpg",
  "/images/bathroom-full-view.jpg",
  "/images/bathroom-shower-tiled.jpg",
  "/images/bathroom-wash-basin.jpg",
  "/images/hotel-building-facade.jpg",
];

export default function AdminRoomModal({
  isOpen,
  editingRoom,
  isSaving,
  onClose,
  onSave,
}: AdminRoomModalProps) {
  const [formName, setFormName] = useState("");
  const [formBadge, setFormBadge] = useState("Popular");
  const [formImage, setFormImage] = useState("/images/deluxe-room-dressing-table.jpg");
  const [formBeds, setFormBeds] = useState("1 Queen / Double Bed");
  const [formGuests, setFormGuests] = useState("2 Guests");
  const [formPrice, setFormPrice] = useState(1299);
  const [formOriginalPrice, setFormOriginalPrice] = useState(1899);
  const [formPriceNote, setFormPriceNote] = useState("Direct Host Deal • Zero Commission");
  const [formStatus, setFormStatus] = useState("Available Today");
  const [formStatusType, setFormStatusType] = useState<"available" | "limited" | "sold_out">("available");
  const [formAvailableUnits, setFormAvailableUnits] = useState(3);
  const [formTotalUnits, setFormTotalUnits] = useState(4);
  const [formBookedToday, setFormBookedToday] = useState(0);
  const [formAvailabilityText, setFormAvailabilityText] = useState("3 Rooms Available Today");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState(
    "Clean, well-ventilated AC room in Bodhgaya with private attached bathroom, 24/7 hot water geyser, and split air conditioning."
  );
  const [formFeatures, setFormFeatures] = useState<string[]>([
    "Split Air Conditioner",
    "Attached Modern Bath",
    "24/7 Hot Water Geyser",
    "High-Speed Wi-Fi",
  ]);
  const [newFeatureText, setNewFeatureText] = useState("");

  useEffect(() => {
    if (editingRoom) {
      setFormName(editingRoom.name);
      setFormBadge(editingRoom.badge || "Popular");
      setFormImage(editingRoom.image);
      setFormBeds(editingRoom.beds);
      setFormGuests(editingRoom.guests);
      setFormPrice(editingRoom.price);
      setFormOriginalPrice(editingRoom.originalPrice);
      setFormPriceNote(editingRoom.priceNote || "Direct Host Deal");
      setFormStatus(editingRoom.status);
      setFormStatusType(editingRoom.statusType || "available");
      setFormAvailableUnits(editingRoom.availableUnits);
      setFormTotalUnits(editingRoom.totalUnits);
      setFormBookedToday(editingRoom.bookedToday || 0);
      setFormAvailabilityText(editingRoom.availabilityText);
      setFormIsActive(editingRoom.isActive !== false);
      setFormDescription(editingRoom.description);
      setFormFeatures(editingRoom.features || []);
    } else {
      setFormName("");
      setFormBadge("Popular");
      setFormImage("/images/deluxe-room-dressing-table.jpg");
      setFormBeds("1 Queen / Double Bed");
      setFormGuests("2 Guests");
      setFormPrice(1299);
      setFormOriginalPrice(1899);
      setFormPriceNote("Direct Host Deal • Zero Commission");
      setFormStatus("Available Today");
      setFormStatusType("available");
      setFormAvailableUnits(3);
      setFormTotalUnits(4);
      setFormBookedToday(0);
      setFormAvailabilityText("3 Rooms Available Today");
      setFormIsActive(true);
      setFormDescription(
        "Clean, well-ventilated AC room in Bodhgaya with private attached bathroom, 24/7 hot water geyser, and split air conditioning."
      );
      setFormFeatures([
        "Split Air Conditioner",
        "Attached Modern Bath",
        "24/7 Hot Water Geyser",
        "High-Speed Wi-Fi",
      ]);
    }
  }, [editingRoom, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: editingRoom?.id,
      name: formName.trim(),
      badge: formBadge,
      image: formImage,
      beds: formBeds,
      guests: formGuests,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      priceNote: formPriceNote,
      status: formStatus,
      statusType: formStatusType,
      availableUnits: Number(formAvailableUnits),
      totalUnits: Number(formTotalUnits),
      bookedToday: Number(formBookedToday),
      availabilityText: formAvailabilityText || `${formAvailableUnits} Rooms Available Today`,
      isActive: formIsActive,
      description: formDescription,
      features: formFeatures,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
          {editingRoom ? "Edit Room Details" : "Create New Room"}
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
          {editingRoom ? `Edit: ${editingRoom.name}` : "Add New Room Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Room Name & Badge */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Room Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Executive Balcony Suite"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formBadge}
                onChange={(e) => setFormBadge(e.target.value)}
                placeholder="e.g. Most Popular / Family Choice"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Beds & Guests */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Bed Configuration
              </label>
              <input
                type="text"
                value={formBeds}
                onChange={(e) => setFormBeds(e.target.value)}
                placeholder="e.g. 1 King Bed or 2 Single Beds"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Guest Capacity
              </label>
              <input
                type="text"
                value={formGuests}
                onChange={(e) => setFormGuests(e.target.value)}
                placeholder="e.g. 2 Guests or 4 - 6 Guests"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              Tariff &amp; Direct Discount
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Direct Price (₹ / night) *
                </label>
                <input
                  type="number"
                  required
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Original / OTA Price (₹ / night)
                </label>
                <input
                  type="number"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Price Note / Deal Text
              </label>
              <input
                type="text"
                value={formPriceNote}
                onChange={(e) => setFormPriceNote(e.target.value)}
                placeholder="e.g. Direct Host Deal • Zero Commission"
                className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white"
              />
            </div>
          </div>

          {/* Inventory & Status */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
              Live Availability Status &amp; Units
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Available Units
                </label>
                <input
                  type="number"
                  min={0}
                  value={formAvailableUnits}
                  onChange={(e) => setFormAvailableUnits(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Total Units
                </label>
                <input
                  type="number"
                  min={1}
                  value={formTotalUnits}
                  onChange={(e) => setFormTotalUnits(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Booked Today
                </label>
                <input
                  type="number"
                  min={0}
                  value={formBookedToday}
                  onChange={(e) => setFormBookedToday(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Status Label
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormStatus(val);
                    if (val === "Sold Out") setFormStatusType("sold_out");
                    else if (val.includes("High Demand") || val.includes("Limited")) setFormStatusType("limited");
                    else setFormStatusType("available");
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-semibold"
                >
                  <option value="Available Today">Available Today</option>
                  <option value="High Demand">High Demand</option>
                  <option value="Limited Availability">Limited Availability</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Availability Hint Text
                </label>
                <input
                  type="text"
                  value={formAvailabilityText}
                  onChange={(e) => setFormAvailabilityText(e.target.value)}
                  placeholder="e.g. 3 Rooms Available for Tonight"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isActiveCheck"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 border-stone-300"
              />
              <label htmlFor="isActiveCheck" className="text-xs font-semibold text-stone-800 cursor-pointer select-none">
                Active &amp; Published Live on Website
              </label>
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Room Featured Photo Path
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formImage}
                onChange={(e) => setFormImage(e.target.value)}
                placeholder="/images/deluxe-room-dressing-table.jpg"
                className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
            </div>

            {/* Preset quick pick */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[10px] text-stone-500 font-semibold shrink-0">Quick Pick:</span>
              {PRESET_GALLERY_IMAGES.slice(0, 6).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormImage(img)}
                  className={`relative w-10 h-7 rounded border overflow-hidden shrink-0 transition ${
                    formImage === img ? "ring-2 ring-stone-900" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="preset" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Features Tags */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Room Amenities &amp; Features
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formFeatures.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormFeatures(formFeatures.filter((_, i) => i !== idx))
                    }
                    className="text-stone-400 hover:text-rose-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add new feature input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                placeholder="Add custom feature..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newFeatureText.trim() && !formFeatures.includes(newFeatureText.trim())) {
                      setFormFeatures([...formFeatures, newFeatureText.trim()]);
                      setNewFeatureText("");
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newFeatureText.trim() && !formFeatures.includes(newFeatureText.trim())) {
                    setFormFeatures([...formFeatures, newFeatureText.trim()]);
                    setNewFeatureText("");
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-xs font-semibold cursor-pointer"
              >
                + Add
              </button>
            </div>

            {/* Quick Add Presets */}
            <div className="flex flex-wrap gap-1 mt-2">
              {DEFAULT_FEATURE_OPTIONS.filter((f) => !formFeatures.includes(f)).slice(0, 5).map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormFeatures([...formFeatures, f])}
                  className="text-[10px] text-stone-600 bg-stone-50 border border-stone-200 hover:bg-stone-100 px-2 py-0.5 rounded cursor-pointer"
                >
                  + {f}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
            ></textarea>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-stone-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Saving..." : editingRoom ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

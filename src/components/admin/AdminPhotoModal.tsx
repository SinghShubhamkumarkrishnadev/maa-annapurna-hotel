import React, { useState } from "react";
import { PhotoFormData } from "@/types/admin";

interface AdminPhotoModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (formData: PhotoFormData) => void | Promise<void>;
}

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

export default function AdminPhotoModal({
  isOpen,
  isSaving,
  onClose,
  onSave,
}: AdminPhotoModalProps) {
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<"rooms" | "bathrooms" | "exterior">("rooms");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    onSave({
      url: newPhotoUrl.trim(),
      title: newPhotoTitle.trim() || "Maa Annapurna Hotel View",
      category: newPhotoCategory,
      caption: newPhotoCaption.trim() || newPhotoTitle.trim() || "Guest room view at Maa Annapurna Hotel Bodhgaya",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
          Gallery Media
        </span>
        <h2 className="font-serif text-xl font-bold text-stone-900 mt-1">
          Add New Hotel Photo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Photo URL or File Path *
            </label>
            <input
              type="text"
              required
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="/images/deluxe-room-dressing-table.jpg or https://..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          {/* Preset buttons */}
          <div className="space-y-1">
            <span className="text-[10.5px] text-stone-500 font-semibold block">Pick from Hotel Assets:</span>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-stone-50 rounded-lg border border-stone-200">
              {PRESET_GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewPhotoUrl(img)}
                  className="text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200 hover:border-stone-400 truncate max-w-[140px] cursor-pointer"
                >
                  {img.split("/").pop()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Photo Title
            </label>
            <input
              type="text"
              value={newPhotoTitle}
              onChange={(e) => setNewPhotoTitle(e.target.value)}
              placeholder="e.g. Deluxe Double Room Dressing View"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Category
            </label>
            <select
              value={newPhotoCategory}
              onChange={(e) => setNewPhotoCategory(e.target.value as "rooms" | "bathrooms" | "exterior")}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs cursor-pointer"
            >
              <option value="rooms">Rooms &amp; Suites</option>
              <option value="bathrooms">Modern Attached Bathrooms</option>
              <option value="exterior">Hotel Exterior &amp; Front Desk</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Caption / Alt Text
            </label>
            <input
              type="text"
              value={newPhotoCaption}
              onChange={(e) => setNewPhotoCaption(e.target.value)}
              placeholder="Brief description for SEO"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
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
              {isSaving ? "Saving..." : "Save Photo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

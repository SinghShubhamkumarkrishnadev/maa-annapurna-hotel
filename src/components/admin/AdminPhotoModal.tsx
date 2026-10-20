import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PhotoFormData } from "@/types/admin";

interface AdminPhotoModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (formData: PhotoFormData) => void | Promise<void>;
}

const PRESET_GALLERY_IMAGES = [
  "/images/rooms/deluxe-double-main.jpg",
  "/images/rooms/triple-room-main.jpg",
  "/images/rooms/twin-room-main.jpg",
  "/images/rooms/twin-room-angle2.jpg",
  "/images/rooms/family-suite-main.jpg",
  "/images/rooms/family-suite-wide.jpg",
  "/images/rooms/deluxe-detail.jpg",
  "/images/rooms/triple-kitchenette.jpg",
  "/images/rooms/bathroom-modern.jpg",
  "/images/deluxe-room-dressing-table.jpg",
  "/images/room-triple-kitchenette.jpg",
  "/images/room-twin-wooden-paneling.jpg",
  "/images/family-suite-blue-linens.jpg",
  "/images/bathroom-full-view.jpg",
  "/images/bathroom-shower-tiled.jpg",
  "/images/bathroom-wash-basin.jpg",
];

function humanizeFilename(filename: string): string {
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  const clean = withoutExt.replace(/[-_.]+/g, " ").trim();
  return clean
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function AdminPhotoModal({
  isOpen,
  isSaving,
  onClose,
  onSave,
}: AdminPhotoModalProps) {
  const [sourceMode, setSourceMode] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<"rooms" | "bathrooms" | "exterior">("rooms");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl("");
      setNewPhotoUrl("");
      setNewPhotoTitle("");
      setNewPhotoCategory("rooms");
      setNewPhotoCaption("");
      setValidationError("");
      setIsDragOver(false);
      setSourceMode("upload");
    }
  }, [isOpen]);

  // Clean object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setValidationError("Please select a valid image file (JPG, PNG, WEBP, etc.)");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setValidationError("Image file size exceeds 15MB limit.");
      return;
    }

    setValidationError("");
    setSelectedFile(file);

    // Create preview
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Auto-fill title if empty
    if (!newPhotoTitle) {
      const generatedTitle = humanizeFilename(file.name);
      setNewPhotoTitle(generatedTitle);
      if (!newPhotoCaption) {
        setNewPhotoCaption(`${generatedTitle} at Maa Annapurna Hotel Bodhgaya`);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveSelectedFile = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (sourceMode === "upload") {
      if (!selectedFile) {
        setValidationError("Please drag & drop or select an image file from your system.");
        return;
      }
      onSave({
        file: selectedFile,
        title: newPhotoTitle.trim() || humanizeFilename(selectedFile.name) || "Maa Annapurna Hotel View",
        category: newPhotoCategory,
        caption:
          newPhotoCaption.trim() ||
          `${newPhotoTitle.trim() || "Guest view"} at Maa Annapurna Hotel Bodhgaya`,
      });
    } else {
      if (!newPhotoUrl.trim()) {
        setValidationError("Please enter a valid photo URL or path.");
        return;
      }
      onSave({
        url: newPhotoUrl.trim(),
        title: newPhotoTitle.trim() || "Maa Annapurna Hotel View",
        category: newPhotoCategory,
        caption:
          newPhotoCaption.trim() ||
          newPhotoTitle.trim() ||
          "Guest room view at Maa Annapurna Hotel Bodhgaya",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150 my-6">
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Media Manager
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900 mt-1.5">
          Upload Home Stay Photo
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Directly upload raw photos from your device into the gallery.
        </p>

        {/* Source Mode Switcher */}
        <div className="flex p-1 bg-stone-100 rounded-xl mt-4 border border-stone-200">
          <button
            type="button"
            onClick={() => {
              setSourceMode("upload");
              setValidationError("");
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              sourceMode === "upload"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>📁 Direct System Upload</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSourceMode("url");
              setValidationError("");
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              sourceMode === "url"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>🔗 URL / Presets</span>
          </button>
        </div>

        {validationError && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Direct File Upload Mode */}
          {sourceMode === "upload" ? (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Image File (Drag &amp; Drop or Browse) *
              </label>

              {previewUrl && selectedFile ? (
                /* Selected File Preview Box */
                <div className="relative rounded-2xl border-2 border-stone-200 overflow-hidden bg-stone-50 p-2 flex items-center gap-3">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.replace("image/", "").toUpperCase()}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] text-stone-700 hover:text-stone-900 underline font-medium cursor-pointer"
                      >
                        Change file
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveSelectedFile}
                        className="text-[11px] text-rose-600 hover:text-rose-800 underline font-medium cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Drag & Drop Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? "border-amber-600 bg-amber-50/70 scale-[1.01]"
                      : "border-stone-300 hover:border-stone-400 bg-stone-50/60 hover:bg-stone-50"
                  }`}
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xl mb-2.5">
                    📤
                  </div>
                  <p className="text-xs font-bold text-stone-800">
                    {isDragOver ? "Drop image to upload" : "Drag and drop raw image here"}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    or <span className="text-amber-800 font-semibold underline">browse from your computer</span>
                  </p>
                  <p className="text-[10px] text-stone-400 mt-2">
                    Supports JPG, PNG, WEBP, AVIF up to 15MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          ) : (
            /* URL / Presets Mode */
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Photo URL or File Path *
                </label>
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="/images/deluxe-room-dressing-table.jpg or https://..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
                />
              </div>

              {/* Preset buttons */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-stone-500 font-semibold block">Pick from Existing Assets:</span>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 bg-stone-50 rounded-xl border border-stone-200">
                  {PRESET_GALLERY_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setNewPhotoUrl(img);
                        if (!newPhotoTitle) {
                          setNewPhotoTitle(humanizeFilename(img.split("/").pop() || "Photo"));
                        }
                      }}
                      className={`text-[10.5px] px-2 py-0.5 rounded border transition truncate max-w-[150px] cursor-pointer ${
                        newPhotoUrl === img
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {img.split("/").pop()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Photo Metadata */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              value={newPhotoTitle}
              onChange={(e) => setNewPhotoTitle(e.target.value)}
              placeholder="e.g. Deluxe Double Room Dressing View"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Category
            </label>
            <select
              value={newPhotoCategory}
              onChange={(e) => setNewPhotoCategory(e.target.value as "rooms" | "bathrooms" | "exterior")}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs cursor-pointer focus:ring-2 focus:ring-stone-900 bg-white"
            >
              <option value="rooms">🛏️ Rooms &amp; Suites</option>
              <option value="bathrooms">🚿 Modern Attached Bathrooms</option>
              <option value="exterior">🏛️ Exterior &amp; Front Desk</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Caption / SEO Alt Description
            </label>
            <input
              type="text"
              value={newPhotoCaption}
              onChange={(e) => setNewPhotoCaption(e.target.value)}
              placeholder="Brief description for SEO & screen readers"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-stone-900"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading &amp; Saving...</span>
                </>
              ) : (
                <span>Upload &amp; Save Photo</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import Image from "next/image";
import { PhotoItem } from "@/types/admin";

interface AdminPhotosTabProps {
  photos: PhotoItem[];
  onOpenAddPhoto: () => void;
  onCopyPath: (path: string) => void;
  onRequestDeletePhoto: (photo: PhotoItem) => void;
  onUploadPhotos?: (files: File[], category: "rooms" | "bathrooms" | "exterior") => Promise<void>;
  isUploading?: boolean;
}

export default function AdminPhotosTab({
  photos,
  onOpenAddPhoto,
  onCopyPath,
  onRequestDeletePhoto,
  onUploadPhotos,
  isUploading = false,
}: AdminPhotosTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadCategory, setUploadCategory] = useState<"rooms" | "bathrooms" | "exterior">("rooms");

  // Drag & drop upload state
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<{ file: File; preview: string }[]>([]);

  // Drag to delete state
  const [draggedPhoto, setDraggedPhoto] = useState<PhotoItem | null>(null);
  const [isTrashOver, setIsTrashOver] = useState(false);

  // Lightbox preview modal
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter photos
  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory =
      selectedCategory === "all" || photo.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.src.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = {
    all: photos.length,
    rooms: photos.filter((p) => p.category === "rooms").length,
    bathrooms: photos.filter((p) => p.category === "bathrooms").length,
    exterior: photos.filter((p) => p.category === "exterior").length,
  };

  // Handle files selected via drag & drop or file browser
  const handleProcessFiles = (fileList: FileList | File[]) => {
    const newFiles: { file: File; preview: string }[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });

    if (newFiles.length > 0) {
      setStagedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveStagedFile = (index: number) => {
    setStagedFiles((prev) => {
      const target = prev[index];
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleClearStaged = () => {
    stagedFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    setStagedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadStaged = async () => {
    if (!onUploadPhotos || stagedFiles.length === 0) return;
    const filesToUpload = stagedFiles.map((s) => s.file);
    try {
      await onUploadPhotos(filesToUpload, uploadCategory);
      handleClearStaged();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // Drop zone events for file upload
  const handleDropZoneDragOver = (e: React.DragEvent) => {
    // Only activate for external file drops (not photo card drag-to-delete)
    if (draggedPhoto) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDropZoneActive(true);
  };

  const handleDropZoneDragLeave = (e: React.DragEvent) => {
    if (draggedPhoto) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDropZoneActive(false);
  };

  const handleDropZoneDrop = (e: React.DragEvent) => {
    if (draggedPhoto) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDropZoneActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files);
    }
  };

  // Drag-to-delete handlers for photo cards
  const handleCardDragStart = (e: React.DragEvent, photo: PhotoItem) => {
    setDraggedPhoto(photo);
    e.dataTransfer.setData("text/plain", String(photo.id));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleCardDragEnd = () => {
    setDraggedPhoto(null);
    setIsTrashOver(false);
  };

  const handleTrashDragOver = (e: React.DragEvent) => {
    if (!draggedPhoto) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setIsTrashOver(true);
  };

  const handleTrashDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTrashOver(false);
  };

  const handleTrashDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTrashOver(false);

    if (draggedPhoto) {
      const target = draggedPhoto;
      setDraggedPhoto(null);
      onRequestDeletePhoto(target);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Action Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Visual Gallery &amp; Asset Manager ({photos.length})
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Upload raw photos directly from your system or drag &amp; drop to manage hotel media.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition shadow-2xs"
            >
              <span>📁 Browse System Files</span>
            </button>
            <button
              onClick={onOpenAddPhoto}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 transition shadow-2xs"
            >
              <span>+ Add Single Photo</span>
            </button>
          </div>
        </div>

        {/* Interactive Drag & Drop Upload Zone */}
        <div
          onDragOver={handleDropZoneDragOver}
          onDragLeave={handleDropZoneDragLeave}
          onDrop={handleDropZoneDrop}
          className={`relative border-2 border-dashed rounded-2xl p-5 sm:p-6 transition-all ${
            isDropZoneActive
              ? "border-emerald-600 bg-emerald-50/70 scale-[1.005] shadow-md"
              : "border-stone-300 hover:border-amber-400 bg-stone-50/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleProcessFiles(e.target.files);
              }
            }}
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3.5 cursor-pointer select-none text-left"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition shrink-0 ${
                  isDropZoneActive
                    ? "bg-emerald-600 text-white animate-bounce"
                    : "bg-white text-stone-700 border border-stone-200 shadow-xs"
                }`}
              >
                📥
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-stone-900">
                  {isDropZoneActive
                    ? "Release raw images to stage for upload"
                    : "Drag & Drop raw images here from your computer"}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Supports multiple files (JPG, PNG, WEBP, AVIF). Direct upload without typing paths.
                </p>
              </div>
            </div>

            {/* Default Category for Staged Uploads */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs shrink-0">
              <span className="text-[11px] font-semibold text-stone-600">Assign To:</span>
              <select
                value={uploadCategory}
                onChange={(e) =>
                  setUploadCategory(e.target.value as "rooms" | "bathrooms" | "exterior")
                }
                className="text-xs font-bold text-stone-800 bg-transparent border-0 cursor-pointer focus:ring-0 outline-hidden"
              >
                <option value="rooms">🛏️ Rooms &amp; Suites</option>
                <option value="bathrooms">🚿 Bathrooms</option>
                <option value="exterior">🏛️ Exterior &amp; Desk</option>
              </select>
            </div>
          </div>

          {/* Staged Files Tray */}
          {stagedFiles.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-200/80 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <span>Staged for Direct Upload ({stagedFiles.length} files)</span>
                  <span className="text-[10.5px] font-normal text-stone-500">
                    Category: <strong className="capitalize">{uploadCategory}</strong>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleClearStaged}
                  disabled={isUploading}
                  className="text-[11px] text-stone-500 hover:text-stone-800 underline font-medium cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto p-1">
                {stagedFiles.map((staged, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-stone-300 bg-white aspect-[4/3] shadow-2xs"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={staged.preview}
                      alt={staged.file.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-1">
                      <button
                        type="button"
                        onClick={() => handleRemoveStagedFile(idx)}
                        className="bg-rose-600 hover:bg-rose-700 text-white p-1 rounded-full text-[10px] cursor-pointer shadow-xs"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[9px] px-1 py-0.5 truncate text-center backdrop-blur-xs">
                      {staged.file.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClearStaged}
                  disabled={isUploading}
                  className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadStaged}
                  disabled={isUploading}
                  className="px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading {stagedFiles.length} photo(s)...</span>
                    </>
                  ) : (
                    <span>Upload {stagedFiles.length} Photo(s) Directly</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drag to Delete Trash Bin Zone */}
        <div
          onDragOver={handleTrashDragOver}
          onDragLeave={handleTrashDragLeave}
          onDrop={handleTrashDrop}
          className={`border-2 border-dashed rounded-2xl p-3.5 text-center transition-all flex items-center justify-center gap-3 ${
            draggedPhoto
              ? isTrashOver
                ? "border-rose-600 bg-rose-100 text-rose-900 scale-[1.02] shadow-lg animate-pulse"
                : "border-rose-400 bg-rose-50/70 text-rose-800 shadow-sm"
              : "border-stone-200 bg-stone-50/40 text-stone-400 hover:border-stone-300"
          }`}
        >
          <span className={`text-xl transition-transform ${draggedPhoto ? "scale-125" : ""}`}>
            🗑️
          </span>
          <div className="text-left">
            <p className="text-xs font-bold">
              {draggedPhoto
                ? isTrashOver
                  ? `Release to permanently delete "${draggedPhoto.title}"`
                  : `Drop "${draggedPhoto.title}" here to Delete`
                : "Drag & Drop to Delete Zone"}
            </p>
            <p className="text-[10.5px]">
              {draggedPhoto
                ? "Drop on this bin to remove the photo from gallery & database"
                : "Drag any photo card below into this zone to instantly delete it, or use the card's delete button"}
            </p>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Photos", count: categoryCounts.all },
              { id: "rooms", label: "Rooms & Suites", count: categoryCounts.rooms },
              { id: "bathrooms", label: "Bathrooms", count: categoryCounts.bathrooms },
              { id: "exterior", label: "Exterior", count: categoryCounts.exterior },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-stone-900 text-white shadow-2xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? "bg-stone-700 text-stone-200" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or file name..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:ring-2 focus:ring-stone-900 outline-hidden"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
          <span className="text-3xl block mb-2">🖼️</span>
          <h4 className="font-serif text-base font-bold text-stone-900">
            No Photos Found
          </h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No images matched "${searchQuery}". Try a different keyword.`
              : "No photos in this category. Drag and drop raw images above to add some."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => {
            const isBeingDragged = draggedPhoto?.id === photo.id;
            return (
              <div
                key={photo.id}
                draggable={true}
                onDragStart={(e) => handleCardDragStart(e, photo)}
                onDragEnd={handleCardDragEnd}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs group flex flex-col justify-between cursor-grab active:cursor-grabbing ${
                  isBeingDragged
                    ? "opacity-40 scale-95 border-rose-400 ring-2 ring-rose-400"
                    : "border-stone-200 hover:border-stone-400 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt || photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Drag Grip Handle Pill */}
                  <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shadow-xs opacity-90 group-hover:opacity-100">
                    <span className="tracking-tighter">⋮⋮</span>
                    <span>Drag to Delete</span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-2 left-2 bg-amber-950/85 backdrop-blur-xs text-amber-200 text-[10px] px-2 py-0.5 rounded-full font-medium capitalize shadow-xs">
                    {photo.category}
                  </span>

                  {/* Click to preview overlay */}
                  <div
                    onClick={() => setPreviewPhoto(photo)}
                    className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <span className="bg-white/95 text-stone-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      🔍 Preview
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h4
                      className="font-medium text-xs text-stone-900 line-clamp-1 group-hover:text-amber-900"
                      title={photo.title}
                    >
                      {photo.title}
                    </h4>
                    <p
                      className="text-[10px] text-stone-400 font-mono truncate mt-0.5"
                      title={photo.src}
                    >
                      {photo.src}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onCopyPath(photo.src)}
                      className="text-[10.5px] text-stone-600 hover:text-stone-900 font-semibold cursor-pointer hover:underline"
                    >
                      Copy Path
                    </button>

                    <button
                      type="button"
                      onClick={() => onRequestDeletePhoto(photo)}
                      className="text-[10.5px] text-rose-600 hover:text-rose-800 font-bold cursor-pointer hover:underline flex items-center gap-1"
                    >
                      <span>🗑️ Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Preview Lightbox Modal */}
      {previewPhoto && (
        <div
          onClick={() => setPreviewPhoto(null)}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-300 relative animate-in zoom-in-95 duration-150"
          >
            <div className="relative aspect-[16/10] w-full bg-stone-900">
              <Image
                src={previewPhoto.src}
                alt={previewPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Category: {previewPhoto.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                  {previewPhoto.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {previewPhoto.caption || previewPhoto.alt}
                </p>
                <p className="text-[10.5px] text-stone-400 font-mono mt-1 select-all">
                  {previewPhoto.src}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onCopyPath(previewPhoto.src);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Copy URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = previewPhoto;
                    setPreviewPhoto(null);
                    onRequestDeletePhoto(target);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                >
                  Delete Photo
                </button>
              </div>
            </div>
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 bg-stone-900/70 hover:bg-stone-900 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

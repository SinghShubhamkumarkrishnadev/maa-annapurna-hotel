import React from "react";
import Image from "next/image";
import { PhotoItem } from "@/types/admin";

interface AdminPhotosTabProps {
  photos: PhotoItem[];
  onOpenAddPhoto: () => void;
  onCopyPath: (path: string) => void;
  onRequestDeletePhoto: (photo: PhotoItem) => void;
}

export default function AdminPhotosTab({
  photos,
  onOpenAddPhoto,
  onCopyPath,
  onRequestDeletePhoto,
}: AdminPhotosTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200">
        <div>
          <h3 className="font-serif text-base font-bold text-stone-900">
            Home Stay Gallery Photos ({photos.length})
          </h3>
          <p className="text-xs text-stone-500">
            Photos displayed on the public visual tour and available for room assignment.
          </p>
        </div>
        <button
          onClick={onOpenAddPhoto}
          className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer"
        >
          + Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs group flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full bg-stone-100">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded font-medium capitalize">
                {photo.category}
              </span>
            </div>

            <div className="p-3">
              <h4 className="font-medium text-xs text-stone-900 line-clamp-1" title={photo.title}>
                {photo.title}
              </h4>
              <p className="text-[10.5px] text-stone-500 line-clamp-1 mt-0.5">
                {photo.src}
              </p>

              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onCopyPath(photo.src)}
                  className="text-[10px] text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                >
                  Copy Path
                </button>

                <button
                  onClick={() => onRequestDeletePhoto(photo)}
                  className="text-[10px] text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

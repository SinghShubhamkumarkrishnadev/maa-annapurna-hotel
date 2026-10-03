import React from "react";
import { DeleteModalConfig } from "@/types/admin";

interface AdminDeleteModalProps {
  config: DeleteModalConfig | null;
}

export default function AdminDeleteModal({ config }: AdminDeleteModalProps) {
  if (!config || !config.isOpen) return null;

  const {
    title,
    message,
    confirmLabel = "Delete",
    isProcessing = false,
    onConfirm,
    onCancel,
  } = config;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-rose-200 animate-in zoom-in-95 duration-150 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto">
          🗑️
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            {title}
          </h3>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

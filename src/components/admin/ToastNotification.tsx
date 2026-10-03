import React from "react";
import { ToastNotificationState } from "@/types/admin";

interface ToastNotificationProps {
  toast: ToastNotificationState | null;
}

export default function ToastNotification({ toast }: ToastNotificationProps) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border animate-in slide-in-from-top-2 duration-150 ${
        toast.type === "error"
          ? "bg-rose-900 text-white border-rose-700"
          : "bg-stone-900 text-white border-stone-800"
      }`}
    >
      <span>{toast.type === "error" ? "⚠️" : "✅"}</span>
      <span>{toast.text}</span>
    </div>
  );
}

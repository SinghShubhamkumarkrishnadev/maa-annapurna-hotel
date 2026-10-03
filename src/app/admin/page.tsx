"use client";

import React, { useState } from "react";
import { AdminTab, RoomItem, PhotoItem, ReviewItem, RoomFormData, PhotoFormData, DeleteModalConfig, QuickRoomUpdate } from "@/types/admin";
import { useToast } from "@/hooks/useToast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { roomService } from "@/services/roomService";
import { photoService } from "@/services/photoService";
import { reviewService } from "@/services/reviewService";

import ToastNotification from "@/components/admin/ToastNotification";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import AdminTabsNav from "@/components/admin/AdminTabsNav";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminRoomsTab from "@/components/admin/AdminRoomsTab";
import AdminRoomModal from "@/components/admin/AdminRoomModal";
import AdminPricingTab from "@/components/admin/AdminPricingTab";
import AdminPhotosTab from "@/components/admin/AdminPhotosTab";
import AdminPhotoModal from "@/components/admin/AdminPhotoModal";
import AdminReviewsTab from "@/components/admin/AdminReviewsTab";
import AdminDeleteModal from "@/components/admin/AdminDeleteModal";

export default function AdminPage() {
  const { toast, showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>("rooms");

  // Authentication Hook (SRP)
  const auth = useAdminAuth(
    () => showToast("Welcome to Maa Annapurna Host Admin!"),
    () => showToast("Logged out successfully")
  );

  // Data Fetching Hook (SRP / DIP)
  const {
    rooms,
    setRooms,
    photos,
    setPhotos,
    reviews,
    setReviews,
    isLoading,
    refreshData,
  } = useAdminData(!!auth.isAuthenticated, (errMsg) => showToast(errMsg, "error"));

  // Modals & Forms State
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomItem | null>(null);
  const [isSavingRoom, setIsSavingRoom] = useState(false);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);

  const [deleteModalConfig, setDeleteModalConfig] = useState<DeleteModalConfig | null>(null);

  // Show authentication screen if not logged in
  if (auth.isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 text-stone-400 text-xs">
        Checking authentication...
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <AdminLoginForm
        usernameInput={auth.usernameInput}
        setUsernameInput={auth.setUsernameInput}
        passwordInput={auth.passwordInput}
        setPasswordInput={auth.setPasswordInput}
        showPassword={auth.showPassword}
        setShowPassword={auth.setShowPassword}
        loginError={auth.loginError}
        isLoggingIn={auth.isLoggingIn}
        onSubmit={auth.login}
      />
    );
  }

  // Room Actions
  const handleOpenAddRoom = () => {
    setEditingRoom(null);
    setIsRoomModalOpen(true);
  };

  const handleOpenEditRoom = (room: RoomItem) => {
    setEditingRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleSaveRoom = async (formData: RoomFormData) => {
    setIsSavingRoom(true);
    try {
      if (formData.id) {
        const updated = await roomService.updateRoom(formData.id, formData);
        setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
        showToast("Room updated successfully!");
      } else {
        const created = await roomService.createRoom(formData);
        setRooms((prev) => [created, ...prev]);
        showToast("Room created successfully!");
      }
      setIsRoomModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save room";
      showToast(msg, "error");
    } finally {
      setIsSavingRoom(false);
    }
  };

  const handleToggleRoomActive = async (room: RoomItem) => {
    try {
      const updated = await roomService.toggleActive(room);
      setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      showToast(updated.isActive ? "Room published live!" : "Room hidden from website.");
    } catch {
      showToast("Failed to update room visibility", "error");
    }
  };

  const handleQuickUpdate = async (id: string, updates: QuickRoomUpdate) => {
    try {
      const updated = await roomService.quickUpdate(id, updates);
      setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      showToast("Quick rate updated successfully!");
    } catch {
      showToast("Failed to update rate", "error");
    }
  };

  const onRequestDeleteRoom = (room: RoomItem) => {
    setDeleteModalConfig({
      isOpen: true,
      title: `Delete ${room.name}?`,
      message: `Are you sure you want to delete "${room.name}"? This action cannot be reversed.`,
      confirmLabel: "Delete Room",
      onCancel: () => setDeleteModalConfig(null),
      onConfirm: async () => {
        try {
          await roomService.deleteRoom(room.id);
          setRooms((prev) => prev.filter((r) => r.id !== room.id));
          showToast(`Room "${room.name}" deleted successfully.`);
        } catch {
          showToast("Failed to delete room", "error");
        } finally {
          setDeleteModalConfig(null);
        }
      },
    });
  };

  // Photo Actions
  const handleSavePhoto = async (formData: PhotoFormData) => {
    setIsSavingPhoto(true);
    try {
      const photo = await photoService.addPhoto(formData);
      setPhotos((prev) => [...prev, photo]);
      showToast("Photo added to gallery successfully!");
      setIsPhotoModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add photo";
      showToast(msg, "error");
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const onRequestDeletePhoto = (photo: PhotoItem) => {
    setDeleteModalConfig({
      isOpen: true,
      title: "Delete Photo?",
      message: `Are you sure you want to delete "${photo.title}" from the gallery?`,
      confirmLabel: "Delete Photo",
      onCancel: () => setDeleteModalConfig(null),
      onConfirm: async () => {
        try {
          await photoService.deletePhoto(photo.id);
          setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
          showToast("Photo deleted successfully.");
        } catch {
          showToast("Failed to delete photo", "error");
        } finally {
          setDeleteModalConfig(null);
        }
      },
    });
  };

  // Review Actions
  const onRequestDeleteReview = (review: ReviewItem) => {
    setDeleteModalConfig({
      isOpen: true,
      title: `Delete Review by "${review.name}"?`,
      message: `Are you sure you want to permanently delete this review? This action cannot be undone.`,
      confirmLabel: "Delete Review",
      onCancel: () => setDeleteModalConfig(null),
      onConfirm: async () => {
        try {
          await reviewService.deleteReview(review.id);
          setReviews((prev) => prev.filter((r) => r.id !== review.id));
          showToast(`Review by ${review.name} deleted.`);
          refreshData();
        } catch {
          showToast("Failed to delete review", "error");
        } finally {
          setDeleteModalConfig(null);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans">
      <ToastNotification toast={toast} />
      <AdminHeader onLogout={auth.logout} />

      <main className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <AdminStats rooms={rooms} reviews={reviews} />

        <AdminTabsNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          roomsCount={rooms.length}
          photosCount={photos.length}
          reviewsCount={reviews.length}
          onOpenAddRoom={handleOpenAddRoom}
          onOpenAddPhoto={() => setIsPhotoModalOpen(true)}
        />

        {activeTab === "rooms" && (
          <AdminRoomsTab
            rooms={rooms}
            isLoading={isLoading}
            onOpenAddRoom={handleOpenAddRoom}
            onOpenEditRoom={handleOpenEditRoom}
            onToggleActive={handleToggleRoomActive}
            onRequestDeleteRoom={onRequestDeleteRoom}
          />
        )}

        {activeTab === "quick-pricing" && (
          <AdminPricingTab
            rooms={rooms}
            onQuickUpdate={handleQuickUpdate}
            onToggleActive={handleToggleRoomActive}
          />
        )}

        {activeTab === "photos" && (
          <AdminPhotosTab
            photos={photos}
            onOpenAddPhoto={() => setIsPhotoModalOpen(true)}
            onCopyPath={(path) => {
              navigator.clipboard.writeText(path);
              showToast("Photo path copied!");
            }}
            onRequestDeletePhoto={onRequestDeletePhoto}
          />
        )}

        {activeTab === "reviews" && (
          <AdminReviewsTab
            reviews={reviews}
            isLoading={isLoading}
            onRequestDeleteReview={onRequestDeleteReview}
          />
        )}
      </main>

      {/* Modals */}
      <AdminRoomModal
        isOpen={isRoomModalOpen}
        editingRoom={editingRoom}
        isSaving={isSavingRoom}
        onClose={() => setIsRoomModalOpen(false)}
        onSave={handleSaveRoom}
      />

      <AdminPhotoModal
        isOpen={isPhotoModalOpen}
        isSaving={isSavingPhoto}
        onClose={() => setIsPhotoModalOpen(false)}
        onSave={handleSavePhoto}
      />

      <AdminDeleteModal config={deleteModalConfig} />
    </div>
  );
}

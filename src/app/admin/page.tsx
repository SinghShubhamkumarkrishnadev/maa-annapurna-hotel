"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomItem, PhotoItem } from "@/lib/data";

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

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<"rooms" | "quick-pricing" | "photos">("rooms");

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Room editor modal state
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomItem | null>(null);
  const [isSavingRoom, setIsSavingRoom] = useState(false);

  // Photo modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<"rooms" | "bathrooms" | "exterior">("rooms");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);

  // Room Form State
  const [formName, setFormName] = useState("");
  const [formBadge, setFormBadge] = useState("Most Popular");
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
  const [formBookedToday, setFormBookedToday] = useState(1);
  const [formAvailabilityText, setFormAvailabilityText] = useState("3 Rooms Available Today");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState("");
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState("");

  const showToast = useCallback((text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        setIsAuthenticated(!!data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch rooms and photos
  const fetchData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [roomsRes, photosRes] = await Promise.all([
        fetch("/api/admin/rooms"),
        fetch("/api/admin/photos"),
      ]);
      const roomsData = await roomsRes.json();
      const photosData = await photosRes.json();

      if (roomsData.success && Array.isArray(roomsData.rooms)) {
        setRooms(roomsData.rooms);
      }
      if (photosData.success && Array.isArray(photosData.photos)) {
        setPhotos(photosData.photos);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
      showToast("Failed to load inventory data", "error");
    } finally {
      setIsLoadingData(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        showToast("Welcome to Maa Annapurna Host Admin!");
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setUsernameInput("");
      setPasswordInput("");
      showToast("Logged out successfully");
    } catch {
      setIsAuthenticated(false);
    }
  };

  // Open Room Editor
  const openAddRoomModal = () => {
    setEditingRoom(null);
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
    setIsRoomModalOpen(true);
  };

  const openEditRoomModal = (room: RoomItem) => {
    setEditingRoom(room);
    setFormName(room.name);
    setFormBadge(room.badge || "Popular");
    setFormImage(room.image);
    setFormBeds(room.beds);
    setFormGuests(room.guests);
    setFormPrice(room.price);
    setFormOriginalPrice(room.originalPrice);
    setFormPriceNote(room.priceNote || "Direct Host Deal");
    setFormStatus(room.status);
    setFormStatusType(room.statusType || "available");
    setFormAvailableUnits(room.availableUnits);
    setFormTotalUnits(room.totalUnits);
    setFormBookedToday(room.bookedToday || 0);
    setFormAvailabilityText(room.availabilityText);
    setFormIsActive(room.isActive !== false);
    setFormDescription(room.description);
    setFormFeatures(room.features || []);
    setIsRoomModalOpen(true);
  };

  // Save Room (Create or Update)
  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("Please enter a room name", "error");
      return;
    }

    setIsSavingRoom(true);

    const discountCalculated = `${Math.max(
      0,
      Math.round(((formOriginalPrice - formPrice) / (formOriginalPrice || 1)) * 100)
    )}% OFF`;

    const payload = {
      id: editingRoom ? editingRoom.id : undefined,
      name: formName.trim(),
      badge: formBadge,
      image: formImage,
      beds: formBeds,
      guests: formGuests,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      discount: discountCalculated,
      priceNote: formPriceNote,
      status: formStatus,
      statusType: formStatusType,
      availableUnits: Number(formAvailableUnits),
      totalUnits: Number(formTotalUnits),
      bookedToday: Number(formBookedToday),
      availabilityText: formAvailabilityText || `${formAvailableUnits} Rooms Available Today`,
      isAvailable: formStatusType !== "sold_out" && formAvailableUnits > 0,
      isActive: formIsActive,
      features: formFeatures,
      description: formDescription,
      alt: `${formName.trim()} at Maa Annapurna Hotel Bodhgaya`,
    };

    try {
      const res = await fetch("/api/admin/rooms", {
        method: editingRoom ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingRoom ? "Room updated successfully!" : "New room added successfully!");
        setIsRoomModalOpen(false);
        fetchData();
      } else {
        showToast(data.error || "Failed to save room", "error");
      }
    } catch {
      showToast("Network error while saving room", "error");
    } finally {
      setIsSavingRoom(false);
    }
  };

  // Delete Room
  const handleDeleteRoom = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/rooms?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Room "${name}" removed`);
        fetchData();
      } else {
        showToast(data.error || "Failed to delete room", "error");
      }
    } catch {
      showToast("Network error deleting room", "error");
    }
  };

  // Quick Toggle Active Status
  const handleToggleRoomActive = async (room: RoomItem) => {
    const updatedStatus = !room.isActive;
    try {
      const res = await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: room.id, isActive: updatedStatus }),
      });
      if (res.ok) {
        showToast(`${room.name} is now ${updatedStatus ? "Live" : "Hidden"}`);
        setRooms((prev) =>
          prev.map((r) => (r.id === room.id ? { ...r, isActive: updatedStatus } : r))
        );
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // Quick Update Price & Units
  const handleQuickUpdate = async (
    roomId: string,
    updates: Partial<RoomItem>
  ) => {
    try {
      const res = await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomId, ...updates }),
      });
      if (res.ok) {
        showToast("Updated successfully");
        setRooms((prev) =>
          prev.map((r) => (r.id === roomId ? { ...r, ...updates } : r))
        );
      }
    } catch {
      showToast("Failed to update", "error");
    }
  };

  // Add Photo
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) {
      showToast("Please provide an image URL or choose a preset", "error");
      return;
    }

    setIsSavingPhoto(true);
    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: newPhotoUrl.trim(),
          title: newPhotoTitle.trim() || "Guest Room at Maa Annapurna Hotel",
          category: newPhotoCategory,
          caption: newPhotoCaption.trim() || newPhotoTitle.trim() || "Maa Annapurna Hotel Bodhgaya",
          alt: newPhotoTitle.trim() || "Photo at Maa Annapurna Hotel Bodhgaya",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Photo added to gallery!");
        setIsPhotoModalOpen(false);
        setNewPhotoUrl("");
        setNewPhotoTitle("");
        setNewPhotoCaption("");
        fetchData();
      } else {
        showToast(data.error || "Failed to add photo", "error");
      }
    } catch {
      showToast("Error adding photo", "error");
    } finally {
      setIsSavingPhoto(false);
    }
  };

  // Delete Photo
  const handleDeletePhoto = async (id: number) => {
    if (!window.confirm("Delete this photo from gallery?")) return;

    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Photo deleted");
        fetchData();
      } else {
        showToast(data.error || "Failed to delete photo", "error");
      }
    } catch {
      showToast("Error deleting photo", "error");
    }
  };

  // Loading Screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-800 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-stone-600">Verifying secure host session...</span>
        </div>
      </div>
    );
  }

  // Login Screen (Unauthenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/40 flex items-center justify-center p-4 text-stone-100">
        <div className="w-full max-w-md bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold tracking-wider uppercase mb-2">
              🔒 Secure Host Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Maa Annapurna Hotel
            </h1>
            <p className="text-stone-400 text-xs mt-1">
              Admin &amp; Front Desk Management System
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Log In to Host Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white transition flex items-center justify-center gap-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Total statistics for summary
  const activeRoomsCount = rooms.filter((r) => r.isActive !== false).length;
  const totalAvailableUnits = rooms.reduce((acc, r) => acc + (r.availableUnits || 0), 0);
  const totalBookedToday = rooms.reduce((acc, r) => acc + (r.bookedToday || 0), 0);

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border animate-in slide-in-from-top-2 duration-150 ${
            toastMessage.type === "error"
              ? "bg-rose-900 text-white border-rose-700"
              : "bg-stone-900 text-white border-stone-800"
          }`}
        >
          <span>{toastMessage.type === "error" ? "⚠️" : "✅"}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-2xs">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-serif font-bold text-sm">
              MA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-stone-900 leading-none">
                  Maa Annapurna Hotel
                </h1>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Host Admin
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Bodhgaya Live Inventory &amp; Tariff Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition border border-rose-200 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Total Categories
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-2xl font-bold text-stone-900">{rooms.length}</span>
              <span className="text-xs text-emerald-700 font-semibold">{activeRoomsCount} Live</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Rooms Available Today
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-2xl font-bold text-emerald-700">
                {totalAvailableUnits}
              </span>
              <span className="text-xs text-stone-500 font-medium">Ready for guests</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Booked Today
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-2xl font-bold text-amber-700">
                {totalBookedToday}
              </span>
              <span className="text-xs text-amber-800 font-medium">Reserved</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Tariff Range
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                ₹1,199 – ₹2,499
              </span>
              <span className="text-xs text-stone-500">per night</span>
            </div>
          </div>
        </div>

        {/* Tab Controls & Add Room Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("rooms")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "rooms"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <span>🛏️ Rooms &amp; Suites</span>
              <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded-full">
                {rooms.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("quick-pricing")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "quick-pricing"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <span>⚡ Fast Rate &amp; Inventory Editor</span>
            </button>

            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "photos"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <span>📸 Photos &amp; Gallery</span>
              <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded-full">
                {photos.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "rooms" && (
              <button
                onClick={openAddRoomModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Add New Room</span>
              </button>
            )}

            {activeTab === "photos" && (
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Add Gallery Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: Rooms Management */}
        {activeTab === "rooms" && (
          <div className="space-y-4">
            {isLoadingData ? (
              <div className="py-12 text-center text-xs text-stone-500">
                Loading room inventory...
              </div>
            ) : rooms.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <span className="text-3xl block mb-2">🛏️</span>
                <h3 className="font-serif text-lg font-bold text-stone-900">No Rooms Added Yet</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Click the &quot;+ Add New Room&quot; button to create your first room category with pricing and photos.
                </p>
                <button
                  onClick={openAddRoomModal}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  + Add First Room
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden flex flex-col justify-between ${
                      room.isActive ? "border-stone-200" : "border-stone-300 opacity-60 bg-stone-50/70"
                    }`}
                  >
                    <div>
                      {/* Thumbnail & Badges */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-stone-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          {room.badge || "Room"}
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span
                            className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                              room.isActive
                                ? "bg-emerald-600 text-white"
                                : "bg-stone-700 text-stone-200"
                            }`}
                          >
                            {room.isActive ? "Live" : "Hidden"}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 right-3 bg-stone-950/80 backdrop-blur text-white text-[11px] px-2.5 py-0.5 rounded-full">
                          {room.guests}
                        </div>
                      </div>

                      {/* Room Card Body */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-serif text-lg font-bold text-stone-900">
                              {room.name}
                            </h3>
                            <p className="text-xs text-stone-500 mt-0.5">
                              🛏️ {room.beds}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-baseline gap-1 justify-end">
                              <span className="text-[11px] text-stone-400 line-through">
                                ₹{room.originalPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="font-serif text-xl font-bold text-stone-900">
                                ₹{room.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {room.discount}
                            </span>
                          </div>
                        </div>

                        {/* Availability Pill & Inventory Status */}
                        <div
                          className={`mt-3 p-2.5 rounded-xl border text-xs ${
                            room.statusType === "available"
                              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                              : "bg-amber-50/80 border-amber-200 text-amber-950"
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  room.statusType === "available"
                                    ? "bg-emerald-500 animate-pulse"
                                    : "bg-amber-500 animate-pulse"
                                }`}
                              ></span>
                              <span>{room.status}</span>
                            </span>
                            <span className="text-[10.5px] bg-white px-2 py-0.5 rounded border border-stone-200">
                              {room.bookedToday} Booked
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-stone-600 mt-1.5 font-medium">
                            <span>
                              <strong>{room.availableUnits}</strong> of {room.totalUnits} available
                            </span>
                            <span className="text-stone-500">{room.availabilityText}</span>
                          </div>
                        </div>

                        {/* Features Tags Preview */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {(room.features || []).slice(0, 3).map((feat, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                          {(room.features || []).length > 3 && (
                            <span className="text-[10px] text-stone-400 self-center">
                              +{room.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-5 py-3.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleRoomActive(room)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition border cursor-pointer ${
                          room.isActive
                            ? "bg-stone-200 text-stone-800 border-stone-300 hover:bg-stone-300"
                            : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                        }`}
                      >
                        {room.isActive ? "Hide from Site" : "Publish Live"}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditRoomModal(room)}
                          className="text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded-lg transition shadow-2xs cursor-pointer"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id, room.name)}
                          className="text-xs text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          title="Delete room"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Quick Pricing & Inventory Editor */}
        {activeTab === "quick-pricing" && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200 bg-stone-50/70">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Fast Live Rate &amp; Inventory Adjuster
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Quickly adjust tonight&apos;s rates and room inventory counts in one click. Changes save directly to the live website.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100/80 text-stone-600 uppercase font-semibold text-[10.5px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Room Category</th>
                    <th className="py-3 px-4">Direct Rate (₹)</th>
                    <th className="py-3 px-4">OTA Price (₹)</th>
                    <th className="py-3 px-4">Available Units</th>
                    <th className="py-3 px-4">Booked Today</th>
                    <th className="py-3 px-4">Status Tag</th>
                    <th className="py-3 px-4">Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-stone-50/50 transition">
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        {room.name}
                        <span className="block text-[10.5px] text-stone-500 font-normal">
                          {room.beds}
                        </span>
                      </td>

                      {/* Direct Price Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-stone-400 font-bold">₹</span>
                          <input
                            type="number"
                            defaultValue={room.price}
                            onBlur={(e) => {
                              const newPrice = Number(e.target.value);
                              if (newPrice > 0 && newPrice !== room.price) {
                                handleQuickUpdate(room.id, { price: newPrice });
                              }
                            }}
                            className="w-24 px-2 py-1 rounded border border-stone-300 font-bold text-stone-900 focus:ring-1 focus:ring-stone-900"
                          />
                        </div>
                      </td>

                      {/* OTA Price Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-stone-400">₹</span>
                          <input
                            type="number"
                            defaultValue={room.originalPrice}
                            onBlur={(e) => {
                              const newOta = Number(e.target.value);
                              if (newOta > 0 && newOta !== room.originalPrice) {
                                handleQuickUpdate(room.id, { originalPrice: newOta });
                              }
                            }}
                            className="w-24 px-2 py-1 rounded border border-stone-200 text-stone-500"
                          />
                        </div>
                      </td>

                      {/* Available Units Counter */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              handleQuickUpdate(room.id, {
                                availableUnits: Math.max(0, room.availableUnits - 1),
                              })
                            }
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-stone-900">
                            {room.availableUnits}
                          </span>
                          <button
                            onClick={() =>
                              handleQuickUpdate(room.id, {
                                availableUnits: room.availableUnits + 1,
                              })
                            }
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Booked Today Counter */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              handleQuickUpdate(room.id, {
                                bookedToday: Math.max(0, (room.bookedToday || 0) - 1),
                              })
                            }
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-stone-900">
                            {room.bookedToday || 0}
                          </span>
                          <button
                            onClick={() =>
                              handleQuickUpdate(room.id, {
                                bookedToday: (room.bookedToday || 0) + 1,
                              })
                            }
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Status Tag Select */}
                      <td className="py-3.5 px-4">
                        <select
                          value={room.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            const newType =
                              newStatus === "Sold Out"
                                ? "sold_out"
                                : newStatus.includes("High Demand") || newStatus.includes("Limited")
                                ? "limited"
                                : "available";
                            handleQuickUpdate(room.id, {
                              status: newStatus,
                              statusType: newType,
                            });
                          }}
                          className="px-2 py-1 rounded border border-stone-300 font-medium text-xs bg-white"
                        >
                          <option value="Available Today">Available Today</option>
                          <option value="High Demand">High Demand</option>
                          <option value="Limited Availability">Limited Availability</option>
                          <option value="Sold Out">Sold Out</option>
                        </select>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleRoomActive(room)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-md transition cursor-pointer ${
                            room.isActive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-stone-200 text-stone-600"
                          }`}
                        >
                          {room.isActive ? "● Live" : "○ Hidden"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Photos & Gallery */}
        {activeTab === "photos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Hotel Gallery Photos ({photos.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Photos displayed on the public visual tour and available for room assignment.
                </p>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
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
                        onClick={() => {
                          navigator.clipboard.writeText(photo.src);
                          showToast("Photo path copied!");
                        }}
                        className="text-[10px] text-stone-600 hover:text-stone-900 font-medium"
                      >
                        Copy Path
                      </button>

                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
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
        )}
      </main>

      {/* MODAL 1: Add / Edit Room */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsRoomModalOpen(false)}
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

            <form onSubmit={handleSaveRoom} className="space-y-4 mt-6">
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
                    className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-xs font-semibold"
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
                      className="text-[10px] text-stone-600 bg-stone-50 border border-stone-200 hover:bg-stone-100 px-2 py-0.5 rounded"
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
                  onClick={() => setIsRoomModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingRoom}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs disabled:opacity-50"
                >
                  {isSavingRoom ? "Saving..." : editingRoom ? "Update Room" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Photo to Gallery */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition"
            >
              ✕
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Gallery Media
            </span>
            <h2 className="font-serif text-xl font-bold text-stone-900 mt-1">
              Add New Hotel Photo
            </h2>

            <form onSubmit={handleAddPhoto} className="space-y-3.5 mt-5">
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
                      className="text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200 hover:border-stone-400 truncate max-w-[140px]"
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
                  placeholder="e.g. Deluxe Room with Balcony View"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) =>
                    setNewPhotoCategory(e.target.value as "rooms" | "bathrooms" | "exterior")
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                >
                  <option value="rooms">Bedrooms &amp; Suites</option>
                  <option value="bathrooms">Bathrooms &amp; Vanity</option>
                  <option value="exterior">Building &amp; Exterior</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  placeholder="Short description for guests"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPhoto}
                  className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  {isSavingPhoto ? "Adding..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

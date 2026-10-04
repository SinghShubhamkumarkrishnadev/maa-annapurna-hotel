"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallAppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker for PWA support and force update to latest sw.js
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          reg.update();
        })
        .catch(() => {
          // Silently handle if SW registration fails
        });
    }

    // 2. Check if already installed and running in standalone mode
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true);

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed in this session
    if (typeof window !== "undefined" && sessionStorage.getItem("maa_install_dismissed")) {
      return;
    }

    // 3. Detect iOS device
    const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : "";
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !((window as unknown as { MSStream?: unknown }).MSStream);
    setIsIOS(isIOSDevice);

    // 4. Capture beforeinstallprompt event for Android / Chrome / Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // 5. Open popup after a smooth entrance delay if not dismissed
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("maa_install_dismissed", "true");
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
          setIsOpen(false);
        }
        setDeferredPrompt(null);
      } catch {
        // Fallback
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Other browsers without prompt: show instructions
      setShowIOSGuide(true);
    }
  };

  if (!isOpen || isInstalled) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
    >
      <div
        className="w-full max-w-md bg-white border border-amber-200/90 rounded-2xl sm:rounded-3xl shadow-2xl shadow-stone-900/15 overflow-hidden transition-all duration-300 transform animate-in zoom-in-95 slide-in-from-bottom-6 sm:slide-in-from-bottom-2"
        style={{
          background:
            "linear-gradient(180deg, #FFFDF9 0%, #FFFFFF 100%)",
        }}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800" />

        <div className="p-5 sm:p-6">
          {/* Header Row: Logo & Close Button */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-amber-900/15 shrink-0 bg-stone-50 p-1 flex items-center justify-center">
                <Image
                  src="/icon.svg"
                  alt="Maa Annapurna Home Stay &amp; Hotel App"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Official Web App
                </div>
                <h3
                  id="install-modal-title"
                  className="font-serif text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-tight mt-0.5"
                >
                  Install Maa Annapurna Home Stay App
                </h3>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              aria-label="Close install prompt"
              className="p-1.5 -mr-1 -mt-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Value Proposition Description */}
          <p className="text-xs sm:text-[13px] text-stone-600 mt-3 leading-relaxed">
            Install on your home screen for quick 1-tap bookings, offline directions, and direct 24/7 host assistance during your Bodhgaya pilgrimage.
          </p>

          {/* Feature Highlights Grid */}
          <div className="my-4 py-3 px-3.5 bg-amber-50/50 rounded-xl border border-amber-100/90 space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-stone-700">
              <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs shrink-0 font-bold">
                ⚡
              </span>
              <span>Fast 1-tap direct room booking (zero commission)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-700">
              <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs shrink-0 font-bold">
                🛕
              </span>
              <span>Offline homestay address (5 mins to Mahabodhi Temple)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-700">
              <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs shrink-0 font-bold">
                📞
              </span>
              <span>Direct WhatsApp and phone assistance anytime</span>
            </div>
          </div>

          {/* Conditional iOS / Browser Installation Guide */}
          {showIOSGuide && (
            <div className="mb-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1.5 animate-in fade-in">
              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                <span>📱</span>
                <span>To install on this device:</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
                {isIOS ? (
                  <>
                    <li>
                      Tap the <strong className="text-stone-800">Share</strong> icon (
                      <span className="inline-block px-1 bg-stone-200/80 rounded text-[11px]">⎋ / Share</span>) at the bottom.
                    </li>
                    <li>
                      Scroll down and tap <strong className="text-stone-800">&quot;Add to Home Screen&quot;</strong>.
                    </li>
                    <li>
                      Tap <strong className="text-stone-800">&quot;Add&quot;</strong> in the top-right corner.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Click the <strong className="text-stone-800">Install App</strong> icon (⊕) in your browser address bar.
                    </li>
                    <li>
                      Or click the menu (<strong className="text-stone-800">⋮</strong>) and choose <strong className="text-stone-800">&quot;Install Maa Annapurna...&quot;</strong>.
                    </li>
                  </>
                )}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <button
              onClick={handleInstallClick}
              className="w-full sm:flex-1 h-11 px-5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer butter-touch"
            >
              <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{deferredPrompt ? "Install App Now" : "Install as App"}</span>
            </button>

            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto h-10 px-4 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

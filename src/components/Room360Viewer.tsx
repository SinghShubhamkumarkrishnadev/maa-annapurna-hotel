"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface Room360ViewerProps {
  imageSrc: string;
  roomName: string;
  className?: string;
  onExit360?: () => void;
}

export default function Room360Viewer({
  imageSrc,
  roomName,
  className = "",
  onExit360,
}: Room360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for animation state
  const stateRef = useRef({
    isUserInteracting: false,
    onPointerDownPointerX: 0,
    onPointerDownPointerY: 0,
    onPointerDownLon: 0,
    onPointerDownLat: 0,
    lon: 0,
    lat: 0,
    phi: 0,
    theta: 0,
    targetLon: 0,
    targetLat: 0,
    fov: 75,
    autoRotate: true,
  });

  // Keep stateRef autoRotate in sync
  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Reset interaction state on image change so hint shows on new room tour
  useEffect(() => {
    setHasInteracted(false);
  }, [imageSrc]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let mesh: THREE.Mesh;
    let texture: THREE.Texture;

    try {
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 400;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(stateRef.current.fov, width / height, 1, 1100);

      // Inverted sphere for inside-out 360 panorama
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      // Texture loader with sRGB encoding
      const loader = new THREE.TextureLoader();
      texture = loader.load(
        imageSrc,
        () => {
          setIsLoading(false);
        },
        undefined,
        (err) => {
          console.error("Failed to load 360 panorama texture", err);
          setIsLoading(false);
        }
      );
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({ map: texture });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      // Clear container and append canvas
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.cursor = "grab";

      // Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const state = stateRef.current;

        // Auto-rotation when user is not manually dragging
        if (!state.isUserInteracting && state.autoRotate) {
          state.targetLon += 0.08;
        }

        // Smooth damping towards target lon/lat
        state.lon += (state.targetLon - state.lon) * 0.1;
        state.lat += (state.targetLat - state.lat) * 0.1;

        state.lat = Math.max(-85, Math.min(85, state.lat));
        state.phi = THREE.MathUtils.degToRad(90 - state.lat);
        state.theta = THREE.MathUtils.degToRad(state.lon);

        const targetX = 500 * Math.sin(state.phi) * Math.cos(state.theta);
        const targetY = 500 * Math.cos(state.phi);
        const targetZ = 500 * Math.sin(state.phi) * Math.sin(state.theta);

        camera.lookAt(targetX, targetY, targetZ);
        renderer.render(scene, camera);
      };

      animate();

      // Resize observer
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // Pointer Event Handlers
      const onPointerDown = (event: PointerEvent) => {
        if (event.isPrimary === false) return;
        stateRef.current.isUserInteracting = true;
        setHasInteracted(true);
        renderer.domElement.style.cursor = "grabbing";

        stateRef.current.onPointerDownPointerX = event.clientX;
        stateRef.current.onPointerDownPointerY = event.clientY;
        stateRef.current.onPointerDownLon = stateRef.current.targetLon;
        stateRef.current.onPointerDownLat = stateRef.current.targetLat;

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.isPrimary === false) return;
        const state = stateRef.current;
        state.targetLon =
          (state.onPointerDownPointerX - event.clientX) * 0.18 + state.onPointerDownLon;
        state.targetLat =
          (event.clientY - state.onPointerDownPointerY) * 0.18 + state.onPointerDownLat;
      };

      const onPointerUp = () => {
        stateRef.current.isUserInteracting = false;
        if (renderer?.domElement) {
          renderer.domElement.style.cursor = "grab";
        }
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
      };

      // Wheel Zoom
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const state = stateRef.current;
        state.fov = Math.max(45, Math.min(95, state.fov + event.deltaY * 0.05));
        camera.fov = state.fov;
        camera.updateProjectionMatrix();
      };

      const dom = renderer.domElement;
      dom.addEventListener("pointerdown", onPointerDown);
      dom.addEventListener("wheel", onWheel, { passive: false });

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();

        dom.removeEventListener("pointerdown", onPointerDown);
        dom.removeEventListener("wheel", onWheel);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);

        if (mesh) {
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        if (texture) texture.dispose();
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
        }
        if (container) {
          container.innerHTML = "";
        }
      };
    } catch (e) {
      console.error("Three.js initialization error", e);
      setIsLoading(false);
    }
  }, [imageSrc]);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const resetView = useCallback(() => {
    stateRef.current.targetLon = 0;
    stateRef.current.targetLat = 0;
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    if (!document.fullscreenElement) {
      parent.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-stone-900 group ${className}`}
    >
      {/* 360 WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full touch-none" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-stone-950/80 flex flex-col items-center justify-center text-white z-20">
          <div className="w-9 h-9 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs font-medium tracking-wide">Loading 360° Virtual Room Tour...</p>
        </div>
      )}

      {/* Top Bar Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="bg-amber-600/90 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1 sm:gap-1.5 border border-amber-400/40">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            <span className="hidden sm:inline">360° Room Tour</span>
            <span className="sm:hidden inline">360°</span>
          </span>
          <span className="hidden sm:inline-block bg-black/60 text-stone-200 text-[11px] px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10 font-medium">
            {roomName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {onExit360 && (
            <button
              onClick={onExit360}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/90 hover:bg-white text-stone-900 text-[11px] sm:text-xs font-semibold shadow-md backdrop-blur-xs flex items-center gap-1 cursor-pointer transition"
              title="Return to standard photos"
            >
              <span>🖼️</span>
              <span className="hidden sm:inline">Photos</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
            title="Toggle fullscreen"
            aria-label="Toggle fullscreen"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interactive Helper Hint for Mobile & Desktop - Dismisses instantly on touch/drag/swipe */}
      {!hasInteracted && !isLoading && (
        <div
          onClick={() => setHasInteracted(true)}
          onTouchStart={() => setHasInteracted(true)}
          className="absolute inset-x-0 bottom-6 sm:bottom-12 flex justify-center pointer-events-auto z-20 px-3 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300 select-none"
        >
          <div className="bg-stone-950/85 hover:bg-stone-950 text-white text-[11px] sm:text-xs font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md shadow-xl border border-white/20 flex items-center gap-2 active:scale-95 transition-all">
            <span className="text-sm animate-pulse">👆</span>
            <span className="sm:hidden">Swipe or drag to rotate 360°</span>
            <span className="hidden sm:inline">Click &amp; drag to explore 360°</span>
            <span
              className="text-stone-400 hover:text-white text-[10px] ml-1 bg-white/10 px-1.5 py-0.5 rounded-full"
              title="Dismiss hint"
            >
              ✕
            </span>
          </div>
        </div>
      )}

      {/* Bottom Floating Control Strip - Desktop only */}
      <div className="hidden sm:flex absolute bottom-3 left-3 right-3 items-center justify-between text-white text-xs pointer-events-none z-10">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={toggleAutoRotate}
            className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[11px] font-medium transition cursor-pointer flex items-center gap-1.5 border ${
              autoRotate
                ? "bg-stone-900/80 text-amber-300 border-amber-500/40"
                : "bg-black/60 text-stone-300 border-white/10"
            }`}
            title={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
          >
            <span>{autoRotate ? "⏸ Auto-Rotate" : "▶ Rotate"}</span>
          </button>

          <button
            onClick={resetView}
            className="px-2 py-1 rounded-full bg-black/60 hover:bg-black/80 text-stone-300 text-[11px] backdrop-blur-md border border-white/10 transition cursor-pointer"
            title="Reset viewing angle"
          >
            Reset
          </button>
        </div>

        <span className="bg-black/60 px-2.5 py-0.5 rounded-full font-mono text-[10.5px] text-stone-300 backdrop-blur-xs border border-white/10">
          360° Interactive
        </span>
      </div>
    </div>
  );
}

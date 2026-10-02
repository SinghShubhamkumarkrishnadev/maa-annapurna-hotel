"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

interface Hotspot {
  id: string;
  name: string;
  badge: string;
  distance: string;
  desc: string;
  yaw: number; // 0 to 360 degrees horizontal
  pitch: number; // -35 to +35 degrees vertical
  icon: string;
  color: string;
  mapUrl?: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "mahabodhi",
    name: "Mahabodhi Temple (UNESCO Spire)",
    badge: "Direct Line of Sight",
    distance: "5-7 mins (~2.2 km)",
    desc: "Ancient stone spire of the UNESCO World Heritage Mahabodhi Temple and sacred Bodhi Tree rising over the green canopy.",
    yaw: 172,
    pitch: 12,
    icon: "🛕",
    color: "bg-amber-600",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Mahabodhi+Temple+Bodhgaya",
  },
  {
    id: "hotel-terrace",
    name: "Maa Annapurna Rooftop Terrace",
    badge: "You Are Standing Here",
    distance: "5th Floor Rooftop",
    desc: "Spacious open terrace with modern safety railings, tiled floor, potted plants, and fresh morning Bodhgaya breeze.",
    yaw: 265,
    pitch: -22,
    icon: "📍",
    color: "bg-emerald-600",
    mapUrl: "https://share.google/u28zYVIFglv8XWTyZ",
  },
  {
    id: "monasteries",
    name: "Thai & Tibetan Monasteries",
    badge: "International Enclave",
    distance: "3-5 mins (~1.5 km)",
    desc: "Golden stupas, prayer flags, and monasteries of Japan, Thailand, and Bhutan visible across the treetops.",
    yaw: 82,
    pitch: -4,
    icon: "🌸",
    color: "bg-rose-600",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Royal+Bhutan+Monastery+Bodhgaya",
  },
  {
    id: "buddha",
    name: "Great Buddha Statue Complex",
    badge: "Sacred Landmark",
    distance: "6 mins (~2.5 km)",
    desc: "Direction of the 80-foot Giant Buddha statue and peaceful meditation gardens of Bodhgaya.",
    yaw: 320,
    pitch: 2,
    icon: "☸️",
    color: "bg-orange-600",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Giant+Buddha+Bodhgaya",
  },
];

export default function PanoramicViewer360() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction State
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [compassHeading, setCompassHeading] = useState<string>("N • Mahabodhi Temple");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // 3D Screen Positions of Hotspots (projected each frame)
  const [hotspotPositions, setHotspotPositions] = useState<
    Record<string, { x: number; y: number; visible: boolean }>
  >({});

  // Refs for animation & Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCameraLonRef = useRef<number | null>(null);
  const targetCameraLatRef = useRef<number | null>(null);

  // Camera angles in degrees
  // Start facing the Mahabodhi Temple (yaw: 172°, pitch: 6°)
  const lonRef = useRef<number>(172);
  const latRef = useRef<number>(6);
  const velocityLonRef = useRef<number>(0);
  const velocityLatRef = useRef<number>(0);

  // Drag tracking
  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownPointerXRef = useRef<number>(0);
  const onPointerDownPointerYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);
  const lastUserInteractionTimeRef = useRef<number>(Date.now());
  const pinchStartDistanceRef = useRef<number>(0);

  // Calculate compass direction from yaw angle
  const calculateCompass = useCallback((lon: number) => {
    // Normalize lon to 0..360
    const normalized = ((lon % 360) + 360) % 360;
    // lon = 172° is facing North towards Mahabodhi Temple
    const offset = (normalized - 172 + 360) % 360;

    if (offset >= 337.5 || offset < 22.5) return "N • Towards Mahabodhi Temple";
    if (offset >= 22.5 && offset < 67.5) return "NE • Sujata Kuti & Phalgu River";
    if (offset >= 67.5 && offset < 112.5) return "E • Farmlands & Dungeshwari Hills";
    if (offset >= 112.5 && offset < 157.5) return "SE • Maharani Road Entrance";
    if (offset >= 157.5 && offset < 202.5) return "S • Rooftop Terrace Lounge";
    if (offset >= 202.5 && offset < 247.5) return "SW • Monastery Enclave";
    if (offset >= 247.5 && offset < 292.5) return "W • Thai & Bhutan Temples";
    return "NW • Great Buddha Statue";
  }, []);

  // Jump camera directly to a hotspot
  const jumpToHotspot = (spot: Hotspot) => {
    setSelectedHotspot(spot);
    targetCameraLonRef.current = spot.yaw;
    targetCameraLatRef.current = spot.pitch;
    lastUserInteractionTimeRef.current = Date.now();
  };

  // Main Three.js setup effect
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with true perspective projection
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    cameraRef.current = camera;

    // 3. Renderer with high-DPI support
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // 4. Inverted Sphere for true 360 equirectangular immersion
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    // Invert geometry so normals face inward towards camera
    geometry.scale(-1, 1, 1);

    // 5. Load the photorealistic terrace 360 panorama
    const loader = new THREE.TextureLoader();
    loader.load(
      "/images/terrace-360-panorama.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.wrapS = THREE.RepeatWrapping;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load 360 terrace panorama texture", err);
        setIsLoading(false);
      }
    );

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Handle animated smooth transition to target hotspot
      if (targetCameraLonRef.current !== null && targetCameraLatRef.current !== null) {
        const deltaLon = targetCameraLonRef.current - lonRef.current;
        const deltaLat = targetCameraLatRef.current - latRef.current;

        lonRef.current += deltaLon * 0.1;
        latRef.current += deltaLat * 0.1;

        if (Math.abs(deltaLon) < 0.1 && Math.abs(deltaLat) < 0.1) {
          lonRef.current = targetCameraLonRef.current;
          latRef.current = targetCameraLatRef.current;
          targetCameraLonRef.current = null;
          targetCameraLatRef.current = null;
        }
      } else if (!isUserInteractingRef.current) {
        // Apply inertia friction
        if (Math.abs(velocityLonRef.current) > 0.01) {
          lonRef.current += velocityLonRef.current;
          velocityLonRef.current *= 0.92;
        }
        if (Math.abs(velocityLatRef.current) > 0.01) {
          latRef.current += velocityLatRef.current;
          velocityLatRef.current *= 0.92;
        }

        // Gentle auto-pan when user is idle for > 4 seconds
        const idleTime = Date.now() - lastUserInteractionTimeRef.current;
        if (idleTime > 4000 && Math.abs(velocityLonRef.current) < 0.02) {
          lonRef.current += 0.035; // Majestic slow 360 orbit
        }
      }

      // Restrict pitch angle so viewer stays comfortably on the terrace (no pinching at poles)
      latRef.current = Math.max(-32, Math.min(32, latRef.current));

      // Calculate camera look-at target vector
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);

      // Project 3D Hotspot positions to screen 2D coordinates
      const newPositions: Record<string, { x: number; y: number; visible: boolean }> = {};
      const curWidth = container.clientWidth || 800;
      const curHeight = container.clientHeight || 450;

      HOTSPOTS.forEach((spot) => {
        const spotPhi = THREE.MathUtils.degToRad(90 - spot.pitch);
        const spotTheta = THREE.MathUtils.degToRad(spot.yaw);

        const spotVec = new THREE.Vector3(
          500 * Math.sin(spotPhi) * Math.cos(spotTheta),
          500 * Math.cos(spotPhi),
          500 * Math.sin(spotPhi) * Math.sin(spotTheta)
        );

        // Project 3D vector to camera screen NDC (-1 to 1)
        spotVec.project(camera);

        // A hotspot is visible if it's in front of camera (z < 1) and roughly inside viewport bounds
        const isFacingCamera = spotVec.z < 1;
        const screenX = (spotVec.x * 0.5 + 0.5) * curWidth;
        const screenY = (-(spotVec.y * 0.5) + 0.5) * curHeight;

        const isInBounds =
          screenX >= -40 && screenX <= curWidth + 40 && screenY >= -40 && screenY <= curHeight + 40;

        newPositions[spot.id] = {
          x: screenX,
          y: screenY,
          visible: isFacingCamera && isInBounds,
        };
      });

      setHotspotPositions(newPositions);
      setCompassHeading(calculateCompass(lonRef.current));
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geometry.dispose();
      renderer.dispose();
    };
  }, [calculateCompass]);

  // Adjust Zoom via Camera FOV
  const handleZoomChange = (delta: number) => {
    if (!cameraRef.current) return;
    const currentFov = cameraRef.current.fov;
    const newFov = Math.max(50, Math.min(85, currentFov - delta * 15));
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    setZoomLevel(75 / newFov);
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    isUserInteractingRef.current = true;
    targetCameraLonRef.current = null;
    targetCameraLatRef.current = null;
    velocityLonRef.current = 0;
    velocityLatRef.current = 0;

    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;
    lastUserInteractionTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isUserInteractingRef.current) return;
    const dx = e.clientX - onPointerDownPointerXRef.current;
    const dy = e.clientY - onPointerDownPointerYRef.current;

    const factor = 0.15 / zoomLevel;
    const newLon = onPointerDownLonRef.current - dx * factor;
    const newLat = onPointerDownLatRef.current + dy * factor;

    velocityLonRef.current = (newLon - lonRef.current) * 0.4;
    velocityLatRef.current = (newLat - latRef.current) * 0.4;

    lonRef.current = newLon;
    latRef.current = newLat;
    lastUserInteractionTimeRef.current = Date.now();
  };

  const handleMouseUp = () => {
    isUserInteractingRef.current = false;
    lastUserInteractionTimeRef.current = Date.now();
  };

  // Touch Drag Events for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    targetCameraLonRef.current = null;
    targetCameraLatRef.current = null;
    velocityLonRef.current = 0;
    velocityLatRef.current = 0;
    lastUserInteractionTimeRef.current = Date.now();

    if (e.touches.length === 1) {
      isUserInteractingRef.current = true;
      onPointerDownPointerXRef.current = e.touches[0].clientX;
      onPointerDownPointerYRef.current = e.touches[0].clientY;
      onPointerDownLonRef.current = lonRef.current;
      onPointerDownLatRef.current = latRef.current;
    } else if (e.touches.length === 2) {
      // Pinch to zoom start
      isUserInteractingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    lastUserInteractionTimeRef.current = Date.now();

    if (e.touches.length === 1 && isUserInteractingRef.current) {
      const dx = e.touches[0].clientX - onPointerDownPointerXRef.current;
      const dy = e.touches[0].clientY - onPointerDownPointerYRef.current;

      const factor = 0.18 / zoomLevel;
      const newLon = onPointerDownLonRef.current - dx * factor;
      const newLat = onPointerDownLatRef.current + dy * factor;

      velocityLonRef.current = (newLon - lonRef.current) * 0.4;
      velocityLatRef.current = (newLat - latRef.current) * 0.4;

      lonRef.current = newLon;
      latRef.current = newLat;
    } else if (e.touches.length === 2 && cameraRef.current) {
      // Pinch to zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = (dist - pinchStartDistanceRef.current) * 0.05;
      pinchStartDistanceRef.current = dist;

      const newFov = Math.max(50, Math.min(85, cameraRef.current.fov - delta));
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
      setZoomLevel(75 / newFov);
    }
  };

  const handleTouchEnd = () => {
    isUserInteractingRef.current = false;
    lastUserInteractionTimeRef.current = Date.now();
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const delta = e.deltaY * 0.03;
    const newFov = Math.max(50, Math.min(85, cameraRef.current.fov + delta));
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    setZoomLevel(75 / newFov);
    lastUserInteractionTimeRef.current = Date.now();
  };

  return (
    <div
      className={`relative w-full transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-stone-950 flex flex-col justify-center p-2 sm:p-6"
          : "rounded-3xl"
      }`}
    >
      {/* 360 WebGL Viewport Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        tabIndex={0}
        className={`relative w-full overflow-hidden select-none bg-stone-900 border border-stone-200/90 shadow-xl cursor-grab active:cursor-grabbing outline-none ${
          isFullscreen
            ? "h-[90vh] rounded-2xl"
            : "aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-3xl"
        }`}
        aria-label="Interactive 360 degree panoramic view of Maa Annapurna Hotel rooftop terrace and Mahabodhi Temple. Drag or swipe to look around."
      >
        {/* Three.js WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-stone-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-white">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-xs font-semibold text-stone-300 tracking-wide">
              Loading 360° Terrace Experience...
            </p>
          </div>
        )}

        {/* 3D Projected Interactive Landmark Hotspots */}
        {HOTSPOTS.map((spot) => {
          const pos = hotspotPositions[spot.id];
          if (!pos || !pos.visible) return null;

          return (
            <button
              key={spot.id}
              onClick={(e) => {
                e.stopPropagation();
                jumpToHotspot(spot);
              }}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-10 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
              aria-label={`Inspect ${spot.name}`}
            >
              <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${spot.color}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-8 w-8 sm:h-8 sm:w-8 items-center justify-center text-xs sm:text-sm shadow-lg border-2 border-white text-white ${spot.color} transition-transform group-hover:scale-110`}
                >
                  {spot.icon}
                </span>
              </span>
              <span className="hidden md:inline-block absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-full bg-stone-900/90 backdrop-blur-md text-white text-[11px] font-semibold whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {spot.name}
              </span>
            </button>
          );
        })}

        {/* Minimal Compass & Terrace Badge (Distraction-Free) */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>360° Terrace View</span>
            <span className="text-stone-400">|</span>
            <span className="text-amber-300 font-medium">{compassHeading}</span>
          </div>
        </div>

        {/* Discreet Controls: Zoom & Fullscreen Only */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <button
            onClick={() => handleZoomChange(1)}
            className="w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900/95 text-white text-base font-bold flex items-center justify-center backdrop-blur-md shadow-md transition cursor-pointer"
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => handleZoomChange(-1)}
            className="w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900/95 text-white text-base font-bold flex items-center justify-center backdrop-blur-md shadow-md transition cursor-pointer"
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900/95 text-white text-xs flex items-center justify-center backdrop-blur-md shadow-md transition cursor-pointer"
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? "✕" : "⛶"}
          </button>
        </div>
      </div>

      {/* Quick Jump Landmark Navigation Chips Below Viewer */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-stone-500 font-semibold shrink-0 text-[11px] uppercase tracking-wider pl-1">
          Look at:
        </span>
        {HOTSPOTS.map((spot) => (
          <button
            key={`chip-${spot.id}`}
            onClick={() => jumpToHotspot(spot)}
            className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition flex items-center gap-1.5 cursor-pointer border ${
              selectedHotspot?.id === spot.id
                ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200/80"
            }`}
          >
            <span>{spot.icon}</span>
            <span>{spot.name.split("(")[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Selected Hotspot Detail Card */}
      {selectedHotspot && (
        <div className="mt-3 p-4 sm:p-5 bg-white rounded-2xl border border-stone-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-amber-50 border border-amber-200/60 shrink-0">
                {selectedHotspot.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {selectedHotspot.badge}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {selectedHotspot.distance}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 mt-1">
                  {selectedHotspot.name}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5 leading-relaxed max-w-xl">
                  {selectedHotspot.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer shrink-0"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {selectedHotspot.mapUrl && (
            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">5-7 mins via e-rickshaw or taxi</span>
              <a
                href={selectedHotspot.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-semibold flex items-center gap-1.5 transition text-xs shadow-2xs"
              >
                <span>Directions on Google Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

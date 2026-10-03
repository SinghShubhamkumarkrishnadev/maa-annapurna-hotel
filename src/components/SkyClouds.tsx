import React from "react";
import Image from "next/image";

export default function SkyClouds() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      {/* Cloud Layer 1: Fluffy snowy-blue cumulus cloud drifting across upper-mid sky */}
      <div className="cloud-layer-1 absolute top-4 sm:top-3 right-0 w-[260px] sm:w-[420px] lg:w-[580px] opacity-75">
        <Image
          src="/images/cloud-fluffy.webp"
          alt=""
          width={960}
          height={540}
          priority
          className="w-full h-auto object-contain filter drop-shadow-xs"
        />
      </div>

      {/* Cloud Layer 2: Wispy elongated atmospheric cloud drifting at different speed */}
      <div className="cloud-layer-2 absolute top-16 sm:top-14 right-0 w-[320px] sm:w-[520px] lg:w-[700px] opacity-65">
        <Image
          src="/images/cloud-wispy.webp"
          alt=""
          width={960}
          height={540}
          priority
          className="w-full h-auto object-contain filter drop-shadow-xs"
        />
      </div>

      {/* Cloud Layer 3: High-altitude subtle drifting whisps */}
      <div className="cloud-layer-3 absolute top-1 sm:-top-6 right-0 w-[220px] sm:w-[380px] lg:w-[500px] opacity-55">
        <Image
          src="/images/cloud-fluffy.webp"
          alt=""
          width={960}
          height={540}
          className="w-full h-auto object-contain scale-x-[-1] filter drop-shadow-xs"
        />
      </div>
    </div>
  );
}

import React from "react";

export interface AvatarOption {
  id: string;
  name: string;
  subtitle: string;
  bgGradient: string;
  ringColor: string;
  badgeEmoji: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: "zen",
    name: "Zen Pilgrim",
    subtitle: "Meditator & Seeker",
    bgGradient: "from-amber-600 via-amber-700 to-amber-950",
    ringColor: "ring-amber-500/50",
    badgeEmoji: "🧘",
  },
  {
    id: "pilgrim",
    name: "Temple Devotee",
    subtitle: "Mahabodhi Pilgrim",
    bgGradient: "from-orange-600 via-amber-700 to-stone-900",
    ringColor: "ring-orange-500/50",
    badgeEmoji: "🛕",
  },
  {
    id: "traveler",
    name: "Global Voyager",
    subtitle: "Explorer & Tourist",
    bgGradient: "from-sky-600 via-indigo-700 to-stone-900",
    ringColor: "ring-sky-500/50",
    badgeEmoji: "🧭",
  },
  {
    id: "family",
    name: "Family Group",
    subtitle: "Parents & Pilgrims",
    bgGradient: "from-emerald-600 via-teal-700 to-stone-900",
    ringColor: "ring-emerald-500/50",
    badgeEmoji: "👨‍👩‍👧",
  },
  {
    id: "lotus",
    name: "Bodhi Lotus",
    subtitle: "Purity & Grace",
    bgGradient: "from-rose-500 via-pink-700 to-stone-900",
    ringColor: "ring-rose-400/50",
    badgeEmoji: "🌸",
  },
  {
    id: "namaste",
    name: "Traditional Guest",
    subtitle: "Warm Respect",
    bgGradient: "from-amber-500 via-yellow-700 to-stone-900",
    ringColor: "ring-amber-400/50",
    badgeEmoji: "🙏",
  },
  {
    id: "peace",
    name: "Serene Traveler",
    subtitle: "Peace & Harmony",
    bgGradient: "from-teal-500 via-cyan-700 to-stone-900",
    ringColor: "ring-teal-400/50",
    badgeEmoji: "🕊️",
  },
  {
    id: "star",
    name: "Patron Guest",
    subtitle: "5-Star Experience",
    bgGradient: "from-yellow-500 via-amber-600 to-amber-900",
    ringColor: "ring-yellow-400/50",
    badgeEmoji: "✨",
  },
];

interface AvatarIconProps {
  avatarId?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export default function AvatarIcon({
  avatarId = "star",
  size = "md",
  className = "",
  showBadge = false,
}: AvatarIconProps) {
  const avatar = AVATAR_OPTIONS.find((a) => a.id === avatarId) || AVATAR_OPTIONS[0];

  const sizeClasses = {
    xs: "w-7 h-7 text-xs",
    sm: "w-9 h-9 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-14 h-14 text-xl",
    xl: "w-16 h-16 text-2xl",
  }[size];

  const iconSizes = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
    xl: "w-9 h-9",
  }[size];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-br ${avatar.bgGradient} flex items-center justify-center text-white shadow-md ring-2 ${avatar.ringColor} transition-transform duration-200 select-none overflow-hidden`}
      >
        {renderSvgIcon(avatar.id, iconSizes)}
      </div>

      {showBadge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-stone-900 border border-white text-[9px] flex items-center justify-center shadow-xs"
          title={avatar.name}
        >
          {avatar.badgeEmoji}
        </span>
      )}
    </div>
  );
}

function renderSvgIcon(id: string, sizeClass: string) {
  switch (id) {
    case "zen":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Head & Halo */}
          <circle cx="12" cy="6" r="2.5" />
          <path d="M12 2a5 5 0 0 0-4 2" strokeOpacity="0.6" />
          <path d="M16 4a5 5 0 0 0-4-2" strokeOpacity="0.6" />
          {/* Meditating body & crossed legs */}
          <path d="M12 11c-2.5 0-4 1.8-4 4.5 0 1.2.6 2.5 2 2.5h4c1.4 0 2-1.3 2-2.5 0-2.7-1.5-4.5-4-4.5z" />
          <path d="M7 19c1.5-.7 3-1 5-1s3.5.3 5 1" />
          <path d="M5 20c2-1.5 4.5-2 7-2s5 .5 7 2" />
        </svg>
      );

    case "pilgrim":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Mahabodhi Stupa pinnacle */}
          <path d="M12 2v3" />
          <circle cx="12" cy="5" r="1.5" />
          {/* Tiered spire */}
          <path d="M10 8h4" />
          <path d="M9 11h6" />
          <path d="M8 14h8" />
          {/* Base temple sanctuary */}
          <path d="M5 21V16l7-4 7 4v5H5z" />
          <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
        </svg>
      );

    case "traveler":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Compass Rose */}
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 4 14.5 10 20 12 14.5 14 12 20 9.5 14 4 12 9.5 10 12 4" fill="currentColor" fillOpacity="0.25" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );

    case "family":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Parent 1 */}
          <circle cx="7" cy="8" r="2" />
          <path d="M4 18v-2a3 3 0 0 1 6 0v2" />
          {/* Parent 2 */}
          <circle cx="17" cy="8" r="2" />
          <path d="M14 18v-2a3 3 0 0 1 6 0v2" />
          {/* Child in center */}
          <circle cx="12" cy="12" r="1.5" />
          <path d="M10 20v-1a2 2 0 0 1 4 0v1" />
        </svg>
      );

    case "lotus":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Central Petal */}
          <path d="M12 3c-1.5 3-3 6.5-3 10.5 0 2 1.3 3.5 3 3.5s3-1.5 3-3.5C15 9.5 13.5 6 12 3z" fill="currentColor" fillOpacity="0.3" />
          {/* Left Petal */}
          <path d="M10 16c-3 0-5.5-2-7-5 2.5 0 5.5 1.5 7 4z" />
          {/* Right Petal */}
          <path d="M14 16c3 0 5.5-2 7-5-2.5 0-5.5 1.5-7 4z" />
          {/* Water ripples */}
          <path d="M4 20c4-1 12-1 16 0" />
        </svg>
      );

    case "namaste":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Folded hands in prayer / welcoming */}
          <path d="M12 4v16" strokeDasharray="1 1" strokeOpacity="0.4" />
          <path d="M12 5c-1 1.5-2 3.5-2 6.5 0 2 .5 3.5 2 4.5" />
          <path d="M12 5c1 1.5 2 3.5 2 6.5 0 2-.5 3.5-2 4.5" />
          <path d="M7 11c.5 1.5 1.5 2.5 3 3" />
          <path d="M17 11c-.5 1.5-1.5 2.5-3 3" />
          <path d="M10 16l-2 3h8l-2-3" />
        </svg>
      );

    case "peace":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Flying Dove */}
          <path d="M3 13c3-3 6-5 10-4 1.5-2 4-3 7-3-1 2-1 4 0 6-2 1-3.5 3-4 6-2 0-4-1-6-3l-3 1-2-1 3-3-5 1z" fill="currentColor" fillOpacity="0.25" />
          {/* Olive Leaf in beak */}
          <path d="M20 7c1-1 2-1.5 3-1" />
        </svg>
      );

    case "star":
    default:
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="currentColor">
          {/* 5-pointed sparkling star */}
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
  }
}

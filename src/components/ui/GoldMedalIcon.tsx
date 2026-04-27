"use client";

import { useId } from "react";

export function GoldMedalIcon({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `gold-medal-gradient-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <path
        d="M7.5 2.5 9.2 7.8 6 9.5 5.5 5.5Z"
        fill="#991b1b"
        opacity={0.95}
      />
      <path
        d="M16.5 2.5 14.8 7.8 18 9.5 18.5 5.5Z"
        fill="#991b1b"
        opacity={0.95}
      />
      <circle
        cx="12"
        cy="14.5"
        r="6.2"
        fill={`url(#${gradId})`}
        stroke="#92400e"
        strokeWidth="1"
      />
      <circle
        cx="12"
        cy="14.5"
        r="4"
        fill="none"
        stroke="#fef3c7"
        strokeOpacity={0.35}
        strokeWidth="0.75"
      />
    </svg>
  );
}

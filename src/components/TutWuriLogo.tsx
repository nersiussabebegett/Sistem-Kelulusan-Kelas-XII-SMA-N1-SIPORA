import React from 'react';

export const TutWuriLogo: React.FC<{ className?: string }> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Blue Pentagon Base */}
    <path
      d="M 250 12 L 485 172 L 398 485 L 102 485 L 15 172 Z"
      fill="#1d8cd7"
      stroke="#111827"
      strokeWidth="6"
      strokeLinejoin="round"
    />

    {/* Arc Text TUT WURI HANDAYANI */}
    <path id="tutWuriArc" d="M 70,185 A 200,200 0 0,1 430,185" fill="none" />
    <text fill="#111827" fontSize="42" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="4">
      <textPath href="#tutWuriArc" startOffset="50%" textAnchor="middle">
        TUT WURI HANDAYANI
      </textPath>
    </text>

    {/* Central Graphic Assembly */}
    <g transform="translate(0, 10)">
      {/* 5 Vertical Tail Feathers in Center */}
      <g fill="#ffffff" stroke="#111827" strokeWidth="3.5" strokeLinejoin="round">
        {/* Feather 1 (Center Top) */}
        <path d="M 250 90 Q 255 160 258 230 L 242 230 Q 245 160 250 90 Z" />
        {/* Feather 2 (Inner Left) */}
        <path d="M 230 105 Q 238 165 242 230 L 226 230 Q 225 165 230 105 Z" />
        {/* Feather 3 (Inner Right) */}
        <path d="M 270 105 Q 275 165 274 230 L 258 230 Q 262 165 270 105 Z" />
        {/* Feather 4 (Outer Left) */}
        <path d="M 210 130 Q 222 175 226 230 L 210 230 Q 205 175 210 130 Z" />
        {/* Feather 5 (Outer Right) */}
        <path d="M 290 130 Q 295 175 290 230 L 274 230 Q 278 175 290 130 Z" />
      </g>

      {/* Left Wing (5 Feathers) */}
      <path
        d="M 235 255 C 150 190 70 170 65 255 C 85 285 140 295 185 280 C 120 295 100 325 135 345 C 175 345 215 310 240 280 Z"
        fill="#ffffff"
        stroke="#111827"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Left Wing Feather Lines */}
      <path
        d="M 85 205 C 115 220 175 235 220 245 M 100 240 C 135 255 185 260 225 260 M 115 270 C 150 280 190 280 230 275"
        stroke="#111827"
        strokeWidth="3.5"
        fill="none"
      />

      {/* Right Wing (5 Feathers) */}
      <path
        d="M 265 255 C 350 190 430 170 435 255 C 415 285 360 295 315 280 C 380 295 400 325 365 345 C 325 345 285 310 260 280 Z"
        fill="#ffffff"
        stroke="#111827"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Right Wing Feather Lines */}
      <path
        d="M 415 205 C 385 220 325 235 280 245 M 400 240 C 365 255 315 260 275 260 M 385 270 C 350 280 310 280 270 275"
        stroke="#111827"
        strokeWidth="3.5"
        fill="none"
      />

      {/* Blazing Flame in Center */}
      <path
        d="M 250 215 C 215 255 215 310 250 338 C 285 310 285 255 250 215 Z"
        fill="#f59e0b"
        stroke="#111827"
        strokeWidth="4"
      />
      <path
        d="M 250 242 C 232 268 232 305 250 328 C 268 305 268 268 250 242 Z"
        fill="#fef08a"
        stroke="#111827"
        strokeWidth="2.5"
      />

      {/* Open Book Base */}
      <path
        d="M 130 380 C 185 360 240 380 250 385 C 260 380 315 360 370 380 L 375 408 C 315 388 260 408 250 412 C 240 408 185 388 125 408 Z"
        fill="#ffffff"
        stroke="#111827"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M 250 385 L 250 412" stroke="#111827" strokeWidth="4" />
    </g>
  </svg>
);

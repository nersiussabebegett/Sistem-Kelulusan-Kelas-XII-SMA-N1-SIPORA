import React from 'react';

export const MentawaiLogo: React.FC<{ className?: string }> = ({ className = 'h-20 w-16' }) => (
  <svg viewBox="0 0 500 580" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Outer Red Shield Frame */}
    <path
      d="M 12 12 L 488 12 L 488 490 L 250 568 L 12 490 Z"
      fill="#dc2626"
      stroke="#ffffff"
      strokeWidth="2"
    />

    {/* Inner White Border Line */}
    <path
      d="M 22 22 L 478 22 L 478 484 L 250 558 L 22 484 Z"
      fill="#ffffff"
    />

    {/* Inner Red Border Line */}
    <path
      d="M 26 26 L 474 26 L 474 481 L 250 554 L 26 481 Z"
      fill="#dc2626"
    />

    {/* Main Blue Shield Canvas */}
    <path
      d="M 30 30 L 470 30 L 470 478 L 250 550 L 30 478 Z"
      fill="#0d8bd9"
    />

    {/* Top Yellow Banner Box */}
    <rect x="30" y="30" width="440" height="42" fill="#facc15" stroke="#dc2626" strokeWidth="3" />
    <text
      x="250"
      y="59"
      fill="#dc2626"
      fontSize="26"
      fontWeight="900"
      fontFamily="Arial, sans-serif"
      textAnchor="middle"
      letterSpacing="1.5"
    >
      KEPULAUAN MENTAWAI
    </text>

    {/* Top Roof Structure & White Horns / Sails */}
    <g transform="translate(0, 5)">
      {/* Outer Left Horn / Sail */}
      <path
        d="M 70 185 Q 110 130 135 105 L 142 108 Q 120 150 90 220 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.5"
      />
      {/* Outer Left Tip Spheres */}
      <circle cx="132" cy="100" r="7" fill="#ffffff" stroke="#000000" strokeWidth="2" />
      <circle cx="129" cy="88" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />

      {/* Inner Left Horn / Sail */}
      <path
        d="M 125 210 Q 150 160 198 115 L 204 118 Q 165 170 140 230 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.5"
      />

      {/* Inner Right Horn / Sail */}
      <path
        d="M 375 210 Q 350 160 302 115 L 296 118 Q 335 170 360 230 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.5"
      />

      {/* Outer Right Horn / Sail */}
      <path
        d="M 430 185 Q 390 130 365 105 L 358 108 Q 380 150 410 220 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.5"
      />
      {/* Outer Right Tip Spheres */}
      <circle cx="368" cy="100" r="7" fill="#ffffff" stroke="#000000" strokeWidth="2" />
      <circle cx="371" cy="88" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />

      {/* Crossed Black Roof Beams at Top Center */}
      <path d="M 210 92 L 290 92" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 215 80 L 285 110" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 285 80 L 215 110" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

      {/* Central Red Vertical Spear */}
      <line x1="250" y1="75" x2="250" y2="210" stroke="#dc2626" strokeWidth="4" />
      <polygon points="250,68 244,82 256,82" fill="#dc2626" />

      {/* Red Bow Arch on Roof */}
      <path
        d="M 195 160 C 220 135 280 135 305 160"
        fill="none"
        stroke="#dc2626"
        strokeWidth="4"
      />
      <line x1="195" y1="160" x2="305" y2="160" stroke="#dc2626" strokeWidth="3" />

      {/* Traditional Mentawai House (Uma) Roof */}
      <path
        d="M 105 255 L 250 120 L 395 255 L 380 270 L 120 270 Z"
        fill="#0d8bd9"
        stroke="#000000"
        strokeWidth="3.5"
      />
      {/* Vertical Hatching lines inside Roof */}
      {Array.from({ length: 19 }).map((_, i) => {
        const x = 125 + i * 14;
        const yTop = x <= 250 ? 255 - ((x - 105) * (255 - 120)) / 145 : 120 + ((x - 250) * (255 - 120)) / 145;
        return (
          <line
            key={i}
            x1={x}
            y1={yTop + 5}
            x2={x}
            y2={268}
            stroke="#000000"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Main Framework Beams & Stilt Posts */}
      <rect x="120" y="270" width="260" height="10" fill="#000000" />
      
      {/* House Front Grid / Posts */}
      <line x1="125" y1="280" x2="125" y2="360" stroke="#000000" strokeWidth="5" />
      <line x1="150" y1="280" x2="150" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="180" y1="280" x2="180" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="210" y1="280" x2="210" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="290" y1="280" x2="290" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="320" y1="280" x2="320" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="350" y1="280" x2="350" y2="360" stroke="#000000" strokeWidth="4" />
      <line x1="375" y1="280" x2="375" y2="360" stroke="#000000" strokeWidth="5" />

      {/* Horizontal Crossbars */}
      <line x1="125" y1="295" x2="375" y2="295" stroke="#000000" strokeWidth="3.5" />
      <line x1="125" y1="315" x2="375" y2="315" stroke="#000000" strokeWidth="3.5" />
      <line x1="125" y1="335" x2="375" y2="335" stroke="#000000" strokeWidth="3.5" />

      {/* Center Deck Ladder / Entrance */}
      <rect x="240" y="325" width="20" height="65" fill="#0d8bd9" stroke="#000000" strokeWidth="3" />
      <ellipse cx="250" cy="340" rx="6" ry="3" fill="#000000" />
      <ellipse cx="250" cy="355" rx="6" ry="3" fill="#000000" />
      <ellipse cx="250" cy="370" rx="6" ry="3" fill="#000000" />

      {/* Left Palm Tree */}
      <path
        d="M 90 365 Q 105 270 120 180"
        stroke="#15803d"
        strokeWidth="8"
        fill="none"
      />
      {/* Ring Marks on Trunk */}
      <line x1="91" y1="340" x2="98" y2="338" stroke="#000000" strokeWidth="2" />
      <line x1="95" y1="310" x2="103" y2="308" stroke="#000000" strokeWidth="2" />
      <line x1="101" y1="270" x2="108" y2="268" stroke="#000000" strokeWidth="2" />
      <line x1="108" y1="230" x2="114" y2="228" stroke="#000000" strokeWidth="2" />
      {/* Palm Leaves */}
      <path d="M 120 180 Q 70 170 45 200" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 120 180 Q 80 150 60 135" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 120 180 Q 130 145 150 140" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 120 180 Q 150 170 165 195" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Coconuts */}
      <circle cx="112" cy="188" r="5" fill="#166534" />
      <circle cx="122" cy="192" r="5" fill="#166534" />
      <circle cx="125" cy="185" r="4" fill="#166534" />

      {/* Right Palm Tree */}
      <path
        d="M 410 365 Q 395 270 380 180"
        stroke="#15803d"
        strokeWidth="8"
        fill="none"
      />
      {/* Ring Marks on Trunk */}
      <line x1="409" y1="340" x2="402" y2="338" stroke="#000000" strokeWidth="2" />
      <line x1="405" y1="310" x2="397" y2="308" stroke="#000000" strokeWidth="2" />
      <line x1="399" y1="270" x2="392" y2="268" stroke="#000000" strokeWidth="2" />
      <line x1="392" y1="230" x2="386" y2="228" stroke="#000000" strokeWidth="2" />
      {/* Palm Leaves */}
      <path d="M 380 180 Q 430 170 455 200" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 380 180 Q 420 150 440 135" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 380 180 Q 370 145 350 140" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 380 180 Q 350 170 335 195" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Coconuts */}
      <circle cx="388" cy="188" r="5" fill="#166534" />
      <circle cx="378" cy="192" r="5" fill="#166534" />
      <circle cx="375" cy="185" r="4" fill="#166534" />

      {/* Red Canoe / Perahu */}
      <path
        d="M 90 380 Q 250 430 410 380 Q 250 395 90 380 Z"
        fill="#dc2626"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Ocean Waves Lines (White with Black Outline) */}
      <g fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round">
        <path d="M 50 420 C 80 410 110 430 140 420 C 170 410 200 430 230 420 C 260 410 290 430 320 420 C 350 410 380 430 410 420 C 430 415 440 420 450 420" />
        <path d="M 50 432 C 80 422 110 442 140 432 C 170 422 200 442 230 432 C 260 422 290 442 320 432 C 350 422 380 442 410 432 C 430 427 440 432 450 432" />
        <path d="M 50 444 C 80 434 110 454 140 444 C 170 434 200 454 230 444 C 260 434 290 454 320 444 C 350 434 380 454 410 444 C 430 439 440 444 450 444" />
        <path d="M 50 456 C 80 446 110 466 140 456 C 170 446 200 466 230 456 C 260 446 290 466 320 456 C 350 446 380 466 410 456 C 430 451 440 456 450 456" />
      </g>

      {/* Bottom Golden Scroll Ribbon */}
      <g>
        <path
          d="M 120 480 Q 250 460 380 480 L 355 520 Q 250 500 145 520 Z"
          fill="#f97316"
          stroke="#000000"
          strokeWidth="3.5"
        />
        {/* Ribbon Fold Tails */}
        <path d="M 120 480 L 100 500 L 145 520 Z" fill="#ea580c" stroke="#000000" strokeWidth="2.5" />
        <path d="M 380 480 L 400 500 L 355 520 Z" fill="#ea580c" stroke="#000000" strokeWidth="2.5" />

        <text
          x="250"
          y="498"
          fill="#000000"
          fontSize="22"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          MUSARA KASIMAERU
        </text>
      </g>
    </g>
  </svg>
);

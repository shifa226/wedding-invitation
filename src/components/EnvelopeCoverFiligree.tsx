import React from 'react';

/**
 * Handcrafted antique metallic gold filigree textures for the luxury envelope cover:
 * 1. Grand Center Khatim Medallion (frames the wax seal with radiating 16-pointed starburst & palmettes)
 * 2. Ornate Corner Spandrel Filigrees (TL, TR, BL, BR foliate scrolls & beaded borders)
 * 3. Envelope Pocket Seam Arabesque Lace (diagonal gold vine lace along the folded envelope flaps)
 * 4. Girih Star Lattice Background Pattern
 * 5. Flap Crest Finial Ornament
 */

export const EnvelopeCenterMedallion: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 210 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="medallionGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="20%" stopColor="#f5dd9b" />
          <stop offset="45%" stopColor="#dfba73" />
          <stop offset="70%" stopColor="#b38734" />
          <stop offset="90%" stopColor="#fce8a6" />
          <stop offset="100%" stopColor="#755115" />
        </linearGradient>

        <linearGradient id="medallionGoldSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#dfba73" />
          <stop offset="75%" stopColor="#9a7428" />
          <stop offset="100%" stopColor="#fadba1" />
        </linearGradient>

        <radialGradient id="medallionAuraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dfba73" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#cca052" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#cca052" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#cca052" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient warm golden aura */}
      <circle cx="120" cy="120" r="115" fill="url(#medallionAuraGlow)" />

      {/* Outer 16-pointed star lattice halo (Rotated overlay squares) */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 120 120)`}>
          <rect
            x="36"
            y="36"
            width="168"
            height="168"
            stroke="url(#medallionGoldSecondary)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Primary 8-pointed Khatim star in sharp relief */}
      <rect
        x="44"
        y="44"
        width="152"
        height="152"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="1.6"
        fill="none"
      />
      <rect
        x="44"
        y="44"
        width="152"
        height="152"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="1.6"
        fill="none"
        transform="rotate(45 120 120)"
      />

      {/* Outer concentric beaded filigree ring */}
      <circle
        cx="120"
        cy="120"
        r="104"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="1.2"
        strokeDasharray="2 3.5"
      />
      <circle
        cx="120"
        cy="120"
        r="98"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="0.8"
      />

      {/* 16 Radiating Arabesque Palmettes & Floral Finials */}
      {[...Array(16)].map((_, i) => {
        const angle = i * 22.5;
        return (
          <g key={i} transform={`rotate(${angle} 120 120)`}>
            {/* Main Palmette Finial */}
            <path
              d="M 120 12 C 124 22, 127 30, 120 38 C 113 30, 116 22, 120 12 Z"
              fill="url(#medallionGoldPrimary)"
              opacity="0.9"
            />
            {/* Tip pearl */}
            <circle cx="120" cy="10" r="1.8" fill="#fff8e7" />
            <circle cx="120" cy="10" r="1" fill="#cca052" />

            {/* Side foliate scrolls */}
            <path
              d="M 116 28 C 110 35, 104 40, 100 48"
              stroke="url(#medallionGoldSecondary)"
              strokeWidth="0.85"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 124 28 C 130 35, 136 40, 140 48"
              stroke="url(#medallionGoldSecondary)"
              strokeWidth="0.85"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="98" cy="48" r="1.2" fill="url(#medallionGoldPrimary)" />
            <circle cx="142" cy="48" r="1.2" fill="url(#medallionGoldPrimary)" />
          </g>
        );
      })}

      {/* Inner Concentric Scalloped Frame Hugging the Wax Seal */}
      <circle
        cx="120"
        cy="120"
        r="80"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="120"
        cy="120"
        r="75"
        stroke="url(#medallionGoldPrimary)"
        strokeWidth="1"
        strokeDasharray="1.5 2.5"
      />
      <circle
        cx="120"
        cy="120"
        r="70"
        stroke="url(#medallionGoldSecondary)"
        strokeWidth="0.75"
      />

      {/* 24 Scalloped Sunburst Arches just outside seal perimeter */}
      {[...Array(24)].map((_, i) => {
        const a = (i * 360) / 24;
        return (
          <path
            key={i}
            d="M 120 45 A 6 6 0 0 1 127 50"
            stroke="url(#medallionGoldPrimary)"
            strokeWidth="0.9"
            fill="none"
            transform={`rotate(${a} 120 120)`}
          />
        );
      })}
    </svg>
  );
};

export const OrnateCornerSpandrel: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  className?: string;
}> = ({ position, size = 95, className = '' }) => {
  const transform =
    position === 'tr'
      ? 'scale(-1, 1)'
      : position === 'bl'
      ? 'scale(1, -1)'
      : position === 'br'
      ? 'scale(-1, -1)'
      : 'none';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spandrelGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="25%" stopColor="#faecc5" />
          <stop offset="50%" stopColor="#dfba73" />
          <stop offset="75%" stopColor="#a3792c" />
          <stop offset="100%" stopColor="#e8cc87" />
        </linearGradient>
      </defs>

      {/* Outer corner frame border */}
      <path
        d="M 2.5 2.5 L 96 2.5"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 2.5 2.5 L 2.5 96"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Secondary inset hairline with beads */}
      <path
        d="M 8.5 8.5 L 88 8.5"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="1"
        strokeDasharray="2.5 3.5"
      />
      <path
        d="M 8.5 8.5 L 8.5 88"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="1"
        strokeDasharray="2.5 3.5"
      />

      {/* Tertiary thin boundary */}
      <path
        d="M 14 14 L 78 14"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="0.65"
      />
      <path
        d="M 14 14 L 14 78"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="0.65"
      />

      {/* Primary Arabesque Foliate Scroll */}
      <path
        d="M 5 5 C 34 5, 64 22, 64 56 C 64 78, 48 92, 28 92 C 16 92, 7 82, 13 69 C 17 59, 29 59, 35 65 C 41 71, 37 79, 28 79"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Secondary Counter-Scroll */}
      <path
        d="M 5 5 C 5 34, 22 64, 56 64 C 78 64, 92 48, 92 28 C 92 16, 82 7, 69 13 C 59 17, 59 29, 65 35 C 71 41, 79 37, 79 28"
        stroke="url(#spandrelGoldGrad)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Diagonal Lotus / Palmette Blossom at 45 deg */}
      <path
        d="M 12 12 C 28 28, 44 38, 54 54 C 44 48, 34 48, 26 52 C 30 44, 30 34, 24 24 Z"
        fill="url(#spandrelGoldGrad)"
        opacity="0.88"
      />

      {/* Micro-pearls & jewel studs */}
      <circle cx="5" cy="5" r="3.2" fill="url(#spandrelGoldGrad)" />
      <circle cx="22" cy="5" r="1.6" fill="url(#spandrelGoldGrad)" />
      <circle cx="5" cy="22" r="1.6" fill="url(#spandrelGoldGrad)" />
      <circle cx="50" cy="18" r="2.2" fill="url(#spandrelGoldGrad)" />
      <circle cx="18" cy="50" r="2.2" fill="url(#spandrelGoldGrad)" />
      <circle cx="78" cy="14" r="1.8" fill="url(#spandrelGoldGrad)" />
      <circle cx="14" cy="78" r="1.8" fill="url(#spandrelGoldGrad)" />
      <circle cx="34" cy="34" r="2.5" fill="url(#spandrelGoldGrad)" />
    </svg>
  );
};

export const GirihLatticePattern: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none opacity-[0.09] ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23dfba73' stroke-width='0.95'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M0 0 L40 40 L0 80'/%3E%3Cpath d='M80 0 L40 40 L80 80'/%3E%3Ccircle cx='40' cy='40' r='14' stroke-dasharray='1 2'/%3E%3Ccircle cx='0' cy='0' r='14'/%3E%3Ccircle cx='80' cy='0' r='14'/%3E%3Ccircle cx='0' cy='80' r='14'/%3E%3Ccircle cx='80' cy='80' r='14'/%3E%3Ccircle cx='40' cy='40' r='4' fill='%23cca052'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
      }}
    />
  );
};

/**
 * Exquisite gold filigree lace bordering that traces the diagonal seams
 * of the folded envelope pockets where they meet at the center!
 */
export const EnvelopePocketSeamFiligree: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 470 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none select-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="seamGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a7428" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#cca052" />
          <stop offset="50%" stopColor="#fff6dc" />
          <stop offset="70%" stopColor="#dfba73" />
          <stop offset="100%" stopColor="#9a7428" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Bottom pocket left diagonal seam (0, 320) to (235, 112) */}
      <path
        d="M 0 320 L 235 112"
        stroke="url(#seamGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 6 320 L 235 118"
        stroke="url(#seamGoldGrad)"
        strokeWidth="0.9"
        strokeDasharray="2 3.5"
      />

      {/* Bottom pocket right diagonal seam (470, 320) to (235, 112) */}
      <path
        d="M 470 320 L 235 112"
        stroke="url(#seamGoldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 464 320 L 235 118"
        stroke="url(#seamGoldGrad)"
        strokeWidth="0.9"
        strokeDasharray="2 3.5"
      />

      {/* Arabesque leaf buds along left diagonal */}
      {[0.2, 0.4, 0.6, 0.8].map((t, idx) => {
        const x = 235 * t;
        const y = 320 - (320 - 112) * (1 - t);
        return (
          <g key={`l-${idx}`} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r="2.2" fill="#dfba73" />
            <path
              d="M 0 0 C -4 -6, -8 -8, -12 -5 C -8 -2, -4 0, 0 0 Z"
              fill="#f5e4bd"
              opacity="0.85"
            />
          </g>
        );
      })}

      {/* Arabesque leaf buds along right diagonal */}
      {[0.2, 0.4, 0.6, 0.8].map((t, idx) => {
        const x = 470 - 235 * t;
        const y = 320 - (320 - 112) * (1 - t);
        return (
          <g key={`r-${idx}`} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r="2.2" fill="#dfba73" />
            <path
              d="M 0 0 C 4 -6, 8 -8, 12 -5 C 8 -2, 4 0, 0 0 Z"
              fill="#f5e4bd"
              opacity="0.85"
            />
          </g>
        );
      })}
    </svg>
  );
};

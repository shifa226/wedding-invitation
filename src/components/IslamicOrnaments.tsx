import React from 'react';

/**
 * High-precision vector Islamic ornaments in antique metallic gold
 */

export const ArabesqueCorner: React.FC<{
  className?: string;
  position?: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
}> = ({ className = '', position = 'tl', size = 64 }) => {
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
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 2C18 2 34 18 34 34V62"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M2 14C12 14 22 24 22 34V54"
        stroke="url(#goldGrad)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M14 2C14 12 24 22 34 22H54"
        stroke="url(#goldGrad)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M2 2H62"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 2V62"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="2" cy="2" r="2.5" fill="#f5e4bd" />
      <circle cx="24" cy="24" r="1.5" fill="#cca052" />
      <path
        d="M6 6C16 10 20 20 20 30"
        stroke="url(#goldGrad)"
        strokeWidth="0.7"
        strokeDasharray="2 2"
      />
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e7be" />
          <stop offset="40%" stopColor="#cca052" />
          <stop offset="70%" stopColor="#9a7428" />
          <stop offset="100%" stopColor="#f3db98" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const IslamicStarKhatim: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* 8-pointed star formed by two overlapping rotated squares */}
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        stroke="url(#goldGradStar)"
        strokeWidth="1.4"
        fill="rgba(197, 160, 89, 0.08)"
      />
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        stroke="url(#goldGradStar)"
        strokeWidth="1.4"
        fill="rgba(197, 160, 89, 0.08)"
        transform="rotate(45 20 20)"
      />
      <circle cx="20" cy="20" r="3" fill="#dfba73" />
      <defs>
        <linearGradient id="goldGradStar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faecc5" />
          <stop offset="50%" stopColor="#cca052" />
          <stop offset="100%" stopColor="#8d6824" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const GoldDivider: React.FC<{
  className?: string;
  withStar?: boolean;
}> = ({ className = '', withStar = true }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#cca052] to-transparent" />
      {withStar ? (
        <IslamicStarKhatim size={20} className="text-[#cca052]" />
      ) : (
        <div className="w-1.5 h-1.5 rotate-45 bg-[#cca052]" />
      )}
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#cca052] to-transparent" />
    </div>
  );
};

export const MoorishArchHeader: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-xs mx-auto ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M10 55 C60 55 100 48 130 30 C150 15 155 5 160 2 C165 5 170 15 190 30 C220 48 260 55 310 55"
        stroke="url(#archGold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M25 58 C70 58 105 50 133 35 C150 24 155 12 160 8 C165 12 170 24 187 35 C215 50 250 58 295 58"
        stroke="url(#archGold)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        fill="none"
      />
      <circle cx="160" cy="2" r="2.5" fill="#f8eed2" />
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="#cca052" />
          <stop offset="50%" stopColor="#faecc5" />
          <stop offset="70%" stopColor="#cca052" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EnvelopeFlapFiligree: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flapGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faecc5" />
          <stop offset="25%" stopColor="#dfba73" />
          <stop offset="50%" stopColor="#cca052" />
          <stop offset="75%" stopColor="#9a7428" />
          <stop offset="100%" stopColor="#f3db98" />
        </linearGradient>
        <radialGradient id="filigreeCenter" cx="50%" cy="85%" r="60%">
          <stop offset="0%" stopColor="#faecc5" />
          <stop offset="60%" stopColor="#cca052" />
          <stop offset="100%" stopColor="#875f1b" />
        </radialGradient>
      </defs>

      {/* Outer V-border following the triangular envelope flap */}
      <path
        d="M 6 4 L 200 152 L 394 4"
        stroke="url(#flapGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 16 6 L 200 144 L 384 6"
        stroke="url(#flapGold)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />

      {/* Intricate Moorish Arabesque Lace around bottom apex */}
      <g transform="translate(200, 128) scale(0.65)">
        {/* Central Rosette */}
        <circle cx="0" cy="0" r="14" stroke="url(#flapGold)" strokeWidth="1.5" fill="rgba(197,160,89,0.15)" />
        <circle cx="0" cy="0" r="8" fill="url(#filigreeCenter)" />
        <circle cx="0" cy="0" r="3" fill="#04140f" />

        {/* Radiating 8-Petal Arabesque */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M 0 -8 C 4 -16, 6 -24, 0 -30 C -6 -24, -4 -16, 0 -8 Z"
            fill="url(#flapGold)"
            transform={`rotate(${angle})`}
            opacity="0.9"
          />
        ))}

        {/* Elegant side scrollwork vines */}
        <path
          d="M -14 0 C -40 -10, -70 -25, -95 -50 C -75 -42, -50 -30, -25 -20"
          stroke="url(#flapGold)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 14 0 C 40 -10, 70 -25, 95 -50 C 75 -42, 50 -30, 25 -20"
          stroke="url(#flapGold)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Fine ornamental leaf drops */}
        <circle cx="-50" cy="-28" r="2.5" fill="url(#flapGold)" />
        <circle cx="50" cy="-28" r="2.5" fill="url(#flapGold)" />
        <circle cx="-85" cy="-45" r="2" fill="url(#flapGold)" />
        <circle cx="85" cy="-45" r="2" fill="url(#flapGold)" />
      </g>

      {/* Top Left & Right Arabesque Corner Lace */}
      <path
        d="M 20 8 C 50 18, 90 28, 140 28"
        stroke="url(#flapGold)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 380 8 C 350 18, 310 28, 260 28"
        stroke="url(#flapGold)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

export const IntricateGoldBorder: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none p-1.5 ${className}`}>
      {/* Outer hairline gold border */}
      <div className="w-full h-full border border-[#cca052]/60 rounded-xl relative p-1.5 shadow-[inset_0_0_15px_rgba(223,184,108,0.15)]">
        {/* Inner dotted arabesque border */}
        <div className="w-full h-full border border-dashed border-[#cca052]/40 rounded-lg relative">
          {/* 4 Corner 8-pointed rosettes */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#04140f] border border-[#cca052] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#dfba73] rounded-full" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#04140f] border border-[#cca052] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#dfba73] rounded-full" />
          </div>
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#04140f] border border-[#cca052] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#dfba73] rounded-full" />
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#04140f] border border-[#cca052] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#dfba73] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};


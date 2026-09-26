import React from 'react';
import { motion } from 'motion/react';

interface RoyalWaxSealProps {
  phase: number;
  onClick?: () => void;
  className?: string;
  size?: number;
}

export const RoyalWaxSeal: React.FC<RoyalWaxSealProps> = ({
  phase,
  onClick,
  className = '',
  size = 114,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer select-none preserve-3d group ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        scale: phase === 0 ? 1 : phase === 1 ? 1.09 : phase === 2 ? 1.18 : 0,
        opacity: phase >= 3 ? 0 : 1,
        rotate: phase >= 2 ? 18 : 0,
        translateZ: phase === 0 ? 38 : phase === 1 ? 70 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        phase === 0
          ? {
              scale: 1.07,
              rotateX: -8,
              rotateY: 10,
              translateZ: 52,
            }
          : {}
      }
      title="Tap to unseal the royal invitation"
      role="button"
      tabIndex={0}
      aria-label="Handcrafted royal wax seal with Syed Irfan & Mehek S monogram"
    >
      {/* ========================================================
          LAYER 0: PHYSICAL CONTACT CAST SHADOW & PAPER INDENTATION
          Cascading CSS drop-shadow filters mimicking a heavy wax seal
          pressed down into thick fibrous archival cotton paper.
          ======================================================== */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
        style={{
          transform: 'translateZ(-22px) translateY(8px) scale(0.96)',
          background: 'radial-gradient(circle at 48% 46%, rgba(2, 8, 5, 0.98) 0%, rgba(2, 8, 5, 0.8) 60%, transparent 85%)',
          boxShadow: `
            0 3px 6px 2px rgba(0, 0, 0, 0.99),
            0 12px 24px 4px rgba(0, 0, 0, 0.92),
            0 24px 48px 8px rgba(0, 0, 0, 0.85),
            0 42px 80px 14px rgba(0, 0, 0, 0.65),
            0 0 35px 8px rgba(223, 184, 108, 0.35)
          `,
          filter: 'blur(1px)',
        }}
      />

      {/* ========================================================
          LAYER 1: 3D EXTRUDED SIDEWALL (True physical wax thickness)
          Creates the 3-4mm solid slab depth of the poured wax
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none opacity-95"
        style={{
          transform: 'translateZ(4px) translateY(3.5px)',
          filter: `
            drop-shadow(0 2px 3px rgba(0,0,0,0.98))
            drop-shadow(0 8px 12px rgba(0,0,0,0.85))
          `,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path
            d="M 50 2
               C 64 2, 73 5.5, 81 12
               C 89 18.5, 97 27, 99.5 38.5
               C 102 49.5, 100 61.5, 95 73
               C 90 84, 81 92.5, 69.5 97.5
               C 58.5 102, 42.5 100.5, 31 97
               C 20 93.5, 10.5 85, 5.5 74
               C 0.5 62.5, 0 49.5, 3.5 38
               C 7 27, 14.5 17.5, 24.5 11
               C 33.5 5, 42.5 2, 50 2 Z"
            fill="#1e0206"
            stroke="#120104"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 preserve-3d pointer-events-none opacity-90"
        style={{
          transform: 'translateZ(8px) translateY(2px)',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path
            d="M 50 2
               C 64 2, 73 5.5, 81 12
               C 89 18.5, 97 27, 99.5 38.5
               C 102 49.5, 100 61.5, 95 73
               C 90 84, 81 92.5, 69.5 97.5
               C 58.5 102, 42.5 100.5, 31 97
               C 20 93.5, 10.5 85, 5.5 74
               C 0.5 62.5, 0 49.5, 3.5 38
               C 7 27, 14.5 17.5, 24.5 11
               C 33.5 5, 42.5 2, 50 2 Z"
            fill="#3d060e"
          />
        </svg>
      </div>

      {/* ========================================================
          LAYER 2: ORGANIC MOLTEN WAX PUDDLE & BASE PLATE
          Deep carmine/burgundy with glossy natural roll edges,
          surface tension mounds and multiple CSS drop-shadow filters
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none"
        style={{
          transform: 'translateZ(14px)',
          filter: `
            drop-shadow(0 2px 2px rgba(0,0,0,0.95))
            drop-shadow(0 6px 12px rgba(0,0,0,0.85))
            drop-shadow(0 14px 24px rgba(0,0,0,0.7))
            drop-shadow(0 28px 45px rgba(0,0,0,0.5))
            drop-shadow(0 0 16px rgba(223,184,108,0.32))
          `,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich multi-stop burgundy/crimson liquid wax enamel */}
            <radialGradient id="puddleWaxGloss" cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor="#cf3d53" />
              <stop offset="18%" stopColor="#aa2337" />
              <stop offset="42%" stopColor="#811726" />
              <stop offset="70%" stopColor="#550d18" />
              <stop offset="88%" stopColor="#33050d" />
              <stop offset="100%" stopColor="#150103" />
            </radialGradient>

            {/* Beveled edge light gradient catching light from top-left */}
            <linearGradient id="puddleBevelHighlight" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#ff9eb0" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#c52e43" />
              <stop offset="65%" stopColor="#690f1d" />
              <stop offset="85%" stopColor="#35060d" />
              <stop offset="100%" stopColor="#120103" />
            </linearGradient>

            {/* Rim golden reflection */}
            <linearGradient id="rimGoldDust" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dfba73" stopOpacity="0.4" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor="#fce8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Organic molten wax droplet contour */}
          <path
            d="M 50 1.5
               C 63.5 1.5, 72.5 5, 80.5 11.5
               C 88.5 18, 96.5 26.5, 99 38
               C 101.5 49, 99.5 61, 94.5 72.5
               C 89.5 83.5, 80.5 92, 69 97
               C 58 101.5, 42 100, 30.5 96.5
               C 19.5 93, 10 84.5, 5 73.5
               C 0 62, -0.5 49, 3 37.5
               C 6.5 26.5, 14 17, 24 10.5
               C 33 4.5, 42 1.5, 50 1.5 Z"
            fill="url(#puddleWaxGloss)"
            stroke="url(#puddleBevelHighlight)"
            strokeWidth="2.4"
          />

          {/* Handcrafted molten wax squish rim (the outer bulge where wax rolled outward) */}
          <path
            d="M 50 4.5
               C 61 4.5, 69.5 8, 76.5 13.5
               C 83.5 19.5, 91.5 27, 93.5 37.5
               C 95.5 47.5, 93.5 58, 89.5 68.5
               C 85 78, 77 85.5, 66.5 90
               C 56.5 94, 43 93, 33 90
               C 23 87, 14.5 79.5, 10 69.5
               C 5.5 59.5, 5 48.5, 8 38
               C 11 28.5, 17.5 20, 26.5 14.5
               C 34.5 9, 43 4.5, 50 4.5 Z"
            fill="none"
            stroke="url(#rimGoldDust)"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      {/* ========================================================
          LAYER 3: DEEP SUNKEN MATRIX DISH & INNER CAVITY OCCLUSION
          The compressed cavity deeply stamped by the cold brass die
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none"
        style={{
          transform: 'translateZ(18px)',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="sunkenDishBase" cx="44%" cy="38%" r="56%">
              <stop offset="0%" stopColor="#4f0d16" />
              <stop offset="55%" stopColor="#31060c" />
              <stop offset="85%" stopColor="#1a0205" />
              <stop offset="100%" stopColor="#0c0102" />
            </radialGradient>

            {/* Steep inner shadow cast inside the sunken lip from top-left */}
            <linearGradient id="innerLipShadow" x1="25%" y1="15%" x2="75%" y2="85%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.95)" />
              <stop offset="35%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="70%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(255,230,180,0.22)" />
            </linearGradient>

            <radialGradient id="cavityOcclusionDeep" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="transparent" />
              <stop offset="85%" stopColor="rgba(0,0,0,0.65)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.98)" />
            </radialGradient>
          </defs>

          {/* Compressed inner disc base */}
          <circle cx="50" cy="50" r="37.8" fill="url(#sunkenDishBase)" stroke="#160104" strokeWidth="1.8" />
          {/* Inner lip shadow */}
          <circle cx="50" cy="50" r="37.8" fill="url(#innerLipShadow)" />
          {/* Cavity occlusion */}
          <circle cx="50" cy="50" r="37.8" fill="url(#cavityOcclusionDeep)" />
        </svg>
      </div>

      {/* ========================================================
          LAYER 4: RAISED BEADED RELIEF RING & GILDED WAX COLLAR
          Raised wax ridge squeezed up against the die border,
          highlighted with antique metallic gold mica powder
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none"
        style={{
          transform: 'translateZ(24px)',
          filter: `
            drop-shadow(0 2.5px 3.5px rgba(0,0,0,0.92))
            drop-shadow(0 5px 8px rgba(0,0,0,0.65))
            drop-shadow(0 0 6px rgba(223,184,108,0.4))
          `,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="chiseledCollarGold" x1="18%" y1="12%" x2="82%" y2="88%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#fff3d1" />
              <stop offset="42%" stopColor="#e2c07a" />
              <stop offset="68%" stopColor="#9a7428" />
              <stop offset="90%" stopColor="#f3db98" />
              <stop offset="100%" stopColor="#5d400e" />
            </linearGradient>

            <linearGradient id="rimShineArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#cca052" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#300408" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Heavy raised gold border collar */}
          <circle cx="50" cy="50" r="36.5" stroke="url(#chiseledCollarGold)" strokeWidth="1.8" />
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="url(#chiseledCollarGold)"
            strokeWidth="1.2"
            strokeDasharray="1.2 2.6"
          />

          {/* Top-left crest highlight arc */}
          <path
            d="M 24 34 A 36.5 36.5 0 0 1 65 16"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* ========================================================
          LAYER 5: HIGH-RELIEF 3D CHISELED GOLD MONOGRAM & INSIGNIA
          Raised in true physical 3D space (translateZ 30px)
          with distinct cast shadows and bright light catches!
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none"
        style={{
          transform: 'translateZ(30px)',
          filter: `
            drop-shadow(1.8px 2.8px 2.2px rgba(0, 0, 0, 0.98))
            drop-shadow(3px 6px 6px rgba(0, 0, 0, 0.82))
            drop-shadow(-1px -1px 1px rgba(255, 248, 225, 0.85))
          `,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="chiseledMonogramGold" x1="16%" y1="10%" x2="84%" y2="90%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="18%" stopColor="#fff5db" />
              <stop offset="42%" stopColor="#e8cc87" />
              <stop offset="68%" stopColor="#b38734" />
              <stop offset="88%" stopColor="#f5dd9b" />
              <stop offset="100%" stopColor="#6e4d15" />
            </linearGradient>
          </defs>

          {/* 1. Inscribed Arabic Matrimony Calligraphy */}
          <path id="sealTextArchEnhanced" d="M 20.5 50 A 29.5 29.5 0 0 1 79.5 50" fill="none" />
          <text
            className="font-arabic font-bold"
            fill="url(#chiseledMonogramGold)"
            fontSize="5.9"
            letterSpacing="1.2"
          >
            <textPath href="#sealTextArchEnhanced" startOffset="50%" textAnchor="middle">
              بِسْمِ اللَّهِ · عَقْدُ قِرَانٍ
            </textPath>
          </text>

          {/* 2. Top Apex: 8-Pointed Islamic Khatim Star Rosette */}
          <g transform="translate(50, 18.2) scale(0.3)">
            <rect x="-10" y="-10" width="20" height="20" fill="url(#chiseledMonogramGold)" />
            <rect
              x="-10"
              y="-10"
              width="20"
              height="20"
              fill="url(#chiseledMonogramGold)"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="3.2" fill="#200307" />
            <circle cx="0" cy="0" r="1.6" fill="#fff8e7" />
          </g>

          {/* 3. The Royal "S & M" Monogram in Bold Chiseled Relief */}
          <g transform="translate(50, 52.8)">
            {/* Letter S with bright left bevel and dark right shadow */}
            <text
              x="-11.8"
              y="6.8"
              className="font-cinzel"
              fontWeight="bold"
              fontSize="19.5"
              fill="url(#chiseledMonogramGold)"
              textAnchor="middle"
            >
              S
            </text>

            {/* Decorative Ampersand */}
            <text
              x="0"
              y="2.2"
              className="font-cormorant"
              fontStyle="italic"
              fontWeight="bold"
              fontSize="13"
              fill="#fff8e7"
              textAnchor="middle"
            >
              &amp;
            </text>

            {/* Letter M with bold architectural serifs */}
            <text
              x="11.8"
              y="6.8"
              className="font-cinzel"
              fontWeight="bold"
              fontSize="19.5"
              fill="url(#chiseledMonogramGold)"
              textAnchor="middle"
            >
              M
            </text>
          </g>

          {/* 4. Embossed Royal Laurel / Olive Wreath at Base */}
          <path
            d="M 30.5 73.5 C 37.5 77, 44 78, 50 78 C 56 78, 62.5 77, 69.5 73.5"
            stroke="url(#chiseledMonogramGold)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="36.5" cy="74.8" rx="2.2" ry="1.3" fill="url(#chiseledMonogramGold)" transform="rotate(-25 36.5 74.8)" />
          <ellipse cx="43" cy="77" rx="2.2" ry="1.3" fill="url(#chiseledMonogramGold)" transform="rotate(-10 43 77)" />
          <ellipse cx="50" cy="78" rx="2" ry="2" fill="url(#chiseledMonogramGold)" />
          <ellipse cx="57" cy="77" rx="2.2" ry="1.3" fill="url(#chiseledMonogramGold)" transform="rotate(10 57 77)" />
          <ellipse cx="63.5" cy="74.8" rx="2.2" ry="1.3" fill="url(#chiseledMonogramGold)" transform="rotate(25 63.5 74.8)" />
        </svg>
      </div>

      {/* ========================================================
          LAYER 6: CURVED SPECULAR WAX SHEEN (Reflective glint)
          Physical curvature reflection showing the glossy wax finish
          ======================================================== */}
      <div
        className="absolute inset-0 preserve-3d pointer-events-none"
        style={{
          transform: 'translateZ(34px)',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="waxGlintArcTop" x1="10%" y1="5%" x2="80%" y2="75%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.72)" />
              <stop offset="25%" stopColor="rgba(255, 255, 255, 0.25)" />
              <stop offset="55%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            <radialGradient id="glintDot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#fce8a6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Curvature reflection on top-left wax shoulder */}
          <path
            d="M 19 19
               C 29 9, 46 6.5, 59 8
               C 64 9, 48 16, 36 21
               C 24 26, 18 31, 16 38
               C 14 29, 16 22.5, 19 19 Z"
            fill="url(#waxGlintArcTop)"
          />

          {/* Micro pinpoint glint on stamp rim */}
          <circle cx="28" cy="24" r="3" fill="url(#glintDot)" />
        </svg>
      </div>

      {/* ========================================================
          LAYER 7: FRACTURE CRACKS ON UNSEALING (Phase 2)
          Realistic golden fissure breaking open when unsealed
          ======================================================== */}
      {phase >= 2 && (
        <div
          className="absolute inset-0 preserve-3d pointer-events-none"
          style={{ transform: 'translateZ(38px)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <path
              d="M 50 1.5 L 48 22 L 55 36 L 46 60 L 54 80 L 49 98"
              stroke="#fff8e7"
              strokeWidth="3.4"
              strokeLinecap="round"
              filter="drop-shadow(0 0 10px #fce8a6)"
            />
            <path
              d="M 55 36 L 69 27 L 79 30"
              stroke="#fff8e7"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #fce8a6)"
            />
            <path
              d="M 46 60 L 31 69 L 23 65"
              stroke="#fff8e7"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #fce8a6)"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

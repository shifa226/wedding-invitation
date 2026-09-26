import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { IslamicStarKhatim, ArabesqueCorner, EnvelopeFlapFiligree, IntricateGoldBorder } from './IslamicOrnaments';
import {
  EnvelopeCenterMedallion,
  OrnateCornerSpandrel,
  GirihLatticePattern,
  EnvelopePocketSeamFiligree,
} from './EnvelopeCoverFiligree';
import { RoyalWaxSeal } from './RoyalWaxSeal';
import { weddingData } from '../data/weddingData';
import { arabicAudio } from '../utils/audioController';
import { Calendar, Clock, MapPin, Sparkles, Music } from 'lucide-react';

interface Envelope3DProps {
  isOpen: boolean;
  onOpenComplete: () => void;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({
  isOpen,
  onOpenComplete,
}) => {
  // Phases:
  // 0: Closed envelope sitting centered
  // 1: Background darkens, envelope scales forward (step 1-2)
  // 2: Royal wax seal releases with antique gold fracture and dust (step 3)
  // 3: Envelope flap swings open 180deg (step 4)
  // 4: Golden light emits, inner card slides upward (step 5-6)
  // 5: Card unfolds in 3D, REVEALS NIKAH & VALIMA DATES, calligraphy, triggers music (step 7-10)
  // 6: Expands smoothly into main website (step 11)
  const [phase, setPhase] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const triggerOpen = () => {
    if (isInteracting || phase > 0) return;
    setIsInteracting(true);

    // STEP 1 & 2: Background darkens, envelope moves toward viewer
    setPhase(1);

    // Trigger music right upon user gesture
    arabicAudio.play().catch(() => {});

    // STEP 3: Royal Wax Seal breaks & releases with gold sparkles
    setTimeout(() => {
      setPhase(2);
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.52 },
        colors: ['#fce8a6', '#dfba73', '#cca052', '#87212e', '#f5e4bd'],
        ticks: 200,
        gravity: 0.75,
        scalar: 0.8,
      });
    }, 700);

    // STEP 4: Flap opens realistically
    setTimeout(() => {
      setPhase(3);
    }, 1400);

    // STEP 5 & 6: Warm golden glow & card slides upward
    setTimeout(() => {
      setPhase(4);
    }, 2200);

    // STEP 7-10: Card unfolds & DEDICATED NIKAH & VALIMA DATE REVEAL
    setTimeout(() => {
      setPhase(5);
      // Extra celebratory gold burst for the date reveal
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#cca052', '#fce8a6', '#e8cc87'],
        ticks: 160,
      });
    }, 3200);

    // STEP 11: Expand into main experience
    setTimeout(() => {
      setPhase(6);
      onOpenComplete();
    }, 5600);
  };

  const handleInstantOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    arabicAudio.play().catch(() => {});
    onOpenComplete();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Cinematic Dark Arabian Ambience with Golden Dust & Subtle Stars */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          phase >= 1 ? 'bg-[#020906]' : 'bg-[#04120c]'
        }`}
      >
        {/* Soft radial glow centered on envelope */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(197,160,89,0.16)_0%,rgba(6,28,21,0.85)_50%,#010604_100%)] pointer-events-none" />

        {/* Delicate Islamic geometric lattice overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23cca052' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='5' fill='none' stroke='%23cca052' stroke-width='0.7'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient floating golden dust particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#cca052]"
              style={{
                width: Math.random() * 3 + 1.5 + 'px',
                height: Math.random() * 3 + 1.5 + 'px',
                left: `${(i * 5.5 + 4)}%`,
                top: `${(i * 12 + 6) % 94}%`,
                opacity: 0.35,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [-15, -45, -15],
                x: [0, (i % 2 === 0 ? 12 : -12), 0],
                opacity: [0.15, 0.6, 0.15],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Bismillah Calligraphy (Closed Screen) */}
      <motion.div
        className="relative z-10 text-center mb-5 max-w-md px-2"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <p className="font-arabic text-2xl sm:text-3xl text-[#f3dec0] tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {weddingData.bismillahArabic}
        </p>
        <p className="font-cinzel text-[11px] sm:text-xs text-[#cca052]/80 uppercase tracking-[0.25em] mt-1">
          {weddingData.bismillahEnglish}
        </p>
      </motion.div>

      {/* 3D Envelope Container with Layered Physical Shadow */}
      <div
        className="relative z-20 perspective-1200 w-full max-w-[340px] sm:max-w-[470px] h-[260px] sm:h-[320px] flex items-center justify-center cursor-pointer my-2"
        onClick={triggerOpen}
        role="button"
        tabIndex={0}
        aria-label="Open royal wedding invitation"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            triggerOpen();
          }
        }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{
            scale: phase === 0 ? 1 : phase >= 5 ? 1.08 : 1.05,
            translateZ: phase === 0 ? 0 : 50,
            rotateX: phase >= 3 ? -6 : 0,
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={phase === 0 ? { scale: 1.025, rotateY: 3, rotateX: -2 } : {}}
        >
          {/* Deep Emerald Envelope Body with Intricate Gold Filigree & Paper Grain */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden envelope-texture border border-[#cca052]/50"
            style={{
              boxShadow:
                phase >= 1
                  ? '0 35px 70px -10px rgba(0, 0, 0, 0.95), 0 10px 25px rgba(0, 0, 0, 0.8), 0 0 50px rgba(197, 160, 89, 0.35)'
                  : '0 20px 45px -8px rgba(0, 0, 0, 0.85), 0 8px 18px rgba(0, 0, 0, 0.7), 0 0 25px rgba(197, 160, 89, 0.15)',
            }}
          >
            {/* Islamic Girih Star Lattice Texture */}
            <GirihLatticePattern />

            {/* Intricate Gold Borders & Large Ornate Arabesque Corner Spandrels */}
            <IntricateGoldBorder />
            <OrnateCornerSpandrel position="tl" size={72} className="absolute top-1 left-1 opacity-90" />
            <OrnateCornerSpandrel position="tr" size={72} className="absolute top-1 right-1 opacity-90" />
            <OrnateCornerSpandrel position="bl" size={72} className="absolute bottom-1 left-1 opacity-90" />
            <OrnateCornerSpandrel position="br" size={72} className="absolute bottom-1 right-1 opacity-90" />

            {/* Subtle Damask Watermark Across Envelope Body */}
            <div
              className="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C35 15, 45 20, 55 20 C45 25, 40 35, 45 45 C35 40, 25 40, 15 45 C20 35, 15 25, 5 20 C15 20, 25 15, 30 5 Z' fill='none' stroke='%23cca052' stroke-width='0.8'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23cca052'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Golden light bloom from within when flap opens */}
            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-x-6 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(252,232,166,0.7)_0%,rgba(197,160,89,0.4)_40%,transparent_70%)] pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          {/* INNER INVITATION CARD WITH DEDICATED NIKAH & VALIMA DATE REVEAL */}
          <motion.div
            className="absolute inset-x-3 sm:inset-x-5 top-2 bottom-2 rounded-xl paper-card-texture border-2 border-[#dfba73] shadow-2xl p-4 sm:p-5 flex flex-col justify-between text-center overflow-hidden preserve-3d"
            style={{
              zIndex: phase >= 4 ? 30 : 5,
            }}
            animate={{
              y: phase >= 4 ? (phase >= 5 ? -175 : -100) : 0,
              scale: phase >= 5 ? 1.08 : 1,
            }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Card Ornamental Gold Border */}
            <div className="absolute inset-1.5 border border-[#cca052]/40 rounded-lg pointer-events-none" />
            <ArabesqueCorner position="tl" size={32} className="absolute top-1.5 left-1.5 opacity-90" />
            <ArabesqueCorner position="tr" size={32} className="absolute top-1.5 right-1.5 opacity-90" />
            <ArabesqueCorner position="bl" size={32} className="absolute bottom-1.5 left-1.5 opacity-90" />
            <ArabesqueCorner position="br" size={32} className="absolute bottom-1.5 right-1.5 opacity-90" />

            {/* Inner Card Header */}
            <div className="relative z-10 w-full">
              <p className="font-arabic text-base sm:text-lg text-[#0b291e] font-bold">
                {weddingData.bismillahArabic}
              </p>
              <div className="flex items-center justify-center gap-2 my-0.5">
                <span className="h-[1px] w-6 bg-[#cca052]" />
                <IslamicStarKhatim size={12} className="text-[#cca052]" />
                <span className="h-[1px] w-6 bg-[#cca052]" />
              </div>
            </div>

            {/* Inner Card Central Names */}
            <div className="relative z-10 py-0.5">
              <h2 className="font-cinzel text-base sm:text-xl font-bold text-[#082018] tracking-wider leading-tight">
                {weddingData.couple.groom.name}
              </h2>
              <p className="font-arabic text-sm text-[#cca052] font-semibold">
                و
              </p>
              <h2 className="font-cinzel text-base sm:text-xl font-bold text-[#082018] tracking-wider leading-tight">
                {weddingData.couple.bride.name}
              </h2>
            </div>

            {/* ★ NIKAH & VALIMA DATE REVEAL CONTAINER ★ */}
            <motion.div
              className="relative z-10 rounded-lg p-2.5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(247,242,230,0.85)_100%)] border border-[#cca052]/50 shadow-sm"
              animate={
                phase >= 5
                  ? {
                      scale: [0.95, 1.02, 1],
                      boxShadow: [
                        '0 0 0 rgba(223,184,108,0)',
                        '0 0 15px rgba(223,184,108,0.6)',
                        '0 0 5px rgba(223,184,108,0.3)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.2 }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-[#cca052]" />
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-[#826127] tracking-[0.2em] uppercase">
                  CEREMONIAL DATES REVEALED
                </span>
                <Sparkles className="w-3 h-3 text-[#cca052]" />
              </div>

              {/* Dual Date Showcase */}
              <div className="grid grid-cols-2 gap-2 text-left pt-1 border-t border-[#cca052]/30">
                {/* Nikah Date */}
                <div className="bg-[#0b291e] text-[#fce8a6] p-1.5 sm:p-2 rounded border border-[#cca052]/40">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[9px] sm:text-[10px] font-bold tracking-wider text-[#cca052]">
                      NIKAH
                    </span>
                    <span className="font-arabic text-[10px] text-[#cca052]">
                      النِّكَاح
                    </span>
                  </div>
                  <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] text-white mt-0.5 leading-tight">
                    Thu, 22 Oct 2026
                  </p>
                  <p className="font-sans-clean text-[9px] text-[#dfba73] mt-0.5">
                    12:30 PM · Madhugiri
                  </p>
                </div>

                {/* Valima Date */}
                <div className="bg-[#0b291e] text-[#fce8a6] p-1.5 sm:p-2 rounded border border-[#cca052]/40">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[9px] sm:text-[10px] font-bold tracking-wider text-[#cca052]">
                      VALIMA
                    </span>
                    <span className="font-arabic text-[10px] text-[#cca052]">
                      الوليمة
                    </span>
                  </div>
                  <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] text-white mt-0.5 leading-tight">
                    Sat, 24 Oct 2026
                  </p>
                  <p className="font-sans-clean text-[9px] text-[#dfba73] mt-0.5">
                    7:30 PM · Sira
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ENVELOPE TOP TRIANGULAR FLAP (WITH INTRICATE GOLD FILIGREE LACEWORK) */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 preserve-3d"
            style={{
              transformOrigin: 'top center',
              zIndex: phase >= 3 ? 10 : 40,
            }}
            animate={{
              rotateX: phase >= 3 ? 180 : 0,
            }}
            transition={{
              duration: 1.25,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {/* Front facing flap (closed) with Intricate Gold Filigree Lace */}
            <div
              className="absolute inset-0 envelope-texture backface-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderTop: '1.5px solid rgba(223, 184, 108, 0.7)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
              }}
            >
              {/* Intricate Gold Filigree Lace SVG */}
              <EnvelopeFlapFiligree className="opacity-95" />

              {/* Edge highlight along the flap bevel */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(1.5% 1.5%, 98.5% 1.5%, 50% 97%)',
                  border: '1px solid rgba(252, 232, 166, 0.35)',
                }}
              />
            </div>

            {/* Back facing flap (when opened) with Luxury Gold Silk Lining */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#061d15] to-[#04140f] border-t border-[#cca052]/40"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'rotateY(180deg) rotateZ(180deg)',
                backfaceVisibility: 'hidden',
                backgroundImage: `radial-gradient(rgba(223, 184, 108, 0.12) 1.5px, transparent 1.5px)`,
                backgroundSize: '16px 16px',
              }}
            />
          </motion.div>

          {/* ENVELOPE FRONT POCKET (Left, Right, Bottom triangular folds with gold trims) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 25 }}
          >
            {/* Bottom triangular pocket with gold foil edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 envelope-texture"
              style={{
                clipPath: 'polygon(0 100%, 50% 35%, 100% 100%)',
                boxShadow: '0 -6px 18px rgba(0,0,0,0.5)',
                borderBottom: '1.5px solid rgba(223, 184, 108, 0.5)',
              }}
            >
              {/* Bottom fold gold filigree accent */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(2% 98%, 50% 37%, 98% 98%)',
                  borderTop: '1px solid rgba(223, 184, 108, 0.35)',
                }}
              />
            </div>

            {/* Left triangle fold with gold seam */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 envelope-texture"
              style={{
                clipPath: 'polygon(0 0, 0 100%, 65% 55%)',
                opacity: 0.96,
                borderLeft: '1px solid rgba(223, 184, 108, 0.4)',
              }}
            />

            {/* Right triangle fold with gold seam */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 envelope-texture"
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 35% 55%)',
                opacity: 0.96,
                borderRight: '1px solid rgba(223, 184, 108, 0.4)',
              }}
            />

            {/* Intricate Gold Filigree Lace Bordering Along Diagonal Seams */}
            <EnvelopePocketSeamFiligree className="opacity-90" />
          </div>

          {/* ★ GRAND CENTER KHATIM MEDALLION (Frames the wax seal in gold filigree) ★ */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 43 }}
          >
            <EnvelopeCenterMedallion
              size={210}
              className={`transition-all duration-700 ${
                phase >= 3 ? 'opacity-20 scale-95' : 'opacity-95 scale-100'
              }`}
            />
          </div>

          {/* ★ ROYAL WAX SEAL WITH PRONOUNCED 3D DEPTH & LAYERED SHADOWS ★ */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 45 }}
          >
            <RoyalWaxSeal
              phase={phase}
              size={114}
              onClick={triggerOpen}
            />
          </div>
        </motion.div>
      </div>

      {/* Subtitle Below Closed Invitation */}
      <motion.div
        className="relative z-10 text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="font-cormorant italic text-base sm:text-lg text-[#cca052]/90 tracking-wide">
          Together with their families
        </p>

        {/* TAP TO OPEN & PLAY SONG with gentle glowing animated indicator */}
        <motion.button
          onClick={triggerOpen}
          className="mt-4 px-8 py-3.5 rounded-full border border-[#cca052]/80 bg-[#09261c]/95 backdrop-blur-md text-[#fce8a6] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-[#fce8a6] hover:bg-[#0c3325] transition-all flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(197,160,89,0.3)] cursor-pointer"
          animate={{
            boxShadow: [
              '0 0 12px rgba(197,160,89,0.25)',
              '0 0 32px rgba(223,184,108,0.6)',
              '0 0 12px rgba(197,160,89,0.25)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Music className="w-4 h-4 text-[#cca052] animate-bounce" />
          <span>TAP TO OPEN &amp; PLAY SONG</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#cca052] animate-ping" />
        </motion.button>

        {/* Discreet skip affordance if visitor wants instant entry */}
        <button
          onClick={handleInstantOpen}
          className="mt-3 text-[11px] font-cinzel tracking-widest text-[#cca052]/50 hover:text-[#cca052] transition-colors block mx-auto underline uppercase"
        >
          Skip animation &amp; view card
        </button>
      </motion.div>

      {/* ★ CEREMONIAL DATE REVEAL FULLSCREEN OVERLAY (Phase 5) ★ */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 pointer-events-none bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#061d15] border-2 border-[#dfba73] shadow-[0_0_50px_rgba(197,160,89,0.4)] text-center text-[#fce8a6]"
            >
              <IslamicStarKhatim size={36} className="text-[#cca052] mx-auto mb-2 animate-pulse" />
              <p className="font-arabic text-xl text-[#dfba73] mb-1">
                {weddingData.bismillahArabic}
              </p>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#fce8a6] uppercase mb-4">
                The Blessed Dates Revealed
              </h3>

              <div className="grid grid-cols-2 gap-3 my-4">
                {/* Nikah Card */}
                <div className="p-3 rounded-xl bg-[#092b1f] border border-[#cca052]/40 text-left">
                  <span className="font-arabic text-xs text-[#cca052] block">النِّكَاح</span>
                  <span className="font-cinzel text-xs font-bold text-[#dfba73] uppercase tracking-wider block">
                    NIKAH
                  </span>
                  <p className="font-sans-clean text-xs font-bold text-white mt-1">
                    Thu, 22 Oct 2026
                  </p>
                  <p className="font-sans-clean text-[11px] text-[#dfba73]">
                    12:30 PM · Madhugiri
                  </p>
                </div>

                {/* Valima Card */}
                <div className="p-3 rounded-xl bg-[#092b1f] border border-[#cca052]/40 text-left">
                  <span className="font-arabic text-xs text-[#cca052] block">الوليمة</span>
                  <span className="font-cinzel text-xs font-bold text-[#dfba73] uppercase tracking-wider block">
                    VALIMA
                  </span>
                  <p className="font-sans-clean text-xs font-bold text-white mt-1">
                    Sat, 24 Oct 2026
                  </p>
                  <p className="font-sans-clean text-[11px] text-[#dfba73]">
                    7:30 PM · Sira
                  </p>
                </div>
              </div>

              <p className="font-cormorant italic text-xs sm:text-sm text-[#cca052]/80 mt-2">
                "Beginning the sacred journey in your gracious presence"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

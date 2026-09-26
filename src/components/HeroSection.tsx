import React from 'react';
import { motion } from 'motion/react';
import { ArabesqueCorner, IslamicStarKhatim, MoorishArchHeader } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative py-16 sm:py-24 px-4 overflow-hidden flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Handcrafted Invitation Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl paper-card-texture text-[#152a22] rounded-2xl p-8 sm:p-14 border-2 border-[#dfba73] shadow-[0_25px_70px_rgba(0,0,0,0.7)] text-center my-4 overflow-hidden"
      >
        {/* Double Gold Filigree Borders */}
        <div className="absolute inset-2.5 sm:inset-3.5 border border-[#cca052]/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-dashed border-[#cca052]/30 rounded-lg pointer-events-none" />

        {/* 4 Arabesque Corner Ornaments */}
        <ArabesqueCorner position="tl" size={60} className="absolute top-2.5 left-2.5 opacity-90" />
        <ArabesqueCorner position="tr" size={60} className="absolute top-2.5 right-2.5 opacity-90" />
        <ArabesqueCorner position="bl" size={60} className="absolute bottom-2.5 left-2.5 opacity-90" />
        <ArabesqueCorner position="br" size={60} className="absolute bottom-2.5 right-2.5 opacity-90" />

        {/* Moorish Arch Silhouette Header */}
        <div className="relative z-10 mb-4">
          <MoorishArchHeader />
        </div>

        {/* Bismillah in Arabic Calligraphy */}
        <div className="relative z-10 mb-4">
          <h1 className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-[#0b291e] font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] leading-relaxed">
            {weddingData.bismillahArabic}
          </h1>
          <p className="font-cormorant italic text-sm sm:text-base text-[#8d6a2a] mt-2 font-medium tracking-wide">
            {weddingData.bismillahEnglish}
          </p>
        </div>

        {/* Decorative Separator with 8-pointed star */}
        <div className="relative z-10 flex items-center justify-center gap-3 my-6">
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#cca052] to-transparent" />
          <IslamicStarKhatim size={18} className="text-[#cca052]" />
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#cca052] to-transparent" />
        </div>

        {/* Invitation Message */}
        <div className="relative z-10 max-w-lg mx-auto mb-8">
          <p className="font-cormorant text-base sm:text-lg text-[#233f34] leading-relaxed tracking-wide">
            Together with their families,
            <br />
            cordially invite you to celebrate the marriage of
          </p>
        </div>

        {/* Central Couple Names with Gold Framing */}
        <div className="relative z-10 py-6 px-4 my-2 max-w-xl mx-auto rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(247,242,230,0.4)_100%)] border border-[#cca052]/30 shadow-inner">
          <div className="text-center">
            {/* Groom Name */}
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-[#061e16] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {weddingData.couple.groom.fullName}
            </h2>

            {/* Arabic connector 'و' */}
            <div className="my-2 flex items-center justify-center gap-3">
              <span className="h-[1px] w-16 bg-[#cca052]/60" />
              <span className="font-arabic text-2xl sm:text-3xl text-[#b58636] font-bold">
                و
              </span>
              <span className="h-[1px] w-16 bg-[#cca052]/60" />
            </div>

            {/* Bride Name */}
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-[#061e16] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {weddingData.couple.bride.fullName}
            </h2>
          </div>
        </div>

        {/* ★ DEDICATED NIKAH & VALIMA CEREMONIAL DATES REVEAL ★ */}
        <div className="relative z-10 mt-10 pt-6 border-t border-[#cca052]/40">
          <div className="flex items-center justify-center gap-2 mb-4">
            <IslamicStarKhatim size={16} className="text-[#cca052]" />
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#735117]">
              THE SACRED CEREMONIAL DATES
            </span>
            <IslamicStarKhatim size={16} className="text-[#cca052]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {/* NIKAH DATE REVEAL CARD */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#08281d] to-[#04140f] text-[#fce8a6] border-2 border-[#dfba73] shadow-lg overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#cca052] uppercase">
                  NIKAH CEREMONY
                </span>
                <span className="font-arabic text-sm text-[#cca052] font-bold">
                  النِّكَاح
                </span>
              </div>

              <p className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                Thursday, 22nd Oct 2026
              </p>

              <div className="mt-2 space-y-1 text-xs font-sans-clean text-[#dfba73]">
                <p className="flex items-center gap-1.5 font-medium">
                  <span className="text-white font-bold">12:30 PM</span> · Lunch After Nikah
                </p>
                <p className="text-white/80">
                  HSR Shadi Mahal, Madhugiri
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#cca052]/30 flex items-center justify-between">
                <a
                  href="#nikah"
                  className="font-cinzel text-[11px] text-[#fce8a6] hover:text-white underline tracking-wider uppercase"
                >
                  View Details &amp; Map →
                </a>
                <span className="text-[10px] font-cinzel text-[#cca052]/80 uppercase tracking-widest">
                  Madhugiri
                </span>
              </div>
            </div>

            {/* VALIMA DATE REVEAL CARD */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#08281d] via-[#051811] to-[#1a080d] text-[#fce8a6] border-2 border-[#dfba73] shadow-lg overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#cca052] uppercase">
                  VALIMA RECEPTION
                </span>
                <span className="font-arabic text-sm text-[#cca052] font-bold">
                  الوليمة
                </span>
              </div>

              <p className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                Saturday, 24th Oct 2026
              </p>

              <div className="mt-2 space-y-1 text-xs font-sans-clean text-[#dfba73]">
                <p className="flex items-center gap-1.5 font-medium">
                  <span className="text-white font-bold">7:30 PM</span> · Valima Dinner
                </p>
                <p className="text-white/80">
                  Jamiya Shadi Mahal, Sira
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#cca052]/30 flex items-center justify-between">
                <a
                  href="#valima"
                  className="font-cinzel text-[11px] text-[#fce8a6] hover:text-white underline tracking-wider uppercase"
                >
                  View Details &amp; Map →
                </a>
                <span className="text-[10px] font-cinzel text-[#cca052]/80 uppercase tracking-widest">
                  Sira
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTA to Video Invitation */}
          <div className="mt-8 text-center">
            <a
              href="#video"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#cca052] via-[#dfba73] to-[#cca052] text-[#04140f] font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 shadow-[0_4px_20px_rgba(204,160,82,0.35)] transition-all group"
            >
              <span>▶ Watch Video Invitation (MP4)</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

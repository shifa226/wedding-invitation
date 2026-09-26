import React from 'react';
import { motion } from 'motion/react';
import { ArabesqueCorner, IslamicStarKhatim } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  return (
    <section id="couple" className="relative py-20 px-4 max-w-5xl mx-auto text-center">
      {/* Subtle section kicker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="h-[1px] w-10 bg-[#cca052]/50" />
        <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#cca052]">
          United in Sacred Covenant
        </span>
        <span className="h-[1px] w-10 bg-[#cca052]/50" />
      </div>

      <h2 className="font-arabic text-3xl sm:text-4xl text-[#f3dec0] mb-8">
        العروسين المباركين
      </h2>

      {/* Hero Couple Portrait Frame & Names */}
      <div className="relative max-w-2xl mx-auto bg-[#061d15] border border-[#cca052]/40 rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle animated golden radial glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.15)_0%,transparent_70%)] pointer-events-none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <ArabesqueCorner position="tl" size={48} className="absolute top-2 left-2 opacity-80" />
        <ArabesqueCorner position="tr" size={48} className="absolute top-2 right-2 opacity-80" />
        <ArabesqueCorner position="bl" size={48} className="absolute bottom-2 left-2 opacity-80" />
        <ArabesqueCorner position="br" size={48} className="absolute bottom-2 right-2 opacity-80" />

        {/* Editorial Photo Frame */}
        <div className="relative mx-auto max-w-sm rounded-xl overflow-hidden border-2 border-[#dfba73] shadow-2xl mb-8 group">
          <img
            src={weddingData.couplePhoto}
            alt="Syed Irfan and Mehek S."
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="font-arabic text-lg text-[#fce8a6] drop-shadow-md">
              {weddingData.couple.arabicNames}
            </span>
          </div>
        </div>

        {/* The Couple Names Lockup */}
        <div className="relative z-10 space-y-3">
          <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-[#fce8a6]">
            {weddingData.couple.groom.fullName}
          </h3>

          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-[1px] w-12 bg-[#cca052]" />
            <span className="text-[#cca052] text-xl font-serif">♡</span>
            <span className="h-[1px] w-12 bg-[#cca052]" />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-[#fce8a6]">
            {weddingData.couple.bride.fullName}
          </h3>

          {/* Surah Ar-Rum Quote */}
          <div className="pt-6 max-w-md mx-auto">
            <p className="font-arabic text-lg text-[#e8cc87] leading-relaxed">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            </p>
            <p className="font-cormorant italic text-xs sm:text-sm text-[#cca052]/80 mt-1">
              "And among His signs is that He created for you mates from among yourselves, that you may dwell in peace."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

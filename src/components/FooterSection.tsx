import React from 'react';
import { motion } from 'motion/react';
import { IslamicStarKhatim, ArabesqueCorner, MoorishArchHeader } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

interface FooterSectionProps {
  onReopenEnvelope: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onReopenEnvelope }) => {
  return (
    <footer className="relative pt-24 pb-16 px-4 text-center overflow-hidden bg-gradient-to-b from-transparent via-[#04140f] to-[#010604]">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,160,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <MoorishArchHeader className="opacity-70 mb-6" />

        {/* Arabic With Love */}
        <p className="font-arabic text-3xl sm:text-4xl text-[#fce8a6] mb-1 font-bold">
          بِكُلِّ حُبٍّ
        </p>

        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#cca052] mb-6">
          WITH LOVE
        </p>

        {/* Couple Names */}
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#fce8a6] mb-1">
          {weddingData.couple.groom.fullName}
        </h3>
        <p className="font-cormorant italic text-xl text-[#cca052] my-1">&amp;</p>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#fce8a6] mb-8">
          {weddingData.couple.bride.fullName}
        </h3>

        {/* JazakAllahu Khairan */}
        <div className="py-6 px-4 rounded-2xl bg-[#061d15]/60 border border-[#cca052]/20 mb-8 max-w-md mx-auto">
          <p className="font-arabic text-2xl text-[#f3dec0] mb-2">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="font-cormorant text-base sm:text-lg text-[#dfba73] italic">
            "JazakAllahu Khairan for being part of our special day and keeping us in your prayers."
          </p>
        </div>

        {/* Golden Arabesque Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-3 my-8"
        >
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#cca052]" />
          <IslamicStarKhatim size={24} className="text-[#cca052]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#cca052]" />
        </motion.div>

        {/* Re-open invitation affordance */}
        <div className="mb-8">
          <button
            onClick={onReopenEnvelope}
            className="text-xs font-cinzel text-[#cca052] hover:text-[#fce8a6] underline tracking-widest uppercase transition-colors"
          >
            ↺ Re-seal and Open the 3D Invitation Again
          </button>
        </div>

        {/* Quiet copyright */}
        <p className="text-[11px] font-cinzel text-[#cca052]/60 tracking-widest uppercase">
          © 2026 {weddingData.couple.groom.name} &amp; {weddingData.couple.bride.name} · Royal Islamic Wedding
        </p>
      </div>
    </footer>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ArabesqueCorner, IslamicStarKhatim, MoorishArchHeader } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const FamilySection: React.FC = () => {
  const { familyGroom, familyBride } = weddingData;

  return (
    <section id="families" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="font-arabic text-2xl sm:text-3xl text-[#cca052] mb-1">
          عائلاتنا الكريمة
        </p>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#fce8a6] uppercase">
          With Blessings of Our Families
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#cca052] to-transparent mx-auto mt-3" />
      </div>

      {/* Two Elegant Arabic Architectural Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* CARD 1: THE GROOM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#061d15]/90 border border-[#cca052]/40 rounded-2xl p-7 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Islamic lattice background */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

          {/* Gold Arabesque Corners */}
          <ArabesqueCorner position="tl" size={40} className="absolute top-2 left-2 opacity-70" />
          <ArabesqueCorner position="tr" size={40} className="absolute top-2 right-2 opacity-70" />
          <ArabesqueCorner position="bl" size={40} className="absolute bottom-2 left-2 opacity-70" />
          <ArabesqueCorner position="br" size={40} className="absolute bottom-2 right-2 opacity-70" />

          <div>
            {/* Header Tag */}
            <div className="text-center mb-6">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#cca052] font-semibold">
                {familyGroom.title}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce8a6] mt-1 tracking-wider">
                {familyGroom.fullName}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="h-[1px] w-8 bg-[#cca052]/50" />
                <IslamicStarKhatim size={14} className="text-[#cca052]" />
                <span className="h-[1px] w-8 bg-[#cca052]/50" />
              </div>
            </div>

            {/* Structured Lineage Details */}
            <div className="space-y-5 text-center sm:text-left mt-6">
              {/* Parents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Parents
                </p>
                <p className="font-cormorant text-lg font-semibold text-[#fce8a6]">
                  {familyGroom.parents}
                </p>
                {familyGroom.parentsDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyGroom.parentsDetail}
                  </p>
                )}
              </div>

              {/* Paternal Grandparents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Paternal Lineage
                </p>
                <p className="font-cormorant text-base sm:text-lg font-medium text-[#fce8a6]">
                  {familyGroom.paternalGrand}
                </p>
                {familyGroom.paternalGrandDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyGroom.paternalGrandDetail}
                  </p>
                )}
              </div>

              {/* Maternal Grandparents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Maternal Lineage
                </p>
                <p className="font-cormorant text-base sm:text-lg font-medium text-[#fce8a6]">
                  {familyGroom.maternalGrand}
                </p>
                {familyGroom.maternalGrandDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyGroom.maternalGrandDetail}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#cca052]/20 text-center">
            <span className="font-cinzel text-[11px] text-[#cca052]/70 tracking-widest uppercase">
              Sira, Karnataka
            </span>
          </div>
        </motion.div>

        {/* CARD 2: THE BRIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-[#061d15]/90 border border-[#cca052]/40 rounded-2xl p-7 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Islamic lattice background */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

          {/* Gold Arabesque Corners */}
          <ArabesqueCorner position="tl" size={40} className="absolute top-2 left-2 opacity-70" />
          <ArabesqueCorner position="tr" size={40} className="absolute top-2 right-2 opacity-70" />
          <ArabesqueCorner position="bl" size={40} className="absolute bottom-2 left-2 opacity-70" />
          <ArabesqueCorner position="br" size={40} className="absolute bottom-2 right-2 opacity-70" />

          <div>
            {/* Header Tag */}
            <div className="text-center mb-6">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#cca052] font-semibold">
                {familyBride.title}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce8a6] mt-1 tracking-wider">
                {familyBride.fullName}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="h-[1px] w-8 bg-[#cca052]/50" />
                <IslamicStarKhatim size={14} className="text-[#cca052]" />
                <span className="h-[1px] w-8 bg-[#cca052]/50" />
              </div>
            </div>

            {/* Structured Lineage Details */}
            <div className="space-y-5 text-center sm:text-left mt-6">
              {/* Parents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Parents
                </p>
                <p className="font-cormorant text-lg font-semibold text-[#fce8a6]">
                  {familyBride.parents}
                </p>
                {familyBride.parentsDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyBride.parentsDetail}
                  </p>
                )}
              </div>

              {/* Paternal Grandparents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Paternal Lineage
                </p>
                <p className="font-cormorant text-base sm:text-lg font-medium text-[#fce8a6]">
                  {familyBride.paternalGrand}
                </p>
                {familyBride.paternalGrandDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyBride.paternalGrandDetail}
                  </p>
                )}
              </div>

              {/* Maternal Grandparents */}
              <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20">
                <p className="text-xs font-cinzel text-[#cca052] uppercase tracking-wider mb-0.5">
                  Maternal Lineage
                </p>
                <p className="font-cormorant text-base sm:text-lg font-medium text-[#fce8a6]">
                  {familyBride.maternalGrand}
                </p>
                {familyBride.maternalGrandDetail && (
                  <p className="text-xs font-sans-clean text-[#dfba73]/80 mt-0.5">
                    {familyBride.maternalGrandDetail}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#cca052]/20 text-center">
            <span className="font-cinzel text-[11px] text-[#cca052]/70 tracking-widest uppercase">
              Madhugiri, Karnataka
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

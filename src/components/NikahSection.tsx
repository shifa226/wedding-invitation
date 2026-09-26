import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Utensils, ExternalLink } from 'lucide-react';
import { ArabesqueCorner, IslamicStarKhatim, MoorishArchHeader } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const NikahSection: React.FC = () => {
  const { nikah } = weddingData;

  return (
    <section id="nikah" className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Nikah Ceremonial Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-b from-[#061d15] to-[#04140f] border-2 border-[#dfba73] rounded-3xl p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center overflow-hidden"
      >
        {/* Arabesque corner detailing */}
        <ArabesqueCorner position="tl" size={56} className="absolute top-2 left-2 opacity-85" />
        <ArabesqueCorner position="tr" size={56} className="absolute top-2 right-2 opacity-85" />
        <ArabesqueCorner position="bl" size={56} className="absolute bottom-2 left-2 opacity-85" />
        <ArabesqueCorner position="br" size={56} className="absolute bottom-2 right-2 opacity-85" />

        {/* Decorative Moorish Arch Header */}
        <div className="mb-4">
          <MoorishArchHeader />
        </div>

        {/* Arabic & English Headings */}
        <h2 className="font-arabic text-4xl sm:text-5xl lg:text-6xl text-[#fce8a6] mb-1 font-bold drop-shadow-md">
          {nikah.arabicTitle}
        </h2>
        <p className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.3em] uppercase text-[#cca052] mb-6">
          {nikah.title}
        </p>

        {/* 8-pointed star separator */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#cca052] to-transparent" />
          <IslamicStarKhatim size={20} className="text-[#cca052]" />
          <span className="h-[1px] w-20 bg-gradient-to-l from-transparent via-[#cca052] to-transparent" />
        </div>

        {/* Venue Photographic Showcase */}
        <div className="relative max-w-2xl mx-auto rounded-xl overflow-hidden border border-[#cca052]/40 shadow-2xl mb-10 group">
          <img
            src={nikah.image}
            alt={nikah.venue}
            className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04140f] via-black/30 to-transparent" />
          <div className="absolute bottom-4 inset-x-4 text-center">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#cca052] bg-[#04140f]/80 px-3 py-1 rounded-full border border-[#cca052]/40">
              HSR Shadi Mahal
            </span>
          </div>
        </div>

        {/* Core Nikah Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10 text-center">
          {/* Date */}
          <div className="p-5 rounded-2xl bg-[#08281d]/70 border border-[#cca052]/30 flex flex-col items-center">
            <Calendar className="w-6 h-6 text-[#cca052] mb-2" />
            <p className="font-cinzel text-xs text-[#cca052] uppercase tracking-wider mb-1">
              Day &amp; Date
            </p>
            <p className="font-cormorant text-xl font-bold text-[#fce8a6]">
              {nikah.dayOfWeek}
            </p>
            <p className="font-sans-clean text-sm text-[#fce8a6]/90 mt-0.5 font-medium">
              {nikah.date}
            </p>
          </div>

          {/* Time */}
          <div className="p-5 rounded-2xl bg-[#08281d]/70 border border-[#cca052]/30 flex flex-col items-center">
            <Clock className="w-6 h-6 text-[#cca052] mb-2" />
            <p className="font-cinzel text-xs text-[#cca052] uppercase tracking-wider mb-1">
              Ceremony Time
            </p>
            <p className="font-cormorant text-xl font-bold text-[#fce8a6]">
              {nikah.time}
            </p>
            <p className="font-sans-clean text-xs text-[#dfba73]/80 mt-1">
              Sharp Insha’Allah
            </p>
          </div>

          {/* Lunch Feast Note */}
          <div className="p-5 rounded-2xl bg-[#08281d]/70 border border-[#cca052]/30 flex flex-col items-center">
            <Utensils className="w-6 h-6 text-[#cca052] mb-2" />
            <p className="font-cinzel text-xs text-[#cca052] uppercase tracking-wider mb-1">
              Hospitality
            </p>
            <p className="font-cormorant text-xl font-bold text-[#fce8a6]">
              {nikah.mealNote}
            </p>
            <p className="font-sans-clean text-xs text-[#dfba73]/80 mt-1">
              Royal Wedding Feast
            </p>
          </div>
        </div>

        {/* Venue & Location Address Card */}
        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#061d15] border border-[#cca052]/40 shadow-inner">
          <MapPin className="w-6 h-6 text-[#cca052] mx-auto mb-2" />
          <h3 className="font-cinzel text-2xl font-bold text-[#fce8a6] tracking-wide mb-1">
            {nikah.venue}
          </h3>
          <p className="text-sm font-sans-clean text-[#dfba73] mb-1">
            {nikah.address}
          </p>
          <p className="text-xs font-cinzel tracking-widest text-[#cca052] uppercase mb-5">
            {nikah.city}, Karnataka
          </p>

          <a
            href={nikah.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#cca052] text-[#fce8a6] hover:bg-[#cca052] hover:text-[#04140f] font-cinzel text-xs tracking-widest uppercase transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>VIEW LOCATION</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

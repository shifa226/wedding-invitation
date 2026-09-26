import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { ArabesqueCorner, IslamicStarKhatim } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const LocationSection: React.FC = () => {
  const { nikah, valima } = weddingData;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyAddress = (addressText: string, index: number) => {
    navigator.clipboard.writeText(addressText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="location" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="font-arabic text-3xl sm:text-4xl text-[#cca052] mb-1 font-bold">
          مواقع الحفل
        </p>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#fce8a6] uppercase">
          CEREMONIAL VENUES
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#cca052] to-transparent mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* CARD 1: NIKAH LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-b from-[#061e16] to-[#04140f] border border-[#cca052]/40 rounded-2xl p-8 sm:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
        >
          <ArabesqueCorner position="tl" size={44} className="absolute top-2 left-2 opacity-70" />
          <ArabesqueCorner position="br" size={44} className="absolute bottom-2 right-2 opacity-70" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <IslamicStarKhatim size={16} className="text-[#cca052]" />
              <span className="font-cinzel text-xs tracking-[0.25em] text-[#cca052] uppercase font-semibold">
                NIKAH CEREMONY VENUE
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce8a6] mb-2 tracking-wide">
              {nikah.venue}
            </h3>

            <p className="font-sans-clean text-base text-[#dfba73] mb-1">
              {nikah.address}
            </p>

            <p className="font-cinzel text-xs tracking-widest text-[#cca052] uppercase mb-4">
              {nikah.city}, Karnataka
            </p>

            <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20 mb-6 text-xs text-[#dfba73]/80">
              <span className="font-cinzel text-[#cca052] font-semibold block mb-0.5">
                TIMING &amp; FEAST:
              </span>
              <span>Thursday, 22nd October 2026 · 12:30 PM (Lunch After Nikah)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#cca052]/20">
            <a
              href={nikah.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#cca052] text-[#fce8a6] hover:bg-[#cca052] hover:text-[#04140f] font-cinzel text-xs tracking-widest uppercase transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            >
              <Navigation className="w-4 h-4" />
              <span>VIEW LOCATION</span>
            </a>

            <button
              onClick={() =>
                copyAddress(`${nikah.venue}, ${nikah.address}, ${nikah.city}`, 1)
              }
              className="w-full sm:w-auto px-4 py-3 rounded-full border border-[#cca052]/40 text-[#dfba73] hover:text-[#fce8a6] hover:border-[#cca052] font-cinzel text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
              title="Copy venue address"
            >
              {copiedIndex === 1 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* CARD 2: VALIMA LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gradient-to-b from-[#082218] via-[#051811] to-[#120508] border border-[#cca052]/40 rounded-2xl p-8 sm:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
        >
          <ArabesqueCorner position="tr" size={44} className="absolute top-2 right-2 opacity-70" />
          <ArabesqueCorner position="bl" size={44} className="absolute bottom-2 left-2 opacity-70" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <IslamicStarKhatim size={16} className="text-[#cca052]" />
              <span className="font-cinzel text-xs tracking-[0.25em] text-[#cca052] uppercase font-semibold">
                VALIMA RECEPTION VENUE
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fce8a6] mb-2 tracking-wide">
              {valima.venue}
            </h3>

            <p className="font-sans-clean text-base text-[#dfba73] mb-1">
              {valima.address}
            </p>

            <p className="font-cinzel text-xs tracking-widest text-[#cca052] uppercase mb-4">
              {valima.city}, Karnataka
            </p>

            <div className="p-3.5 rounded-xl bg-[#092b1f]/60 border border-[#cca052]/20 mb-6 text-xs text-[#dfba73]/80">
              <span className="font-cinzel text-[#cca052] font-semibold block mb-0.5">
                TIMING &amp; FEAST:
              </span>
              <span>Saturday, 24th October 2026 · Valima Dinner: 7:30 PM</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#cca052]/20">
            <a
              href={valima.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#cca052] text-[#fce8a6] hover:bg-[#cca052] hover:text-[#04140f] font-cinzel text-xs tracking-widest uppercase transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            >
              <Navigation className="w-4 h-4" />
              <span>VIEW LOCATION</span>
            </a>

            <button
              onClick={() =>
                copyAddress(`${valima.venue}, ${valima.address}, ${valima.city}`, 2)
              }
              className="w-full sm:w-auto px-4 py-3 rounded-full border border-[#cca052]/40 text-[#dfba73] hover:text-[#fce8a6] hover:border-[#cca052] font-cinzel text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
              title="Copy venue address"
            >
              {copiedIndex === 2 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ArabesqueCorner, IslamicStarKhatim } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-arabic text-3xl sm:text-4xl text-[#cca052] mb-1 font-bold">
          قصتنا
        </h2>
        <p className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#fce8a6] uppercase">
          OUR STORY
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#cca052] to-transparent mx-auto mt-3" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-[#cca052]/30 ml-4 sm:ml-32 space-y-12 py-4">
        {weddingData.story.map((chapter, idx) => (
          <motion.div
            key={chapter.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="relative pl-6 sm:pl-10"
          >
            {/* Timeline Marker (8-pointed Islamic Star) */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#051811] border border-[#cca052] flex items-center justify-center shadow-md">
              <IslamicStarKhatim size={14} className="text-[#cca052]" />
            </div>

            {/* Content Card */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#061d15]/85 border border-[#cca052]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <ArabesqueCorner position="tr" size={36} className="absolute top-1 right-1 opacity-60" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <span className="font-arabic text-xl text-[#cca052]">
                  {chapter.arabicTitle}
                </span>
                <span className="font-cinzel text-xs text-[#cca052]/80 uppercase tracking-widest">
                  {chapter.subtitle}
                </span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#fce8a6] mb-3 tracking-wide">
                {chapter.title}
              </h3>

              <p className="font-cormorant text-base sm:text-lg text-[#dfba73]/90 leading-relaxed">
                {chapter.narrative}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

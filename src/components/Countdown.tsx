import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IslamicStarKhatim } from './IslamicOrnaments';
import { weddingData } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingData.countdownTargetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto text-center">
      {/* Kicker */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="h-[1px] w-8 bg-[#cca052]/50" />
        <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#cca052]">
          Awaiting The Blessed Union
        </span>
        <span className="h-[1px] w-8 bg-[#cca052]/50" />
      </div>

      <h2 className="font-arabic text-2xl sm:text-3xl text-[#f3dec0] mb-8">
        العد التنازلي لعقد القران
      </h2>

      {/* Countdown Presentation */}
      <div className="bg-[#051a12]/80 border border-[#cca052]/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative p-4 sm:p-6 rounded-xl bg-gradient-to-b from-[#08281d] to-[#04140f] border border-[#cca052]/40 shadow-inner flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#cca052]/70" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#cca052]/70" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#cca052]/70" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#cca052]/70" />

              <motion.span
                key={unit.value}
                initial={{ opacity: 0.7, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fce8a6] tabular-nums tracking-wider"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>

              <span className="font-cinzel text-[10px] sm:text-xs text-[#cca052] tracking-[0.25em] uppercase mt-2">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#cca052]" />
          <IslamicStarKhatim size={16} className="text-[#cca052]" />
          <span className="text-xs font-cinzel text-[#cca052]/80 tracking-widest uppercase">
            Thursday, 22nd October 2026 Insha’Allah
          </span>
          <IslamicStarKhatim size={16} className="text-[#cca052]" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#cca052]" />
        </div>
      </div>
    </section>
  );
};

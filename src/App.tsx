import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Envelope3D } from './components/Envelope3D';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { CoupleSection } from './components/CoupleSection';
import { Countdown } from './components/Countdown';
import { FamilySection } from './components/FamilySection';
import { NikahSection } from './components/NikahSection';
import { ValimaSection } from './components/ValimaSection';
import { StorySection } from './components/StorySection';
import { LocationSection } from './components/LocationSection';
import { FooterSection } from './components/FooterSection';
import { MusicController } from './components/MusicController';

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpenComplete = () => {
    setIsOpened(true);
  };

  const handleReopenEnvelope = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030e0a] text-[#f4efe6] selection:bg-[#cca052]/30 selection:text-[#f8f1df]">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* 1. INITIAL CLOSED LUXURY INVITATION SCREEN */
          <motion.div
            key="closed-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <Envelope3D isOpen={isOpened} onOpenComplete={handleOpenComplete} />
          </motion.div>
        ) : (
          /* 2. REVEALED CINEMATIC WEDDING INVITATION WEBSITE */
          <motion.div
            key="opened-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full"
          >
            {/* Minimal Top Navigation */}
            <Navigation onReopenEnvelope={handleReopenEnvelope} />

            {/* Main Content Sections */}
            <main className="relative">
              {/* Main Invitation Reveal Card */}
              <HeroSection />

              {/* Cinematic Video Invitation Section */}
              <VideoSection />

              {/* Couple Section */}
              <CoupleSection />

              {/* Wedding Countdown */}
              <Countdown />

              {/* Family Lineage Section */}
              <FamilySection />

              {/* Sacred Nikah Section */}
              <NikahSection />

              {/* Grand Valima Section */}
              <ValimaSection />

              {/* Our Story Vertical Timeline */}
              <StorySection />

              {/* Ceremonial Locations with Map links */}
              <LocationSection />
            </main>

            {/* Closing Blessing & Footer */}
            <FooterSection onReopenEnvelope={handleReopenEnvelope} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Arabic Music Controller (Always available) */}
      <MusicController />
    </div>
  );
}

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface NavigationProps {
  onReopenEnvelope: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onReopenEnvelope }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Video', href: '#video' },
    { label: 'Couple', href: '#couple' },
    { label: 'Families', href: '#families' },
    { label: 'Nikah', href: '#nikah' },
    { label: 'Valima', href: '#valima' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#04140f]/90 backdrop-blur-md border-b border-[#cca052]/20 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-[#fce8a6] hover:text-white transition-colors flex items-center gap-2"
        >
          <span>{weddingData.couple.monogram}</span>
          <span className="text-[#cca052] font-normal text-xs tracking-widest hidden sm:inline">
            · ROYAL WEDDING
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-cinzel tracking-widest text-[#dfba73]/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#fce8a6] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Re-open Envelope */}
        <div className="flex items-center gap-2.5">
          <a
            href="#video"
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#cca052] to-[#dfba73] text-[#04140f] font-cinzel font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-md transition-all whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
          >
            <span>▶ Video (MP4)</span>
          </a>

          <button
            onClick={onReopenEnvelope}
            className="px-3 py-1.5 rounded-full border border-[#cca052]/60 text-[#fce8a6] hover:bg-[#cca052]/20 hover:border-[#cca052] font-cinzel text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer"
            title="Experience the 3D card opening again"
          >
            Re-Seal Card
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#cca052] hover:text-[#fce8a6] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030e0a]/95 border-b border-[#cca052]/30 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-cinzel text-sm text-[#fce8a6]/90 hover:text-white tracking-widest py-1 border-b border-[#cca052]/10"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onReopenEnvelope();
            }}
            className="text-left font-cinzel text-xs text-[#cca052] tracking-widest pt-2"
          >
            ↺ Re-seal &amp; Open Envelope Again
          </button>
        </div>
      )}
    </header>
  );
};

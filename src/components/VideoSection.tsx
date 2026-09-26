import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Download, Share2, Volume2, VolumeX, Maximize, Film, Check, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { IslamicStarKhatim, ArabesqueCorner } from './IslamicOrnaments';
import { arabicAudio } from '../utils/audioController';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const videoUrl = '/video/wedding-invitation.mp4';
  const downloadUrl = '/download-video';

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      // Pause background music so it doesn't clash with video audio
      arabicAudio.pause();
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Robust Direct File Download using fetch & blob with fallback
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(20);
    setDownloadSuccess(false);

    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Download failed');
      setDownloadProgress(60);

      const blob = await response.blob();
      setDownloadProgress(90);

      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = 'Syed-Irfan-Mehek-Wedding-Invitation.mp4';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      setDownloadProgress(100);
      setDownloadSuccess(true);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 2000);

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    } catch {
      // Fallback: direct browser link
      window.location.href = downloadUrl;
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${videoUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Syed Irfan & Mehek S. — Wedding Invitation Video',
          text: 'Watch and download the official royal wedding invitation video for Syed Irfan & Mehek S.',
          url: fullUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section id="video" className="relative py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center relative z-10"
      >
        {/* Arabic Title */}
        <p className="font-arabic text-3xl sm:text-4xl text-[#fce8a6] mb-1 font-bold">
          دَعْوَة زِفَاف مَرْئِيَّة
        </p>

        {/* English Title */}
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#fce8a6] uppercase">
          Cinematic Video Invitation
        </h2>

        <p className="font-cormorant italic text-base sm:text-lg text-[#dfba73] mt-2 max-w-lg mx-auto">
          Experience the full royal wedding invitation as a high-definition video with sacred Bismillah vocals
        </p>

        {/* Separator */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#cca052]" />
          <IslamicStarKhatim size={18} className="text-[#cca052]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#cca052]" />
        </div>

        {/* Video Player Card */}
        <div className="relative max-w-[340px] sm:max-w-[380px] mx-auto rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#0a2e21] via-[#04140f] to-[#020b08] border-2 border-[#cca052] shadow-[0_15px_50px_rgba(0,0,0,0.85)]">
          {/* Arabesque Corners */}
          <ArabesqueCorner className="top-2 left-2 w-8 h-8" />
          <ArabesqueCorner className="top-2 right-2 w-8 h-8 rotate-90" />
          <ArabesqueCorner className="bottom-2 left-2 w-8 h-8 -rotate-90" />
          <ArabesqueCorner className="bottom-2 right-2 w-8 h-8 rotate-180" />

          {/* Video Container (9:16 Vertical Aspect Ratio) */}
          <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-[#cca052]/40 shadow-inner group">
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              preload="metadata"
              controls={isPlaying}
              onPlay={() => {
                arabicAudio.pause();
                setIsPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleTogglePlay}
            />

            {/* Big Play Overlay (when paused) */}
            {!isPlaying && (
              <div
                onClick={handleTogglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30 group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#04140f]/90 border-2 border-[#cca052] flex items-center justify-center text-[#fce8a6] shadow-[0_0_30px_rgba(204,160,82,0.4)] group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#cca052] text-[#cca052] ml-1" />
                </div>
                <span className="mt-4 font-cinzel text-xs tracking-widest uppercase text-[#fce8a6] bg-[#04140f]/80 px-4 py-1.5 rounded-full border border-[#cca052]/50 shadow-md">
                  Watch Video Invitation
                </span>
                <span className="mt-1.5 text-[11px] font-sans-clean text-[#dfba73]/80">
                  43s · 1080p Full HD · Cinematic Audio
                </span>
              </div>
            )}

            {/* Quick in-video control strip (when paused or hover) */}
            {!isPlaying && (
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleTogglePlay}
                  className="pointer-events-auto p-2 rounded-full bg-[#04140f]/80 text-[#cca052] hover:text-[#fce8a6] border border-[#cca052]/40 transition-colors"
                  title="Play"
                  aria-label="Play"
                >
                  <Play className="w-4 h-4 fill-[#cca052]" />
                </button>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={handleToggleMute}
                    className="p-2 rounded-full bg-[#04140f]/80 text-[#cca052] hover:text-[#fce8a6] border border-[#cca052]/40 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full bg-[#04140f]/80 text-[#cca052] hover:text-[#fce8a6] border border-[#cca052]/40 transition-colors"
                    title="Fullscreen"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Actions: Download & Share */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {/* Primary Instant Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#b68228] via-[#e5bc68] to-[#b68228] text-[#04140f] font-cinzel font-bold text-xs tracking-widest uppercase hover:brightness-110 shadow-[0_6px_24px_rgba(204,160,82,0.45)] flex items-center justify-center gap-2.5 transition-all group cursor-pointer disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#04140f]" />
                <span>Downloading {downloadProgress}%...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#04140f]" />
                <span>Saved to Device!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Video (MP4)</span>
              </>
            )}
          </button>

          {/* Open Video in New Tab Link */}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#04140f]/90 border border-[#cca052] text-[#fce8a6] font-cinzel text-xs tracking-widest uppercase hover:bg-[#cca052]/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ExternalLink className="w-4 h-4 text-[#cca052]" />
            <span>Open in Tab</span>
          </a>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#04140f]/90 border border-[#cca052]/60 text-[#dfba73] font-cinzel text-xs tracking-widest uppercase hover:bg-[#cca052]/20 hover:text-[#fce8a6] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#7bf2b1]" />
                <span className="text-[#7bf2b1]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#cca052]" />
                <span>Share Video</span>
              </>
            )}
          </button>
        </div>

        {/* Download notification badge if success */}
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05291b] border border-[#7bf2b1]/60 text-[#7bf2b1] text-xs font-cinzel"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>File downloaded: Syed-Irfan-Mehek-Wedding-Invitation.mp4</span>
          </motion.div>
        )}

        {/* Format details & direct link box */}
        <div className="mt-5 p-4 rounded-xl bg-[#04140f]/80 border border-[#cca052]/30 max-w-lg mx-auto text-left">
          <p className="text-xs font-cinzel font-bold text-[#fce8a6] mb-1 flex items-center justify-between">
            <span>Video Specifications &amp; Direct Link</span>
            <span className="text-[10px] text-[#cca052] font-normal tracking-wider">1080 × 1920 (9:16)</span>
          </p>
          <p className="text-[11px] font-sans-clean text-[#dfba73]/80 leading-relaxed">
            Format: High Definition MP4 (19.1 MB, 43s) · With sacred Bismillah vocal soundtrack. Ready for WhatsApp Status, Instagram Stories, and family groups.
          </p>
          <div className="mt-2.5 pt-2.5 border-t border-[#cca052]/20 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-[#dfba73]/70 truncate select-all">
              /video/wedding-invitation.mp4
            </span>
            <button
              onClick={handleShare}
              className="text-[10px] font-cinzel text-[#cca052] hover:text-[#fce8a6] uppercase tracking-wider underline whitespace-nowrap cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy Direct Link'}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

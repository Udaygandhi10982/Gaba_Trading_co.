import { useState, useEffect, useRef } from 'react';
import { Play, Shield, Truck, HeadphonesIcon, ArrowRight, MessageCircle, X, Volume2, VolumeX } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    subtitle: 'Tested & Durable Materials',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    subtitle: 'On Time, Every Time',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support',
    subtitle: 'Always Here To Help',
  },
];

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = sessionStorage.getItem('heroVideoMuted');
    return saved !== null ? saved === 'true' : true;
  });

  const videoRef = useRef(null);

  // Sync mute state and save to sessionStorage
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    sessionStorage.setItem('heroVideoMuted', String(isMuted));
  }, [isMuted]);

  // Pause background video when lightbox is open, resume when closed
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoOpen) {
        videoRef.current.pause();
      } else {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          videoRef.current.play().catch((err) => {
            console.log('Autoplay play blocked or interrupted:', err);
          });
        }
      }
    }
  }, [isVideoOpen]);

  // Close lightbox on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  return (
    <section
      id="home"
      className="relative min-h-[600px] flex flex-col justify-between overflow-hidden"
      style={{
        background: '#071421',
      }}
    >
      {/* Cinematic Background Video */}
      <video
        ref={videoRef}
        src="/videos/hero-promo.mp4"
        poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />

      {/* Overlays */}
      {/* 1. Left-to-right dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071421]/95 via-[#071421]/75 to-transparent z-1 pointer-events-none" />
      
      {/* 2. Radial dark vignette for cinema aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(7,20,33,0.4)_100%)] z-1 pointer-events-none" />

      {/* 3. Bottom fade to transition to main page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071421] to-transparent z-1 pointer-events-none" />

      {/* 4. Clickable background overlay */}
      <div
        onClick={() => setIsVideoOpen(true)}
        className="absolute inset-0 cursor-pointer z-2"
        aria-label="Open fullscreen video player"
      />

      {/* Main content layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-start gap-10 w-full flex-1 justify-center pointer-events-none">
        <div className="text-left max-w-2xl pointer-events-auto">
          {/* Brand Heading */}
          <h1 className="text-white font-black leading-tight mb-3 select-none">
            <span className="block text-4xl sm:text-6xl md:text-7xl tracking-tight">GABA</span>
            <span className="block text-lg sm:text-2xl md:text-3xl text-[#F59E0B] tracking-wide mt-0.5 uppercase">
              TRADING COMPANY
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white font-bold text-lg sm:text-2xl md:text-3xl mb-1.5 leading-tight">
            "Everything You Need to Build Better."
          </p>

          {/* Tagline Secondary */}
          <p className="text-[#F59E0B] text-xs sm:text-sm md:text-base font-semibold tracking-wide mb-3">
            From foundation to finishing, we have you covered.
          </p>

          {/* Supporting text */}
          <p className="text-white/70 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed max-w-sm sm:max-w-md">
            Quality products. Reliable supply. Delivered to your site.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#F59E0B] text-[#071421] font-bold px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg hover:bg-[#FFB21A] active:scale-95 transition-all duration-150 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs shadow-lg shadow-[#F59E0B]/30 cursor-pointer"
            >
              Shop Products <ArrowRight size={14} />
            </button>
            <a
              href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-transparent text-white font-bold px-5 py-2.5 sm:px-7 sm:py-3 rounded-lg border border-white/30 hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-150 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs"
            >
              <MessageCircle size={14} className="text-green-400 fill-green-400/20" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#071421]/70 backdrop-blur-sm pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-white font-bold text-xs">{title}</p>
                <p className="text-white/50 text-[10px]">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
        }}
        className="absolute bottom-20 right-6 sm:bottom-24 sm:right-8 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        title={isMuted ? 'Unmute background video' : 'Mute background video'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Video Lightbox Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close video player"
          >
            <X size={24} />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/videos/hero-promo.mp4"
              controls
              autoPlay
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}


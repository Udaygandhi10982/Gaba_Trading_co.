import { MessageCircle, ChevronRight } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function CTASection() {
  return (
    <section className="bg-transparent p-0 relative overflow-visible select-none">
      
      {/* Full-width Orange Banner with Trapezoid Slant Clip-Path matching reference image */}
      {/* Background color changed to pure vibrant orange (#FF7A00) matching reference */}
      <div
        className="w-full bg-[#FF7A00] relative overflow-visible"
        style={{
          // Left side slants up, flat top, right side slants down.
          // Adjust responsive percentages: 12% slant on desktop, 6% on mobile
          clipPath: 'polygon(0 100%, 12% 0, 88% 0, 100% 100%)',
          WebkitClipPath: 'polygon(0 100%, 12% 0, 88% 0, 100% 100%)',
        }}
      >
        {/* Content Container aligned with page grid — slimmer py-6 md:py-8 vertical padding */}
        <div className="max-w-7xl mx-auto relative px-6 py-6 md:py-8 md:pl-[380px] lg:pl-[420px] md:pr-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-visible">
          
          {/* 3D Overlapping Transparent Materials Stack Image on the Left (Bleeds top & bottom) */}
          <img
            src="/images/materials_clean.png"
            alt="GABA Building Materials Stack"
            className="absolute bottom-0 left-6 md:left-10 lg:left-12 w-64 md:w-[320px] lg:w-[360px] h-auto hidden md:block z-20 pointer-events-none drop-shadow-[0_25px_25px_rgba(0,0,0,0.45)] transform translate-y-8 lg:translate-y-10"
          />

          {/* Mobile visible thumbnail (inline, static) */}
          <div className="block md:hidden w-52 mb-2">
            <img
              src="/images/materials_clean.png"
              alt="GABA Building Materials Stack"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Middle text content column */}
          <div className="text-center md:text-left flex-1 relative z-10">
            <h3 className="text-2xl md:text-2xl font-black text-[#071421] mb-0.5 tracking-tight">
              Need Building Materials?
            </h3>
            <p className="text-[#071421]/90 text-sm font-bold leading-snug">
              Send your requirement on WhatsApp and get the best deal.
            </p>
          </div>

          {/* Right Action Button (Chat on WhatsApp) */}
          <div className="shrink-0 z-10 relative">
            <a
              id="cta-whatsapp-chat-btn"
              href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello GABA BUILDING MATERIAL, I would like to enquire about building materials.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#071421] text-white hover:bg-[#112538] active:scale-95 transition-all duration-150 font-bold py-3 px-5 rounded-xl flex items-center justify-between gap-3 text-xs md:text-sm shadow-xl shadow-black/20 group"
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </div>
              <ChevronRight size={16} className="text-[#FF7A00] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
      
    </section>
  );
}

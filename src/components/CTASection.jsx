import { ChevronRight } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function CTASection() {
  return (
    <section className="bg-transparent p-0 select-none">
      
      {/* Outer wrapper — relative so the image can overlap the banner */}
      <div className="relative">

        {/* Orange Trapezoid Banner */}
        <div
          className="w-full bg-[#FF7A00]"
          style={{
            clipPath: 'polygon(0 100%, 12% 0, 88% 0, 100% 100%)',
            WebkitClipPath: 'polygon(0 100%, 12% 0, 88% 0, 100% 100%)',
          }}
        >
          {/* Content — pushed right to leave room for the image */}
          <div className="max-w-7xl mx-auto px-6 py-7 md:py-9 md:pl-[200px] lg:pl-[230px] md:pr-12 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Mobile: image inline above text */}
            <div className="block md:hidden w-32 mb-2">
              <img
                src="/images/sanitary_pedestal_clean.png"
                alt="GABA Sanitary Products"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Middle text content */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl md:text-2xl font-black text-[#071421] mb-0.5 tracking-tight">
                Upgrade Your Bathroom Today!
              </h3>
              <p className="text-[#071421]/90 text-sm font-bold leading-snug">
                Premium sanitary products at special prices.
              </p>
            </div>

            {/* WhatsApp CTA Button */}
            <div className="shrink-0">
              <a
                id="cta-whatsapp-chat-btn"
                href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello GABA Sanitary Specialist, I would like to enquire about sanitary products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#071421] text-white hover:bg-[#112538] active:scale-95 transition-all duration-150 font-bold py-3 px-5 rounded-xl flex items-center justify-between gap-3 text-xs md:text-sm shadow-xl shadow-black/20 group cursor-pointer"
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

        {/* Product image — sits OUTSIDE the clip-path div so it never gets cropped */}
        <img
          src="/images/sanitary_pedestal_clean.png"
          alt="GABA Sanitary Products"
          className="absolute bottom-0 left-24 md:left-28 lg:left-36 w-[150px] md:w-[170px] lg:w-[190px] h-auto hidden md:block pointer-events-none object-contain z-20"
        />

      </div>
    </section>
  );
}

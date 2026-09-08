import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals', href: '#products' },
  { label: 'Contact Us', href: '#contact' },
];

const footerCategories = [
  { label: 'Faucets & Taps', href: '#categories' },
  { label: 'Showers', href: '#categories' },
  { label: 'Health & Jet Sprays', href: '#categories' },
  { label: 'uPVC Fittings', href: '#categories' },
  { label: 'CPVC Fittings', href: '#categories' },
  { label: 'Brass Insert Fittings', href: '#categories' },
  { label: 'Pipes & Hoses', href: '#categories' },
  { label: 'Valves & Spindles', href: '#categories' },
];

export default function Footer() {
  return (
    <footer className="bg-[#071421] text-white pt-16 pb-8 px-4 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand Info (Takes 4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center shadow-lg shadow-[#F59E0B]/20">
                <Building2 size={22} className="text-[#071421]" />
              </div>
              <div>
                <p className="font-black text-xl leading-tight tracking-tight">GABA</p>
                <p className="text-[#F59E0B] text-[10px] font-bold tracking-widest uppercase">
                  Sanitary Specialist
                </p>
              </div>
            </div>
            
            <p className="text-white/60 text-xs leading-relaxed mb-6 max-w-sm">
              Premium sanitary products for modern bathrooms. Reliable supply. Trusted service.
            </p>

            {/* Social Media Link Badges (matches visual circles) */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/gabatradingco?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#E1306C] hover:scale-110 transition-transform flex items-center justify-center text-white"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:scale-110 transition-transform flex items-center justify-center text-white"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 border-l-2 border-[#F59E0B] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-xs hover:text-[#F59E0B] hover:translate-x-0.5 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 border-l-2 border-[#F59E0B] pl-2.5">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {footerCategories.map(cat => (
                <li key={cat.label}>
                  <a
                    href={cat.href}
                    className="text-white/60 text-xs hover:text-[#F59E0B] hover:translate-x-0.5 inline-block transition-all"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us Info (Takes 4 cols on lg) */}
          <div className="lg:col-span-4 text-left">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4 border-l-2 border-[#F59E0B] pl-2.5">
              Contact Us
            </h4>
            <ul className="space-y-3.5">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                  <Phone size={13} />
                </div>
                <a
                  href="tel:+919592959541"
                  className="text-white/70 text-xs hover:text-white transition-colors"
                >
                  +91 9592 959541
                </a>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                  <Mail size={13} />
                </div>
                <a
                  href="mailto:gabatradingco57@gmail.com"
                  className="text-white/70 text-xs hover:text-white transition-colors break-all"
                >
                  gabatradingco57@gmail.com
                </a>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                  <MapPin size={13} />
                </div>
                <a
                  href="https://share.google/nMOgeKsZ3s7aXNxhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-xs leading-normal hover:text-white transition-colors"
                >
                  Main Road Kabir Nagar, Basti Jodhewal,<br />Ludhiana, Punjab – 141007
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                  <Clock size={13} />
                </div>
                <div className="text-white/70 text-[11px] leading-relaxed">
                  <p className="font-bold text-white/90">Open Daily (Closed Sunday)</p>
                  <p>9:00 AM - 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & tagline strip */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40">
          <p className="text-xs">
            © 2026 GABA Trading Company. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/50 font-semibold select-none">
            <span className="text-[#FF0000] text-sm">▼</span>
            <span>For Quality Construction</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

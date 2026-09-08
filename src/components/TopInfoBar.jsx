import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function TopInfoBar() {
  return (
    <div className="bg-[#F59E0B] text-[#071421] py-2 px-4 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Quality indicators */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#071421]" />
            Quality Materials
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#071421]" />
            Reliable Supply
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#071421]" />
            Customer Satisfaction
          </span>
        </div>
        <div className="sm:hidden flex items-center gap-1 font-semibold">
          <CheckCircle size={12} />
          GABA Building Material
        </div>

        {/* Right: Contact info */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+919592959541"
            className="flex items-center gap-1 hover:underline font-semibold whitespace-nowrap"
          >
            <Phone size={12} />
            <span className="hidden sm:inline">Need Help? Call Us: </span>
            +91 9592 959541
          </a>
          <a
            href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline font-semibold whitespace-nowrap"
          >
            <MessageCircle size={12} />
            <span className="hidden sm:inline">Chat on </span>WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

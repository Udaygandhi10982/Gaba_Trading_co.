import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

const contactItems = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Main Road Kabir Nagar, Basti Jodhewal, Ludhiana, Punjab – 141007',
    href: 'https://share.google/nMOgeKsZ3s7aXNxhu',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9592 959541',
    href: 'tel:+919592959541',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 9592 959541 (Chat on WhatsApp)',
    href: `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`,
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'gabatradingco57@gmail.com',
    href: 'mailto:gabatradingco57@gmail.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM',
  },
];


export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F7F7F5] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-1 h-7 bg-[#F59E0B] rounded-full inline-block" />
            <h2 className="text-3xl font-black text-[#111827]">Get In Touch</h2>
            <span className="w-1 h-7 bg-[#F59E0B] rounded-full inline-block" />
          </div>
          <p className="text-[#6B7280] max-w-md mx-auto">
            Have questions or want to place an order? Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm font-semibold text-[#111827] hover:text-[#F59E0B] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#111827]">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=GABA+Sanitary+Specialist,+Main+Road+Kabir+Nagar,+Basti+Jodhewal,+Ludhiana,+Punjab+141007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#071421] text-[#071421] font-bold text-sm hover:bg-[#071421] hover:text-white transition-all duration-200"
              >
                <ExternalLink size={16} /> Get Directions
              </a>
              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F59E0B] text-[#071421] font-bold text-sm hover:bg-[#FFB21A] transition-all duration-200"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-80 bg-gray-200 relative">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80"
              alt="Map location placeholder"
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071421]/50">
              <MapPin size={40} className="text-[#F59E0B] mb-2" />
              <p className="text-white font-bold">GABA Sanitary Specialist</p>
              <p className="text-white/80 text-sm text-center px-4">Kabir Nagar, Basti Jodhewal, Ludhiana – 141007</p>
              <a
                href="https://www.google.com/maps/place/Gaba+Trading+Co./@30.9315757,75.8609088,17z/data=!3m1!4b1!4m6!3m5!1s0x391a8342a8d7346d:0xa3bdf0f8d4da25a6!8m2!3d30.9315757!4d75.8634837!16s%2Fg%2F11zfhmh80l?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-[#F59E0B] text-[#071421] font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#FFB21A] transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

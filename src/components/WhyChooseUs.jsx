import { BadgeCheck, Tag, PackageCheck, MessageCircle } from 'lucide-react';

const reasons = [
  {
    icon: BadgeCheck,
    title: 'Quality Assured',
    description: 'Quality sanitary products sourced from trusted manufacturers — tested for durability and performance.',
  },
  {
    icon: Tag,
    title: 'Wide Product Range',
    description: 'From faucets to bathroom accessories — everything your bathroom needs under one roof.',
  },
  {
    icon: PackageCheck,
    title: 'Reliable Supply',
    description: 'Consistent availability and professional service. The right product, always in stock.',
  },
  {
    icon: MessageCircle,
    title: 'Easy Ordering',
    description: 'Order directly through WhatsApp. Browse, select, and send your order in seconds.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#071421] py-16 px-4 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-7 bg-[#F59E0B] rounded-full inline-block" />
          <span className="text-[#F59E0B] text-sm font-bold uppercase tracking-wider">WHY GABA?</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-1">
          Why Choose <span className="text-[#F59E0B]">GABA?</span>
        </h2>
        <p className="text-white/60 mb-8 max-w-md text-sm">
          We are committed to delivering the best sanitary product experience for every bathroom.
        </p>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#0c1a2b] border border-white/5 rounded-2xl p-5 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-[#F59E0B]/5 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F59E0B] transition-colors duration-200">
                <Icon size={22} className="text-[#F59E0B] group-hover:text-[#071421] transition-colors duration-200" />
              </div>
              <h3 className="font-bold text-white mb-1.5 text-base">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

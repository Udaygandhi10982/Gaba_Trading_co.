import { Droplets, ShowerHead, Rows3, Sparkles } from 'lucide-react';

const offerings = [
  {
    id: 'essentials',
    label: 'Bathroom Essentials',
    sub: 'Basins, WC, Faucets',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&q=80',
    icon: Droplets,
  },
  {
    id: 'fittings',
    label: 'Premium Fittings',
    sub: 'Showers, Mixers, Taps',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80',
    icon: ShowerHead,
  },
  {
    id: 'accessories',
    label: 'Bathroom Accessories',
    sub: 'Rods, Hooks, Shelves',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&q=80',
    icon: Rows3,
  },
  {
    id: 'designer',
    label: 'Designer Collections',
    sub: 'Mirrors, Cabinets',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80',
    icon: Sparkles,
  },
];

export default function OfferingsSection() {
  const handleCardClick = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#071421] py-16 px-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute left-4 bottom-4 w-72 h-72 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white w-full h-full">
          <path d="M10 90 L10 50 L50 20 L90 50 L90 90 Z" strokeWidth="1" />
          <path d="M10 50 L90 50" strokeWidth="1" />
          <path d="M30 90 L30 70 L50 70 L50 90" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M60 90 L60 75 L80 75 L80 90" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Side Content Column (Takes 4 cols on lg) */}
        <div className="lg:col-span-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-4 bg-[#F59E0B] rounded-full inline-block" />
            <p className="text-[#F59E0B] text-xs font-black uppercase tracking-widest">
              WHAT WE OFFER
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
            Everything You Need
            <br />
            for Your Bathroom
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            From premium faucets to designer basins, showers and bathroom accessories, find everything you need to complete your bathroom.
          </p>
        </div>

        {/* Right Side Cards Row Column (Takes 8 cols on lg) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={handleCardClick}
                  className="relative bg-transparent group cursor-pointer"
                >
                  {/* Card Container */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[280px]">
                    {/* Top Image */}
                    <div className="h-[120px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom White Text Box */}
                    <div className="bg-white px-3 pt-8 pb-5 flex-1 flex flex-col justify-between text-center relative">
                      
                      {/* Orange Circular Icon Badge (Positioned at Boundary) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#F59E0B] text-[#071421] rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <Icon size={16} />
                      </div>

                      <div>
                        <p className="text-[#111827] font-black text-sm leading-tight mb-1">
                          {item.label}
                        </p>
                        <p className="text-[#6B7280] text-[10px] leading-snug">
                          {item.sub}
                        </p>
                      </div>

                      {/* Hover action indicator */}
                      <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        View Products
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

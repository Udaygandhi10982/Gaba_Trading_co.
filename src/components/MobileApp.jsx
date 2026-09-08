import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Grid, 
  Search as SearchIcon, 
  ShoppingCart, 
  MoreHorizontal, 
  Volume2, 
  VolumeX, 
  Play, 
  X, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Check, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ArrowRight, 
  Shield, 
  Truck, 
  Info, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Maximize2,
  Headphones,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { products, getProductSlug, categories } from '../data/products';

export default function MobileApp({ activeProduct, currentPath, setSelectedCategory }) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('gabaRecentSearches');
    return saved ? JSON.parse(saved) : ['Cement', 'TMT Bar', 'Brass Adapter', 'Paint'];
  });
  
  const { cartItems, addItem, removeItem, updateQuantity, estimatedTotal, totalItems } = useCart();

  // Home states
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const saved = sessionStorage.getItem('heroVideoMuted');
    return saved !== null ? saved === 'true' : true;
  });
  const videoRef = useRef(null);

  // Detail Page states
  const [detailQty, setDetailQty] = useState(1);
  const [detailImgIndex, setDetailImgIndex] = useState(0);
  const [isDetailLightboxOpen, setIsDetailLightboxOpen] = useState(false);
  const [detailTab, setDetailTab] = useState('description');
  const [detailAdded, setDetailAdded] = useState(false);

  // Sync video volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync background video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoOpen) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Video play failed:', err));
      }
    }
  }, [isVideoOpen]);

  // Save recent searches
  const addRecentSearch = (query) => {
    if (!query.trim()) return;
    const filtered = recentSearches.filter(q => q.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('gabaRecentSearches', JSON.stringify(updated));
  };

  const handleProductTap = (product) => {
    const slug = getProductSlug(product.name);
    window.history.pushState(null, '', `/app/products/${slug}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleBackToCatalog = () => {
    window.history.pushState(null, '', '/app');
    window.dispatchEvent(new Event('popstate'));
    setDetailQty(1);
    setDetailImgIndex(0);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    window.history.pushState(null, '', '/app');
    window.dispatchEvent(new Event('popstate'));
  };

  // Helper to render WhatsApp direct order
  const triggerWhatsAppOrder = (product, quantity = 1) => {
    const isAskForPrice = product.price == null;
    const subtotalDisplay = isAskForPrice ? 'Ask for Price' : `₹${product.price * quantity}`;
    const priceText = isAskForPrice ? 'Ask for Price' : `₹${product.price} / ${product.unit}`;

    const message = `Hi GABA, I'm interested in ${product.name} (ID: ${product.id}).
Quantity: ${quantity} ${product.unit}(s)
Price: ${priceText}
Subtotal: ${subtotalDisplay}

Please share the current price and availability.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Checkout order template
  const triggerCartWhatsApp = () => {
    if (cartItems.length === 0) return;
    let message = `Hello GABA Sanitary Specialist,

I would like to place an order for the following items:

`;
    cartItems.forEach((item, idx) => {
      const priceText = item.price ? `₹${item.price}` : 'Ask for Price';
      const subtotalText = item.price ? `₹${item.price * item.quantity}` : 'Ask for Price';
      message += `${idx + 1}. ${item.name}
   Qty: ${item.quantity} ${item.unit}(s) | Price: ${priceText}
   Subtotal: ${subtotalText}\n\n`;
    });

    message += `Estimated Total: ₹${estimatedTotal}
Please confirm availability and final pricing.

Thank you.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Filter products for category tab
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('Cement');

  // Filter products for search tab
  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        String(p.id).includes(searchQuery)
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F5] pb-20 select-none text-gray-800">
      
      {/* 1. MOBILE TOP HEADER */}
      <header className="sticky top-0 z-[100] bg-[#071421] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div 
          onClick={() => changeTab('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-[#F59E0B] rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-[#071421] fill-[#071421]" />
          </div>
          <div>
            <p className="font-black text-sm tracking-tight leading-none text-white">GABA</p>
            <p className="text-[#F59E0B] text-[8px] font-bold tracking-widest uppercase mt-0.5">APP</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => changeTab('search')}
            className="p-1 text-white/80 hover:text-white transition-colors"
            aria-label="Search"
          >
            <SearchIcon size={20} />
          </button>
          
          <button 
            onClick={() => changeTab('cart')}
            className="p-1 text-white/80 hover:text-white relative transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-[#071421] text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#071421]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN SCROLL CONTENT AREA */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {activeProduct ? (
          /* ==================================================
             8. PRODUCT DETAIL EXPERIENCE
             ================================================== */
          <div className="p-4 bg-white min-h-[calc(100vh-120px)] animate-fade-in">
            {/* Back header navigation */}
            <button 
              onClick={handleBackToCatalog}
              className="flex items-center gap-2 text-gray-500 hover:text-[#071421] mb-4 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </button>

            {/* Image Gallery */}
            <div className="relative aspect-square rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 overflow-hidden mb-4 group">
              <img 
                src={activeProduct.images && activeProduct.images.length > 0 ? activeProduct.images[detailImgIndex] : activeProduct.image} 
                alt={activeProduct.name}
                className="max-h-full max-w-full object-contain"
              />

              {/* GTC Code Badge on Bottom-Right */}
              {activeProduct.code && (
                <span className="absolute bottom-3 left-3 bg-[#071421]/95 text-[#FF7A00] border border-[#FF7A00]/40 text-[11px] font-mono font-black px-2 py-0.5 rounded-md shadow-md">
                  {activeProduct.code}
                </span>
              )}

              <button 
                onClick={() => setIsDetailLightboxOpen(true)}
                className="absolute bottom-3 right-3 bg-white/95 text-gray-700 shadow-md w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Thumbnail dots */}
            {activeProduct.images && activeProduct.images.length > 1 && (
              <div className="flex gap-2 justify-center mb-6">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDetailImgIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${detailImgIndex === idx ? 'bg-[#FF7A00] w-5' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            )}

            {/* Title Block */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[#FF7A00] text-[10px] font-black uppercase tracking-wider block">{activeProduct.category}</span>
              {activeProduct.code && (
                <span className="bg-[#071421] text-[#FF7A00] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#FF7A00]/30">
                  {activeProduct.code}
                </span>
              )}
            </div>
            <h2 className="text-xl font-black text-gray-900 leading-tight mb-1">{activeProduct.name}</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-xs text-green-600 font-bold uppercase tracking-wider">In Stock & Bulk Ready</span>
              </span>
            </div>

            {/* Packet Selector Chips */}
            {activeProduct.packetSizes && activeProduct.packetSizes.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-1.5">
                  Select Packet / Packing:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.packetSizes.map((pkt) => {
                    const isSelected = (activeProduct.selectedPacket || activeProduct.packetSizes[0]) === pkt;
                    return (
                      <button
                        key={pkt}
                        onClick={() => {
                          activeProduct.selectedPacket = pkt;
                          setDetailQty(q => q); // trigger re-render
                        }}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#071421] text-[#FF7A00] border-[#071421] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {pkt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between gap-6 mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-xs font-black text-gray-700 uppercase tracking-wide">Required Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                <button 
                  onClick={() => setDetailQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus size={13} className="text-gray-500" />
                </button>
                <span className="w-10 h-9 flex items-center justify-center font-bold text-xs text-gray-900 border-l border-r border-gray-100">
                  {detailQty}
                </span>
                <button 
                  onClick={() => setDetailQty(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus size={13} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  addItem(activeProduct, detailQty);
                  setDetailAdded(true);
                  setTimeout(() => setDetailAdded(false), 1500);
                }}
                className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer ${
                  detailAdded ? 'bg-green-500 text-white shadow-green-100' : 'bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A]'
                }`}
              >
                {detailAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => triggerWhatsAppOrder(activeProduct, detailQty)}
                className="bg-[#071421] text-white hover:bg-[#112538] py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer border border-white/5"
              >
                <MessageSquare size={16} className="text-green-400 fill-green-400/20" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm mb-6">
              <div className="flex border-b border-gray-100 bg-gray-50">
                <button
                  onClick={() => setDetailTab('description')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 text-center ${
                    detailTab === 'description' ? 'border-[#F59E0B] text-[#071421] bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setDetailTab('specifications')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 text-center ${
                    detailTab === 'specifications' ? 'border-[#F59E0B] text-[#071421] bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Specs
                </button>
              </div>
              <div className="p-4 text-xs leading-relaxed text-gray-600">
                {detailTab === 'description' ? (
                  <p>{activeProduct.description}</p>
                ) : (
                  <table className="w-full">
                    <tbody>
                      {activeProduct.specifications ? (
                        activeProduct.specifications.map((spec, sIdx) => (
                          <tr key={sIdx} className="border-b border-gray-50 last:border-0">
                            <td className="py-2 font-bold text-gray-700 w-1/3">{spec.label}</td>
                            <td className="py-2 text-gray-500">{spec.value}</td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr className="border-b border-gray-50">
                            <td className="py-2 font-bold text-gray-700 w-1/3">Category</td>
                            <td className="py-2 text-gray-500">{activeProduct.category}</td>
                          </tr>
                          <tr className="border-b border-gray-50">
                            <td className="py-2 font-bold text-gray-700 w-1/3">Unit</td>
                            <td className="py-2 text-gray-500">{activeProduct.unit}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Lightbox fullscreen Modal */}
            {isDetailLightboxOpen && (
              <div 
                className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 animate-fade-in"
                onClick={() => setIsDetailLightboxOpen(false)}
              >
                <button 
                  onClick={() => setIsDetailLightboxOpen(false)} 
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer z-[10000]"
                >
                  <X size={24} />
                </button>

                <div 
                  className="relative w-full max-w-xl max-h-[85vh] flex items-center justify-center"
                  onClick={e => e.stopPropagation()}
                >
                  <img 
                    src={activeProduct.images && activeProduct.images.length > 0 ? activeProduct.images[detailImgIndex] : activeProduct.image} 
                    alt={activeProduct.name}
                    className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ==================================================
             TAB ROUTER RENDERING
             ================================================== */
          <>
            {/* T1: HOME TAB */}
            {activeTab === 'home' && (
              <div className="animate-fade-in">
                {/* 3. MOBILE HERO SECTION */}
                <div 
                  id="app-hero"
                  className="relative h-[420px] flex flex-col justify-between overflow-hidden cursor-pointer"
                  onClick={() => setIsVideoOpen(true)}
                >
                  {/* Cinematic Background Video */}
                  <video
                    ref={videoRef}
                    src="/videos/hero-promo.mp4"
                    poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071421] via-[#071421]/60 to-transparent z-1 pointer-events-none" />
                  
                  {/* Text Details */}
                  <div className="relative z-10 px-6 pt-24 pb-8 flex-1 flex flex-col justify-end text-left pointer-events-none">
                    <h1 className="text-white font-black leading-none mb-3">
                      <span className="block text-5xl tracking-tight leading-none">GABA</span>
                      <span className="block text-xl text-[#F59E0B] tracking-wide mt-1.5 uppercase font-bold">SANITARY SPECIALIST</span>
                    </h1>
                    
                    <p className="text-white font-bold text-lg leading-tight mb-1.5">
                      "Everything You Need for a Perfect Bathroom."
                    </p>

                    <p className="text-[#F59E0B] text-xs font-semibold mb-3 tracking-wide">
                      Premium Sanitary Products. Premium Deals.
                    </p>
                    
                    <p className="text-white/70 text-xs leading-relaxed max-w-sm mb-6">
                      Premium sanitary products, modern designs, and reliable service for your bathroom.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 w-full pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('mobile-popular-products')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 bg-[#F59E0B] text-[#071421] font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer shadow-md"
                      >
                        Shop Sanitary Deals
                      </button>
                      <a
                        href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-transparent text-white border border-white/30 hover:border-white font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center"
                      >
                        Order on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* 4. HERO AUDIO CONTROL */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="absolute bottom-6 right-6 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white cursor-pointer"
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>

                {/* 5. VIDEO LIGHTBOX */}
                {isVideoOpen && (
                  <div 
                    className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsVideoOpen(false)}
                  >
                    <button 
                      onClick={() => setIsVideoOpen(false)} 
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer z-[10000]"
                    >
                      <X size={24} />
                    </button>

                    <div 
                      className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
                      onClick={e => e.stopPropagation()}
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

                {/* 6. SHOP BY CATEGORY */}
                <div className="py-6 px-4 bg-white border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2">
                      Shop by Category
                    </h3>
                    <button 
                      onClick={() => changeTab('categories')}
                      className="text-xs text-[#F59E0B] font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>View All</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Horizontal Categories Scroll */}
                  <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide select-none -mx-4 px-4">
                    {[
                      { id: 'Faucets & Taps', name: 'Faucets', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80' },
                      { id: 'Wash Basins', name: 'Basins', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&q=80' },
                      { id: 'Western Toilets', name: 'Toilets', img: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b8?w=200&q=80' },
                      { id: 'Showers', name: 'Showers', img: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=200&q=80' }
                    ].map(cat => (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          changeTab('categories');
                          setSelectedCategoryTab(cat.id);
                        }}
                        className="relative w-28 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0 cursor-pointer group"
                      >
                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                          <p className="text-[10px] font-black text-white leading-tight uppercase tracking-wider">{cat.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. POPULAR PRODUCTS */}
                <div id="mobile-popular-products" className="py-6 px-4 bg-white border-b border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2 mb-4">
                    Popular Products
                  </h3>

                  {/* 2-Column Product Grid */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {products.slice(0, 4).map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => handleProductTap(prod)}
                        className="bg-white border border-gray-150 rounded-xl p-2.5 flex flex-col justify-between hover:border-[#F59E0B] shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
                      >
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1.5 mb-2 relative">
                          <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                          {prod.badge && (
                            <span className="absolute top-1 left-1 bg-[#F59E0B] text-[#071421] text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-left flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">{prod.category}</span>
                            <h4 className="font-bold text-gray-800 text-xs line-clamp-1 mt-0.5 leading-snug">{prod.name}</h4>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 w-full pt-1.5 border-t border-gray-50">
                            <div>
                              <p className="text-[8px] text-gray-400 font-bold uppercase">Price</p>
                              <p className="text-xs font-black text-[#071421]">
                                {prod.price ? `₹${prod.price}` : 'Ask Price'}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addItem(prod, 1);
                              }}
                              className="w-6.5 h-6.5 bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] active:scale-90 rounded-md flex items-center justify-center shadow-sm cursor-pointer"
                              title="Add to cart"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* 16. WHY CHOOSE GABA */}
                <div className="py-6 px-4 bg-[#071421] text-white border-b border-white/5">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <span className="w-1.5 h-4 bg-[#F59E0B] rounded-full" />
                    <span className="text-[#F59E0B] text-[10px] font-bold uppercase tracking-wider">WHY GABA?</span>
                  </div>
                  <h4 className="text-xs font-black text-center text-white uppercase tracking-wider mb-4">Why Choose GABA?</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Shield, title: 'Premium Quality', desc: 'Tested & Reliable Materials' },
                      { icon: Truck, title: 'Reliable Delivery', desc: 'On Time, Every Time' },
                      { icon: Headphones, title: 'Customer Support', desc: 'Always Here To Help' },
                      { icon: Tag, title: 'Competitive Prices', desc: 'Best Quality, Best Price' }
                    ].map((reason, rIdx) => {
                      const IconEl = reason.icon;
                      return (
                        <div key={rIdx} className="bg-[#0c1a2b] border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
                          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-2 border border-[#F59E0B]/20">
                            <IconEl size={14} />
                          </div>
                          <p className="font-bold text-[10px] text-white leading-tight mb-0.5">{reason.title}</p>
                          <p className="text-white/50 text-[9px] leading-snug">{reason.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WHATSAPP CTA */}
                <div className="bg-[#FF7A00] text-white py-6 px-4 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                  <p className="text-lg font-black leading-tight mb-1 relative z-10">Upgrade Your Bathroom Today!</p>
                  <p className="text-xs text-white/90 mb-4 max-w-xs relative z-10">Premium sanitary products at special prices. Chat with us on WhatsApp.</p>
                  <a
                    href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello GABA Sanitary Specialist, I would like to enquire about sanitary products.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#071421] text-white hover:bg-[#112538] font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-2 shadow-md relative z-10"
                  >
                    <MessageSquare size={14} className="text-green-400 fill-green-400/20" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* CONTACT / STORE INFORMATION */}
                <div className="py-6 px-4 bg-white border-b border-gray-100 text-left">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-[#F59E0B] pl-2">
                    Store Information
                  </h4>
                  <ul className="space-y-3.5 text-xs text-gray-600">
                    <li className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <span>Main Road Kabir Nagar, Basti Jodhewal, Ludhiana – 141007</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <a href="tel:+919592959541" className="hover:text-gray-900">+91 9592 959541</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-800">Mon - Sat: 9:00 AM - 7:00 PM</p>
                        <p className="text-gray-500">Sunday: 11:00 AM - 4:00 PM</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* FOOTER */}
                <footer className="bg-[#071421] text-white/40 py-6 px-4 text-center border-t border-white/5">
                  <p className="text-[10px]">© 2026 GABA Sanitary Specialist. All Rights Reserved.</p>
                </footer>
              </div>
            )}

            {/* T2: CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <div className="flex animate-fade-in bg-white min-h-[calc(100vh-120px)] border-b border-gray-100">
                {/* Left Side Vertical List */}
                <div className="w-1/3 bg-[#F7F7F5] border-r border-gray-150 overflow-y-auto">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryTab(cat.id);
                        setSelectedCategory(cat.id);
                      }}
                      className={`w-full py-3.5 px-3 text-left text-xs font-bold transition-all relative ${
                        selectedCategoryTab === cat.id 
                          ? 'bg-white text-[#071421] border-l-3 border-[#F59E0B]' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-1.5">{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Right Side Product Grid */}
                <div className="w-2/3 p-3 overflow-y-auto">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3 leading-none">
                    {categories.find(c => c.id === selectedCategoryTab)?.name || 'Products'}
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {products
                      .filter(p => selectedCategoryTab === 'all' || p.category === selectedCategoryTab)
                      .map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => handleProductTap(prod)}
                          className="bg-white border border-gray-150 rounded-xl p-2 flex items-center gap-3 hover:border-[#F59E0B] shadow-sm cursor-pointer"
                        >
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                            <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <h4 className="font-bold text-gray-800 text-[11px] truncate leading-tight">{prod.name}</h4>
                            <p className="text-[10px] font-black text-[#071421] mt-1">
                              {prod.price ? `₹${prod.price}` : 'Ask for Price'}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(prod, 1);
                            }}
                            className="w-6.5 h-6.5 bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] rounded-md flex items-center justify-center shrink-0 cursor-pointer mr-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ))}
                    {products.filter(p => selectedCategoryTab === 'all' || p.category === selectedCategoryTab).length === 0 && (
                      <p className="text-gray-400 text-xs py-8 text-center">No products in this category.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* T3: SEARCH TAB */}
            {activeTab === 'search' && (
              <div className="p-4 bg-white min-h-[calc(100vh-120px)] animate-fade-in">
                {/* Search Bar UI */}
                <div className="relative mb-6">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products, brands or product ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addRecentSearch(searchQuery);
                    }}
                    className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-xl text-xs bg-[#F7F7F5] focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] text-gray-900"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {searchQuery.trim() === '' ? (
                  /* Popular & Recent Searches Panels */
                  <div className="text-left">
                    {recentSearches.length > 0 && (
                      <div className="mb-6 animate-fade-in">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3">Recent Searches</h4>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => {
                                setSearchQuery(term);
                                addRecentSearch(term);
                              }}
                              className="bg-[#F7F7F5] hover:bg-gray-150 border border-gray-150 text-gray-600 text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="animate-fade-in">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3">Popular Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {['UltraTech', 'OPC 53', 'Steel Bar', 'PVC Pipe', 'Exterior Paint'].map((term, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => {
                              setSearchQuery(term);
                              addRecentSearch(term);
                            }}
                            className="bg-[#F7F7F5] hover:bg-gray-150 border border-gray-150 text-gray-600 text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Results Listing */
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold text-gray-500 text-left">Search Results ({searchResults.length})</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {searchResults.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => handleProductTap(prod)}
                          className="bg-white border border-gray-150 rounded-xl p-2.5 flex flex-col justify-between hover:border-[#F59E0B] shadow-sm cursor-pointer"
                        >
                          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1.5 mb-2">
                            <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="text-left flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">{prod.category}</span>
                              <h4 className="font-bold text-gray-800 text-xs line-clamp-1 mt-0.5 leading-snug">{prod.name}</h4>
                            </div>
                            <div className="flex items-center justify-between mt-3 w-full pt-1.5 border-t border-gray-50">
                              <p className="text-xs font-black text-[#071421]">
                                {prod.price ? `₹${prod.price}` : 'Ask Price'}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addItem(prod, 1);
                                }}
                                className="w-6.5 h-6.5 bg-[#F59E0B] text-[#071421] rounded-md flex items-center justify-center cursor-pointer shadow-sm"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {searchResults.length === 0 && (
                      <div className="py-12 text-center">
                        <p className="text-gray-400 text-xs">No matching products found.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* T4: CART TAB */}
            {activeTab === 'cart' && (
              <div className="p-4 bg-white min-h-[calc(100vh-120px)] flex flex-col justify-between animate-fade-in text-left">
                <div className="flex-1">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2 mb-6">
                    Shopping Cart ({totalItems} items)
                  </h3>

                  {cartItems.length > 0 ? (
                    <div className="space-y-3.5 mb-6">
                      {cartItems.map(item => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-3.5 p-3 bg-white border border-gray-150 rounded-xl shadow-sm"
                        >
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-xs truncate leading-snug">{item.name}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold">{item.category}</p>
                            <p className="text-xs font-black text-[#071421] mt-1.5">
                              {item.price ? `₹${item.price}` : 'Ask for Price'}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[10px] text-red-500 font-bold hover:text-red-700 cursor-pointer"
                            >
                              Remove
                            </button>
                            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm h-7">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-6.5 h-full flex items-center justify-center hover:bg-gray-50"
                              >
                                <Minus size={10} className="text-gray-500" />
                              </button>
                              <span className="w-8 h-full flex items-center justify-center font-bold text-[11px] border-l border-r border-gray-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6.5 h-full flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus size={10} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <ShoppingCart size={40} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-400 text-xs">Your cart is empty.</p>
                      <button
                        onClick={() => changeTab('home')}
                        className="mt-4 bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] font-bold text-xs px-5 py-2 rounded-lg cursor-pointer shadow-sm"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-150 pt-5 mt-auto">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold text-gray-500">Estimated Total</span>
                      <span className="text-xl font-black text-[#071421]">₹{estimatedTotal}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={triggerCartWhatsApp}
                        className="bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] font-bold py-3 px-4 rounded-xl text-center shadow-md active:scale-95 transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={15} />
                        <span>Proceed to Checkout</span>
                      </button>
                      
                      <button
                        onClick={triggerCartWhatsApp}
                        className="bg-[#071421] text-white hover:bg-[#112538] font-bold py-3 px-4 rounded-xl text-center border border-white/5 active:scale-95 transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={15} className="text-green-400 fill-green-400/20" />
                        <span>Order on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* T5: MORE TAB */}
            {activeTab === 'more' && (
              <div className="p-4 bg-[#F7F7F5] min-h-[calc(100vh-120px)] animate-fade-in text-left">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2 mb-6">
                  More Options
                </h3>

                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm space-y-4">
                  {[
                    { icon: Info, title: 'About GABA', desc: 'Who we are and our commitment' },
                    { icon: Phone, title: 'Contact Us', desc: 'Get in touch directly' },
                    { icon: MessageSquare, title: 'WhatsApp Chat', desc: 'Message our business team' },
                    { icon: MapPin, title: 'Store Location', desc: 'Find us in Ludhiana, Punjab' },
                    { icon: ShoppingCart, title: 'My Orders', desc: 'View past cart history' },
                    { icon: Shield, title: 'Delivery Information', desc: 'Rates and delivery timings' },
                    { icon: FileText, title: 'Terms & Conditions', desc: 'Our policies and terms of service' },
                    { icon: FileText, title: 'Privacy Policy', desc: 'How we manage user privacy' }
                  ].map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (item.title === 'WhatsApp Chat') {
                            window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`, '_blank');
                          } else if (item.title === 'Store Location') {
                            window.open('https://maps.google.com', '_blank');
                          } else {
                            alert(`${item.title} info is available on our desktop website.`);
                          }
                        }}
                        className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-8.5 h-8.5 rounded-lg bg-gray-50 text-gray-600 group-hover:text-[#F59E0B] group-hover:bg-[#F59E0B]/5 flex items-center justify-center shrink-0 border border-gray-100 transition-colors">
                            <ItemIcon size={16} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-xs leading-none">{item.title}</h4>
                            <p className="text-[10px] text-gray-400 mt-1 leading-none">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 3. FIXED BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#071421] border-t border-white/10 shadow-2xl pb-[safe] select-none text-white/50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'categories', label: 'Categories', icon: Grid },
            { id: 'search', label: 'Search', icon: SearchIcon },
            { id: 'cart', label: 'Cart', icon: ShoppingCart },
            { id: 'more', label: 'More', icon: MoreHorizontal }
          ].map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id && !activeProduct;
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-1.5 transition-all text-center flex-1 cursor-pointer relative ${
                  isActive ? 'text-[#F59E0B]' : 'text-white/60 hover:text-white'
                }`}
              >
                <TabIcon size={18} />
                <span className="text-[9px] font-bold tracking-wider uppercase">{tab.label}</span>
                {tab.id === 'cart' && totalItems > 0 && (
                  <span className="absolute top-1 right-5 sm:right-7 bg-[#F59E0B] text-[#071421] text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#071421]">
                    {totalItems}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 13. FLOATING WHATSAPP BUTTON (Spaced safely above navigation bar) */}
      <a
        href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-18 right-4 z-[90] w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all hover:scale-105"
        title="WhatsApp general enquiry"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6.5 h-6.5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}

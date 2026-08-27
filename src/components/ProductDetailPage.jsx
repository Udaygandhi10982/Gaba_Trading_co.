import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Shield, 
  Truck, 
  MessageSquare,
  BadgeAlert
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { products, getProductSlug } from '../data/products';
import { navigate } from '../utils/navigation';

export default function ProductDetailPage({ product, setSelectedCategory }) {
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center select-none">
        <BadgeAlert size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-3xl font-black text-[#071421] mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or may have been removed.</p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            navigate('/#products');
          }}
          className="bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] active:scale-95 transition-all font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Browse Products</span>
        </button>
      </div>
    );
  }

  const { addItem } = useCart();
  
  // Image states
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImgIndex, setLightboxImgIndex] = useState(0);

  // Purchase states
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('description');

  // Related products (same category, excluding current product)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  // Reset states when product changes
  useEffect(() => {
    setActiveImgIndex(0);
    setQty(1);
    setAdded(false);
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const decQty = () => setQty(q => Math.max(1, q - 1));
  const incQty = () => setQty(q => q + 1);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const isAskForPrice = product.price == null;
    const subtotal = isAskForPrice ? 'Ask for Price' : `₹${product.price * qty}`;
    const priceDisplay = isAskForPrice ? 'Ask for Price' : `₹${product.price} / ${product.unit}`;

    const message = `Hello GABA BUILDING MATERIAL,

I am interested in the following product:

Product: ${product.name}
Quantity: ${qty} ${qty > 1 ? product.unit + 's' : product.unit}
Price: ${priceDisplay}
Estimated Subtotal: ${subtotal}

Please confirm availability and final pricing.

Thank you.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCategoryBreadcrumb = () => {
    setSelectedCategory(product.category);
    navigate('/#products');
  };

  // Helper for rendering rating stars if ratings existed
  const ratingStars = product.rating ? (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="flex items-center text-amber-500">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">★</span>
        ))}
      </div>
      <span className="text-sm font-bold text-gray-800">{product.rating}</span>
      <span className="text-xs text-gray-500">({product.reviewsCount} reviews)</span>
    </div>
  ) : null;

  return (
    <div className="bg-[#F7F7F5] pb-16 pt-4 px-4 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation / Breadcrumbs Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 text-sm">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 text-gray-500 font-medium">
            <button onClick={() => navigate('/')} className="hover:text-[#F59E0B] transition-colors">Home</button>
            <span>&gt;</span>
            <button onClick={() => { setSelectedCategory('all'); navigate('/#products'); }} className="hover:text-[#F59E0B] transition-colors">Products</button>
            <span>&gt;</span>
            <button onClick={handleCategoryBreadcrumb} className="hover:text-[#F59E0B] transition-colors">{product.category}</button>
            <span>&gt;</span>
            <span className="text-[#F59E0B] font-semibold">{product.name}</span>
          </div>

          {/* Back to Products */}
          <button
            onClick={() => navigate('/#products')}
            className="text-gray-600 hover:text-[#071421] font-bold flex items-center gap-1.5 group transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Main Product Frame Grid */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Left Column — 45% Image Gallery (Grid 5 cols on md) */}
          <div className="md:col-span-5 flex flex-col-reverse md:flex-row gap-4 overflow-visible">
            {/* Vertical thumbnails on the left for desktop, horizontal scroll on mobile */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none shrink-0 w-full md:w-20">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-50 border-2 overflow-hidden flex items-center justify-center p-1 cursor-pointer shrink-0 transition-all ${
                    activeImgIndex === idx 
                      ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/20 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Large main image on the right */}
            <div className="flex-1 relative aspect-square rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center p-4 overflow-hidden group">
              <img
                src={productImages[activeImgIndex]}
                alt={product.name}
                className="w-full h-full object-contain select-none pointer-events-none"
              />
              
              {/* Zoom trigger hover icon */}
              <button
                onClick={() => {
                  setLightboxImgIndex(activeImgIndex);
                  setIsLightboxOpen(true);
                }}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 shadow-md hover:shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                title="Zoom view"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Right Column — 55% Product Information (Grid 7 cols on md) */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category tag */}
            <span className="text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-1.5 block">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#071421] mb-2 tracking-tight">
              {product.name}
            </h1>

            {/* Star Rating Area (displays only if reviews details exist) */}
            {ratingStars}

            {/* Availability */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-pulse" />
              <span className="text-xs font-extrabold text-green-600 uppercase tracking-wide">
                {product.availability || 'In Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specifications Table summary */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border border-gray-100 rounded-xl overflow-hidden mb-6 max-w-md">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {product.specifications.slice(0, 3).map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                        <td className="px-4 py-2.5 font-bold text-gray-500 w-1/3">{spec.label}</td>
                        <td className="px-4 py-2.5 text-[#071421] font-semibold">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Price Frame */}
            <div className="bg-[#F7F7F5] border border-gray-100 rounded-2xl p-4 mb-6 flex flex-col justify-center min-h-[90px]">
              {product.price != null ? (
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-4xl font-black text-[#071421]">₹{product.price}</span>
                    <span className="text-gray-500 font-bold text-sm">/ {product.unit}</span>
                  </div>
                  {/* Fake MRP for visual comparison anchor */}
                  <span className="text-xs text-gray-400 font-medium line-through">
                    MRP: ₹{Math.round(product.price * 1.25)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl md:text-3xl font-black text-gray-700">Ask for Price</span>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    Contact us on WhatsApp for current pricing.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Selector + Dynamic Subtotal Row */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#071421]">Quantity:</span>
                <div className="flex items-center border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={decQty}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#071421]">{qty}</span>
                  <button
                    onClick={incQty}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Subtotal display */}
              {product.price != null && (
                <div className="text-sm">
                  <span className="text-gray-500 font-semibold">Subtotal: </span>
                  <span className="font-extrabold text-[#071421]">₹{product.price * qty}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Add to Cart button */}
              <button
                id="page-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 duration-150 cursor-pointer ${
                  added 
                    ? 'bg-green-500 text-white shadow-green-200' 
                    : 'bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] shadow-amber-100'
                }`}
              >
                <ShoppingCart size={18} />
                <span>{added ? '✓ Added to Cart' : 'Add to Cart'}</span>
              </button>

              {/* WhatsApp direct order button */}
              <button
                id="page-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                className="bg-[#071421] text-white hover:bg-[#112538] py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Service Trust strip */}
            <div className="border-t border-gray-150 pt-5 grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <Shield size={20} className="text-[#F59E0B] mb-1" />
                <span className="text-[11px] font-black text-[#071421]">Reliable Supply</span>
                <span className="text-[10px] text-gray-500 hidden sm:block">Quality building materials.</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-200">
                <MessageSquare size={20} className="text-[#F59E0B] mb-1" />
                <span className="text-[11px] font-black text-[#071421]">WhatsApp Ordering</span>
                <span className="text-[10px] text-gray-500 hidden sm:block">Send requirement directly.</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck size={20} className="text-[#F59E0B] mb-1" />
                <span className="text-[11px] font-black text-[#071421]">Local Delivery</span>
                <span className="text-[10px] text-gray-500 hidden sm:block">Subject to site location.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Technical Details Area */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-12">
          {/* Tab headers */}
          <div className="border-b border-gray-150 flex bg-gray-50/50">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-bold text-sm transition-all relative border-b-2 cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#071421] border-[#F59E0B]'
                  : 'text-gray-500 hover:text-gray-800 border-transparent'
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-4 font-bold text-sm transition-all relative border-b-2 cursor-pointer ${
                activeTab === 'specifications'
                  ? 'text-[#071421] border-[#F59E0B]'
                  : 'text-gray-500 hover:text-gray-800 border-transparent'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-4 font-bold text-sm transition-all relative border-b-2 cursor-pointer ${
                activeTab === 'applications'
                  ? 'text-[#071421] border-[#F59E0B]'
                  : 'text-gray-500 hover:text-gray-800 border-transparent'
              }`}
            >
              Applications
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 min-h-[160px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-sm md:text-base text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                <p className="mt-4 text-xs font-semibold text-gray-500 bg-gray-50 p-3 rounded-lg inline-block">
                  Note: All GABA materials undergo high-grade inspection procedures to ensure they meet standard compliance for premium structural integrity.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="border border-gray-150 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold text-xs uppercase tracking-wide">
                          <th className="px-6 py-3">Specification</th>
                          <th className="px-6 py-3">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.specifications.map((spec, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                            <td className="px-6 py-3.5 font-bold text-[#071421] border-b border-gray-100">{spec.label}</td>
                            <td className="px-6 py-3.5 text-gray-600 font-semibold border-b border-gray-100">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No technical specifications listed for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="max-w-2xl">
                {product.applications && product.applications.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-bold text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="text-[#F59E0B] text-lg font-black leading-none">✓</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No specific applications listed for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* You May Also Need — Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#071421] mb-6 tracking-tight">
              You May Also Need
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {related.map(relProduct => {
                const isRelAskForPrice = relProduct.price == null;
                const relSlug = getProductSlug(relProduct.name);
                
                return (
                  <div
                    key={relProduct.id}
                    onClick={() => navigate(`/products/${relSlug}`)}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 duration-200 group"
                  >
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2">
                      <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-contain select-none group-hover:scale-105 transition-transform duration-250" />
                    </div>
                    <div>
                      <span className="text-[#F59E0B] text-[9px] font-bold uppercase tracking-wider block mb-0.5">{relProduct.category}</span>
                      <h4 className="font-extrabold text-[#071421] text-xs leading-snug line-clamp-2 mb-1">{relProduct.name}</h4>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                        <span className="text-[11px] font-black text-gray-700">
                          {isRelAskForPrice ? 'Ask for Price' : `₹${relProduct.price} / ${relProduct.unit.toLowerCase()}`}
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-gray-150 text-[#071421] group-hover:bg-[#F59E0B] flex items-center justify-center transition-colors">
                          <ShoppingCart size={11} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close trigger */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Main Large Image Display */}
          <div 
            className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={productImages[lightboxImgIndex]} 
              alt={product.name} 
              className="max-w-full max-h-[75vh] object-contain select-none rounded-lg"
            />

            {/* Left navigation arrow */}
            {productImages.length > 1 && (
              <button
                onClick={() => setLightboxImgIndex(prev => (prev - 1 + productImages.length) % productImages.length)}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Right navigation arrow */}
            {productImages.length > 1 && (
              <button
                onClick={() => setLightboxImgIndex(prev => (prev + 1) % productImages.length)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Lightbox thumbnail slider indicator */}
          {productImages.length > 1 && (
            <div 
              className="flex items-center gap-2 mt-6 overflow-x-auto max-w-md pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxImgIndex(idx)}
                  className={`w-14 h-14 rounded-lg bg-white/5 border-2 overflow-hidden flex items-center justify-center p-1 cursor-pointer transition-all ${
                    lightboxImgIndex === idx ? 'border-[#F59E0B] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Lightbox thumb ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

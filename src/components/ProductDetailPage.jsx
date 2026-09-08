import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Maximize2, 
  X, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Shield, 
  Truck, 
  MessageSquare,
  BadgeAlert,
  Package,
  Sparkles,
  CheckCircle2
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
          className="bg-[#FF7A00] text-[#071421] hover:bg-[#ff881a] active:scale-95 transition-all font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2"
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

  // Packet & Purchase states
  const packetOptions = product.packetSizes && product.packetSizes.length > 0
    ? product.packetSizes
    : [product.unit || 'Standard Pack'];
  const [selectedPacket, setSelectedPacket] = useState(packetOptions[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('description');

  // Related products (same category, excluding current)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  // Reset states when product changes
  useEffect(() => {
    setActiveImgIndex(0);
    const initialPackets = product.packetSizes && product.packetSizes.length > 0
      ? product.packetSizes
      : [product.unit || 'Standard Pack'];
    setSelectedPacket(initialPackets[0]);
    setQty(1);
    setAdded(false);
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product]);

  // Escape key closes lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const decQty = () => setQty(q => Math.max(1, q - 1));
  const incQty = () => setQty(q => q + 1);

  const handleAddToCart = () => {
    addItem(product, qty, selectedPacket);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello GABA Trading Co.,

I would like to enquire about / order the following item:

• Product: ${product.name}
• Item Code: ${product.code || 'N/A'}
• Category: ${product.category}
• Selected Packing: ${selectedPacket}
• Required Quantity: ${qty}

Please provide stock availability and your best wholesale quotation.

Thank you.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCategoryBreadcrumb = () => {
    setSelectedCategory(product.category);
    navigate('/#products');
  };

  const viewLabels = ['Main View', 'Exploded View', 'Multi-Angle', 'In-Use View'];

  return (
    <div className="bg-[#F7F7F5] min-h-screen pb-12 pt-3 select-none">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumbs + Back */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 text-xs">
          <div className="flex flex-wrap items-center gap-1 text-gray-400 font-medium">
            <button onClick={() => navigate('/')} className="hover:text-[#FF7A00] transition-colors">Home</button>
            <span className="text-gray-300">/</span>
            <button onClick={() => { setSelectedCategory('all'); navigate('/#products'); }} className="hover:text-[#FF7A00] transition-colors">Products</button>
            <span className="text-gray-300">/</span>
            <button onClick={handleCategoryBreadcrumb} className="hover:text-[#FF7A00] transition-colors">{product.category}</button>
            <span className="text-gray-300">/</span>
            <span className="text-[#FF7A00] font-bold truncate max-w-[180px]">{product.name}</span>
          </div>
          <button
            onClick={() => navigate('/#products')}
            className="text-gray-500 hover:text-[#071421] font-bold flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* ── MAIN PRODUCT CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">

            {/* ── LEFT: Image Gallery (45%) ── */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-gray-100 p-4 flex flex-col gap-3">
              
              {/* Main Image */}
              <div
                className="relative rounded-xl bg-gray-50 border border-gray-100 overflow-hidden group cursor-zoom-in flex items-center justify-center"
                style={{ aspectRatio: '1 / 1', maxHeight: '380px' }}
                onClick={() => { setLightboxImgIndex(activeImgIndex); setIsLightboxOpen(true); }}
              >
                <img
                  src={productImages[activeImgIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-3"
                />
                {/* View label */}
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#071421] border border-gray-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {viewLabels[activeImgIndex] || 'Product View'}
                </span>
                {/* Code badge */}
                {product.code && (
                  <span className="absolute bottom-2 left-2 bg-[#071421]/90 text-[#FF7A00] text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow border border-[#FF7A00]/30 tracking-wider">
                    {product.code}
                  </span>
                )}
                {/* Zoom icon */}
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxImgIndex(activeImgIndex); setIsLightboxOpen(true); }}
                  className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-600 w-8 h-8 rounded-full flex items-center justify-center shadow hover:shadow-md transition-all"
                  title="Zoom"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex flex-row gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative rounded-lg bg-gray-50 border-2 overflow-hidden flex flex-col items-center justify-center p-1 cursor-pointer shrink-0 transition-all ${
                        activeImgIndex === idx
                          ? 'border-[#FF7A00] ring-1 ring-[#FF7A00]/30 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ width: 68, minWidth: 68 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tight mt-0.5 truncate max-w-full px-0.5 block">
                        {viewLabels[idx] || `View ${idx + 1}`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Product Info (55%) ── */}
            <div className="md:col-span-7 p-5 md:p-6 flex flex-col">

              {/* Category + Code row */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#FF7A00] text-[11px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                {product.code && (
                  <span className="bg-[#071421] text-[#FF7A00] text-[10px] font-mono font-black px-2.5 py-0.5 rounded border border-[#FF7A00]/30">
                    {product.code}
                  </span>
                )}
              </div>

              {/* Product Name — compact 28-32px */}
              <h1 className="text-[22px] sm:text-[26px] md:text-[28px] font-black text-[#071421] leading-tight mb-2 tracking-tight">
                {product.name}
              </h1>

              {/* Stock status */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />
                <span className="text-[11px] font-extrabold text-green-600 uppercase tracking-wide">
                  {product.availability || 'In Stock — Wholesale Ready'}
                </span>
              </div>

              {/* Short description */}
              <p className="text-gray-500 text-[13px] leading-relaxed mb-4 max-w-lg">
                {product.description}
              </p>

              {/* ── Packaging Options ── */}
              {packetOptions.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Package size={13} className="text-[#FF7A00]" />
                    <span className="text-[11px] font-black text-[#071421] uppercase tracking-wider">
                      Select Packet Size:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {packetOptions.map((pkt) => {
                      const isSelected = selectedPacket === pkt;
                      return (
                        <button
                          key={pkt}
                          type="button"
                          onClick={() => setSelectedPacket(pkt)}
                          className={`text-[12px] font-bold px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF7A00] text-white border-[#FF7A00] shadow-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {pkt}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium mt-1.5">
                    Selected: <strong className="text-[#071421]">{selectedPacket}</strong>
                  </p>
                </div>
              )}

              {/* ── Quantity Selector ── */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[12px] font-bold text-[#071421]">Quantity:</span>
                <div className="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={decQty}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#071421] border-x border-gray-200">
                    {qty}
                  </span>
                  <button
                    onClick={incQty}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Min. order: 1 unit</span>
              </div>

              {/* ── Action Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  id="page-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 h-11 rounded-xl font-bold flex items-center justify-center gap-2 shadow transition-all active:scale-95 duration-150 cursor-pointer text-[13px] ${
                    added
                      ? 'bg-green-600 text-white shadow-green-100'
                      : 'bg-[#FF7A00] text-white hover:bg-[#ff881a] shadow-orange-100'
                  }`}
                >
                  {added ? (
                    <><CheckCircle2 size={16} /><span>Added to Cart!</span></>
                  ) : (
                    <><ShoppingCart size={16} /><span>Add to Cart</span></>
                  )}
                </button>

                <button
                  id="page-whatsapp-order-btn"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 h-11 bg-[#071421] text-white hover:bg-[#112538] rounded-xl font-bold flex items-center justify-center gap-2 shadow active:scale-95 transition-all duration-150 cursor-pointer text-[13px]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              {/* ── Service Highlights (horizontal inline) ── */}
              <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {[
                  { icon: <Shield size={12} className="text-[#FF7A00]" />, label: 'Tested Quality' },
                  { icon: <Truck size={12} className="text-[#FF7A00]" />, label: 'Bulk Supply Ready' },
                  { icon: <MessageSquare size={12} className="text-[#FF7A00]" />, label: 'Fast WhatsApp Support' },
                  { icon: <Package size={12} className="text-[#FF7A00]" />, label: 'Secure Packaging' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                    {icon}
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-6">
          {/* Tab headers */}
          <div className="border-b border-gray-100 flex bg-gray-50/50 overflow-x-auto scrollbar-none">
            {[
              { key: 'description', label: 'Description' },
              { key: 'specifications', label: 'Specifications' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 font-bold text-[13px] whitespace-nowrap transition-all border-b-2 cursor-pointer shrink-0 ${
                  activeTab === tab.key
                    ? 'text-[#071421] border-[#FF7A00]'
                    : 'text-gray-400 hover:text-gray-700 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5 md:p-6">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-2.5">
                  <Sparkles size={15} className="text-[#FF7A00] shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#071421] font-medium leading-relaxed">
                    <strong>GABA Quality Guarantee:</strong> Every batch is rigorously pressure tested and quality audited for flawless performance in high-pressure modern bathroom and plumbing installations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="border border-gray-150 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold text-[11px] uppercase tracking-wide">
                          <th className="px-5 py-2.5">Specification</th>
                          <th className="px-5 py-2.5">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.code && (
                          <tr className="bg-white">
                            <td className="px-5 py-2.5 font-bold text-[#071421] border-b border-gray-100 text-[13px]">Product Code</td>
                            <td className="px-5 py-2.5 text-[#FF7A00] font-mono font-bold border-b border-gray-100 text-[13px]">{product.code}</td>
                          </tr>
                        )}
                        {product.specifications.map((spec, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'}>
                            <td className="px-5 py-2.5 font-bold text-[#071421] border-b border-gray-100 text-[13px]">{spec.label}</td>
                            <td className="px-5 py-2.5 text-gray-600 font-semibold border-b border-gray-100 text-[13px]">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No technical specifications listed for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-black text-[#071421] mb-4 tracking-tight">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {related.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => {
                    const slug = getProductSlug(rel.name || rel.code);
                    navigate(`/products/${slug}`);
                  }}
                  className="bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 p-1">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                    {rel.code && (
                      <span className="absolute bottom-1 right-1 bg-[#071421]/90 text-[#FF7A00] text-[8px] font-mono font-black px-1 py-0.5 rounded">
                        {rel.code}
                      </span>
                    )}
                  </div>
                  <h4 className="text-[11px] font-bold text-[#071421] leading-tight line-clamp-2">{rel.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rel.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── LIGHTBOX ── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 cursor-pointer z-50"
          >
            <X size={26} />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] relative"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={productImages[lightboxImgIndex]}
              alt={product.name}
              className="max-w-full max-h-[82vh] object-contain rounded-xl"
            />
            {/* Lightbox thumbnail strip */}
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxImgIndex(idx)}
                    className={`w-12 h-12 rounded-lg border-2 overflow-hidden bg-white/10 transition-all ${
                      lightboxImgIndex === idx ? 'border-[#FF7A00]' : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-contain p-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

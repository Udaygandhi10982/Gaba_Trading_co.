import { useState } from 'react';
import { ShoppingCart, Minus, Plus, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { navigate } from '../utils/navigation';
import { getProductSlug } from '../data/products';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Default to first packet size if available
  const packetOptions = product.packetSizes && product.packetSizes.length > 0 
    ? product.packetSizes 
    : [product.unit || 'Standard Pack'];
  const [selectedPacket, setSelectedPacket] = useState(packetOptions[0]);

  const handleAdd = () => {
    addItem(product, qty, selectedPacket);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1500);
  };

  const decQty = () => setQty(q => Math.max(1, q - 1));
  const incQty = () => setQty(q => q + 1);

  const handleCardClick = () => {
    const slug = getProductSlug(product.name || product.code);
    navigate(`/products/${slug}`);
  };

  // Compute discount percentage if originalPrice exists
  const discountPct =
    product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  // Badge text — prefer dealLabel, then badge field
  const badgeText = product.dealLabel || product.badge || null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Image Container with GTC Code Badge on Bottom-Right */}
      <div
        onClick={handleCardClick}
        className="relative h-48 bg-gray-50 overflow-hidden cursor-pointer flex items-center justify-center p-2"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/071421/F59E0B?text=${encodeURIComponent(product.code || product.name)}`;
          }}
        />

        {/* Top-Left Deal / Badge */}
        {badgeText && (
          <span className="absolute top-2 left-2 bg-[#F59E0B] text-[#071421] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
            {badgeText}
          </span>
        )}



        {/* Bottom-Right GTC Product Code Badge */}
        {product.code && (
          <span className="absolute bottom-2 right-2 bg-[#071421]/90 backdrop-blur-md text-[#FF7A00] border border-[#FF7A00]/40 text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow-md tracking-wider">
            {product.code}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <div onClick={handleCardClick} className="cursor-pointer flex flex-col mb-3">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[#FF7A00] text-[10px] font-black uppercase tracking-wider">
              {product.category}
            </span>
            {product.code && (
              <span className="text-gray-400 text-[10px] font-mono font-bold">
                {product.code}
              </span>
            )}
          </div>

          <h3 className="font-black text-[#111827] text-sm leading-tight mb-1 line-clamp-2 hover:text-[#FF7A00] transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-500 text-xs line-clamp-2 mb-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Interactive Packet Size Selection Chips (Like T-Shirt Sizes S/M/L) */}
        {packetOptions.length > 0 && (
          <div className="mb-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 mb-1.5">
              <Package size={11} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Select Packet / Packing:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {packetOptions.map((pkt) => {
                const isSelected = selectedPacket === pkt;
                return (
                  <button
                    key={pkt}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPacket(pkt);
                    }}
                    className={`text-[11px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#071421] text-[#FF7A00] border-[#071421] shadow-sm scale-100'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-white'
                    }`}
                  >
                    {pkt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          {/* Qty + Add to inquiry cart */}
          <div className="flex items-center gap-2">
            {/* Quantity control */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              <button
                onClick={decQty}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={11} />
              </button>
              <span className="w-7 text-center text-xs font-bold text-[#111827]">{qty}</span>
              <button
                onClick={incQty}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={11} />
              </button>
            </div>

            {/* Add to cart button */}
            <button
              id={`add-cart-${product.id}`}
              onClick={handleAdd}
              className={`flex-1 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-[#FF7A00] text-[#071421] hover:bg-[#ff881a] active:scale-95'
              }`}
            >
              <ShoppingCart size={13} />
              {added ? 'Added to List!' : 'Add to Inquiry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

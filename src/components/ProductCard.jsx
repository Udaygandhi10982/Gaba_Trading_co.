import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { navigate } from '../utils/navigation';
import { getProductSlug } from '../data/products';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1500);
  };

  const decQty = () => setQty(q => Math.max(1, q - 1));
  const incQty = () => setQty(q => q + 1);

  const handleCardClick = () => {
    const slug = getProductSlug(product.name);
    navigate(`/products/${slug}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div 
        onClick={handleCardClick}
        className="relative h-40 bg-gray-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/071421/F59E0B?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#F59E0B] text-[#071421] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <div onClick={handleCardClick} className="cursor-pointer flex-1 flex flex-col mb-2">
          <span className="text-[#F59E0B] text-[10px] font-bold uppercase tracking-wide mb-1">
            {product.category}
          </span>
          <h3 className="font-bold text-[#111827] text-sm leading-tight mb-0.5 line-clamp-2 hover:text-[#F59E0B] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#6B7280] text-[11px]">{product.unit}</p>
        </div>

        <div className="mt-auto">
          <p className="text-[#071421] font-black text-base mb-2">
            {product.price != null
              ? `₹${product.price} / ${product.unit}`
              : <span className="text-[#6B7280] text-sm font-semibold">Ask for Price</span>
            }
          </p>

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-2">
            {/* Quantity control */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decQty}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={11} />
              </button>
              <span className="w-7 text-center text-sm font-semibold text-[#111827]">{qty}</span>
              <button
                onClick={incQty}
                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={11} />
              </button>
            </div>

            {/* Add to cart button */}
            <button
              id={`add-cart-${product.id}`}
              onClick={handleAdd}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-[#F59E0B] text-[#071421] hover:bg-[#FFB21A] shadow-sm'
              }`}
            >
              <ShoppingCart size={13} />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

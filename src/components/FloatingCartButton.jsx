import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCartButton() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      id="floating-cart-btn"
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#F59E0B] rounded-full shadow-2xl shadow-[#F59E0B]/40 flex items-center justify-center hover:bg-[#FFB21A] hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <ShoppingCart size={24} className="text-[#071421]" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#071421] text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}

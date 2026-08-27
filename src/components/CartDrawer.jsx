import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, MessageCircle, Trash2, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateWhatsAppMessage } from '../utils/whatsapp';

export default function CartDrawer() {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    estimatedTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', notes: '' });
  const [showToast, setShowToast] = useState(false);

  const hasAskForPrice = cartItems.some(item => item.price == null);
  const cartIsEmpty = cartItems.length === 0;

  const handleWhatsApp = () => {
    // Build the pre-filled WhatsApp URL targeting +91 8360774127
    const url = generateWhatsAppMessage(cartItems, customerInfo);

    // Brief "Opening WhatsApp…" notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Opens WA app on mobile, WA Web on desktop
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#F59E0B]" />
            <h2 className="font-bold text-lg text-[#111827]">
              Your Cart{' '}
              <span className="text-[#6B7280] font-normal text-base">({totalItems})</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!cartIsEmpty && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <Trash2 size={13} /> Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── "Opening WhatsApp…" toast ── */}
        {showToast && (
          <div className="mx-5 mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 animate-fade-in shrink-0">
            <ExternalLink size={14} className="text-green-600 shrink-0" />
            <p className="text-green-800 text-xs font-semibold">
              Opening WhatsApp with your order…
            </p>
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-3">

          {/* Empty state */}
          {cartIsEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart size={56} className="text-gray-200 mb-4" />
              <p className="text-lg font-semibold text-[#111827] mb-1">Your cart is empty</p>
              <p className="text-sm text-[#6B7280] mb-6">
                Browse our products and add items to your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#F59E0B] text-[#071421] font-bold px-6 py-2.5 rounded-lg hover:bg-[#FFB21A] transition-colors text-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/64x64/071421/F59E0B?text=${encodeURIComponent(item.name[0])}`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#111827] leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#6B7280] mb-0.5">{item.unit}</p>
                      <p className="text-sm font-bold text-[#F59E0B]">
                        {item.price != null
                          ? `₹${item.price.toLocaleString('en-IN')}`
                          : 'Ask for Price'}
                      </p>

                      {/* Qty stepper + line subtotal */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        {item.price != null ? (
                          <span className="text-sm font-bold text-[#111827]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#6B7280] italic">Ask for Price</span>
                        )}
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer details (optional) */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-[11px] font-bold text-[#111827] mb-2 uppercase tracking-wider">
                  Your Details (optional)
                </p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F59E0B] bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F59E0B] bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F59E0B] bg-white"
                  />
                  <textarea
                    placeholder="Additional notes (e.g. preferred brand, delivery time)..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F59E0B] bg-white resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Footer: totals + CTA (hidden when cart is empty) ── */}
        {!cartIsEmpty && (
          <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
            {/* Summary */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[#6B7280]">Total Items</span>
              <span className="font-semibold text-[#111827]">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-[#111827]">Estimated Total</span>
              <span className="text-xl font-black text-[#111827]">
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </span>
            </div>
            {hasAskForPrice && (
              <p className="text-[10px] text-[#6B7280] mb-3 leading-relaxed">
                * Some items are Ask for Price and are not included in the total above.
              </p>
            )}

            {/* Primary CTA — WhatsApp */}
            <button
              id="cart-whatsapp-btn"
              onClick={handleWhatsApp}
              className="w-full bg-[#F59E0B] text-[#071421] font-bold py-3.5 rounded-xl hover:bg-[#FFB21A] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 mb-2 text-sm shadow-lg shadow-[#F59E0B]/30"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-white text-[#111827] font-semibold py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart size={15} />
              Continue Shopping
            </button>

            <p className="text-center text-[10px] text-[#6B7280] mt-2 leading-relaxed">
              Final pricing may vary. We will confirm availability &amp; final price on WhatsApp.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('gaba-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('gaba-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, quantity = 1, selectedPacket = null) => {
    const packet = selectedPacket || (product.packetSizes && product.packetSizes.length > 0 ? product.packetSizes[0] : null);
    const itemKey = `${product.id}-${packet || 'default'}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.itemKey === itemKey || (item.id === product.id && item.selectedPacket === packet));
      if (existing) {
        return prev.map(item =>
          (item.itemKey === itemKey || (item.id === product.id && item.selectedPacket === packet))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, itemKey, selectedPacket: packet, quantity }];
    });
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const estimatedTotal = cartItems.reduce((sum, item) => {
    if (item.price == null) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      estimatedTotal,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

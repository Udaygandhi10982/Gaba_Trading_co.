import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import OfferingsSection from './components/OfferingsSection';
import CategoryStrip from './components/CategoryStrip';
import ProductGrid from './components/ProductGrid';
import WhyChooseUs from './components/WhyChooseUs';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';
import CartDrawer from './components/CartDrawer';
import ProductDetailPage from './components/ProductDetailPage';
import MobileApp from './components/MobileApp';
import InstallBanner from './components/InstallBanner';
import { products, getProductSlug } from './data/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Capture PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Smooth scroll routing listener
  useEffect(() => {
    if (currentPath === '/') {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [currentPath]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    // Scroll to products
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Route matching
  const isAppScope = currentPath === '/app' || currentPath.startsWith('/app/');
  
  // App-scoped product route: /app/products/:slug
  const appProductMatch = currentPath.match(/^\/app\/products\/([^/]+)/);
  const appSlug = appProductMatch ? appProductMatch[1] : null;
  const activeAppProduct = appSlug ? products.find(p => getProductSlug(p.name) === appSlug) : null;

  // Web-scoped product route: /products/:slug
  const webProductMatch = currentPath.match(/^\/products\/([^/]+)/);
  const webSlug = webProductMatch ? webProductMatch[1] : null;
  const activeWebProduct = webSlug ? products.find(p => getProductSlug(p.name) === webSlug) : null;

  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-hidden font-sans bg-[#F7F7F5]">


        {/* Sticky Navbar */}
        {!isAppScope && (
          <Navbar
            searchQuery={searchQuery}
            onSearch={(q) => {
              setSearchQuery(q);
              if (window.location.pathname !== '/') {
                window.history.pushState(null, '', '/#products');
                window.dispatchEvent(new Event('popstate'));
              }
              if (q) {
                setTimeout(() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }
            }}
          />
        )}

        {/* Dynamic Route Content */}
        {isAppScope ? (
          <MobileApp
            activeProduct={activeAppProduct}
            currentPath={currentPath}
            setSelectedCategory={setSelectedCategory}
          />
        ) : webSlug ? (
          <ProductDetailPage 
            product={activeWebProduct} 
            setSelectedCategory={setSelectedCategory} 
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Who We Are (with 3 vertical videos) */}
            <AboutSection />

            {/* Offerings Section */}
            <OfferingsSection />

            {/* Category Strip */}
            <CategoryStrip
              selected={selectedCategory}
              onSelect={handleCategorySelect}
            />

            {/* Product Grid */}
            <ProductGrid
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Contact */}
            <ContactSection />

            {/* CTA Section */}
            <CTASection />

            {/* PWA / App Install Promotion Banner */}
            <InstallBanner deferredPrompt={deferredPrompt} />
          </>
        )}

        {/* Footer */}
        {!isAppScope && <Footer />}

        {/* Floating Cart Button */}
        {!isAppScope && <FloatingCartButton />}

        {/* Cart Drawer */}
        {!isAppScope && <CartDrawer />}
      </div>
    </CartProvider>
  );
}




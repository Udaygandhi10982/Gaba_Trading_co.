import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Categories', href: '#categories' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar({ activeSection = 'home', searchQuery, onSearch }) {
  const { totalItems, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const handleSearch = (e) => {
    setLocalSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/#products');
      window.dispatchEvent(new Event('popstate'));
    }
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleNavClick = (e, href) => {
    if (window.location.pathname !== '/') {
      e.preventDefault();
      window.history.pushState(null, '', '/' + href);
      window.dispatchEvent(new Event('popstate'));
      
      setTimeout(() => {
        const id = href.slice(1);
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      e.preventDefault();
      const id = href.slice(1);
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-[#071421] sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[70px] gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center">
              <Building2 size={22} className="text-[#071421]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-xl tracking-tight">GABA</span>
              <span className="text-[#F59E0B] font-semibold text-[10px] tracking-widest uppercase">Sanitary Specialist</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 relative pb-1 whitespace-nowrap ${
                  window.location.pathname === '/' && activeSection === link.href.slice(1)
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F59E0B] after:rounded-full'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={localSearch}
                  onChange={handleSearch}
                  className="bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-2 pr-9 text-sm focus:outline-none focus:border-[#F59E0B] focus:bg-white/15 transition-all w-52"
                />
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
              </div>
            </form>

            {/* Cart Icon */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F59E0B] text-[#071421] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0d2035] border-t border-white/10 px-4 pb-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="pt-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={localSearch}
                onChange={handleSearch}
                className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-2 pr-9 text-sm focus:outline-none focus:border-[#F59E0B]"
              />
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setMenuOpen(false);
                handleNavClick(e, link.href);
              }}
              className="block py-3 border-b border-white/10 text-white/80 hover:text-[#F59E0B] font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>

  );
}

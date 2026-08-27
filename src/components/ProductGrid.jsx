import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export default function ProductGrid({ selectedCategory, searchQuery }) {
  const [sort, setSort] = useState('recommended');
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [catFilter, setCatFilter] = useState('all');

  const effectiveCat = selectedCategory !== undefined ? selectedCategory : catFilter;
  const effectiveSearch = searchQuery !== undefined ? searchQuery : localSearch;

  const filtered = useMemo(() => {
    let result = products;

    // Category filter
    if (effectiveCat && effectiveCat !== 'all') {
      result = result.filter(p => p.category === effectiveCat);
    }

    // Search filter
    if (effectiveSearch.trim()) {
      const q = effectiveSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    } else if (sort === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [effectiveCat, effectiveSearch, sort]);

  return (
    <section id="products" className="bg-[#F7F7F5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-5">
          <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-1">
            POPULAR MATERIALS
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1 h-7 bg-[#F59E0B] rounded-full inline-block" />
            <h2 className="text-2xl font-black text-[#111827]">Our Popular Materials</h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <input
              type="text"
              placeholder="Search building materials..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Category dropdown (when not controlled externally) */}
          {selectedCategory === undefined && (
            <div className="relative">
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#F59E0B] cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Count */}
          <p className="text-sm text-[#6B7280] ml-auto">
            Showing <span className="font-semibold text-[#111827]">1–{filtered.length}</span> of{' '}
            <span className="font-semibold text-[#111827]">{products.length}+</span> products
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-semibold text-[#111827] mb-1">No products found</p>
            <p className="text-sm text-[#6B7280]">Try a different search or category</p>
          </div>
        )}
      </div>
    </section>
  );
}

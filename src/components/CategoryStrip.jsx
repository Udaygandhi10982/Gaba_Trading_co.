import { categories } from '../data/products';

const categoryImages = {
  'all': '🏗️',
  'Cement': '🪨',
  'Steel & TMT': '🔩',
  'Bricks & Blocks': '🧱',
  'Sand & Aggregates': '🪣',
  'Plumbing': '🔧',
  'Electrical': '⚡',
  'Hardware': '🔨',
  'Paints & Finishing': '🎨',
  'Tiles': '⬜',
  'Tools': '🛠️',
  'Other': '📦',
};

export default function CategoryStrip({ selected, onSelect }) {
  return (
    <section id="categories" className="bg-white border-b border-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-7 bg-[#F59E0B] rounded-full inline-block" />
          <h2 className="text-xl font-bold text-[#111827]">Shop by Category</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => onSelect(cat.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer shrink-0 min-w-[80px] ${
                selected === cat.id
                  ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#F59E0B] hover:shadow-sm'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                  ${selected === cat.id ? 'bg-[#F59E0B]' : 'bg-gray-50'}`}
              >
                {categoryImages[cat.id] || '📦'}
              </div>
              <span
                className={`text-xs font-semibold text-center leading-tight whitespace-nowrap ${
                  selected === cat.id ? 'text-[#F59E0B]' : 'text-[#111827]'
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const CategoryCard = ({
  selectedCategory,
  onSelectCategory,
  selectedLight,
  onSelectLight,
  selectedCare ,
  onSelectCare,
  onResetAll,
}) => {
  const categories = [
    'All',
    'Indoor Plants',
    'Terrariums',
    'Succulents',
    'Care Supplies',
  ];

  const sunlightOptions = [
    'All',
    'Low Light',
    'Bright Indirect',
    'Direct Sunlight',
  ];

  const careOptions = ['All', 'Low-Maintenance', 'Enthusiast'];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-5 shadow-sm text-stone-700 select-none">
      {/* Header: Title & Reset Button */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2 className="font-serif font-bold text-lg text-stone-900 tracking-tight">
          Nursery Filters
        </h2>
        <button
          type="button"
          onClick={onResetAll}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition"
        >
          Reset All
        </button>
      </div>

      {/* 1. Category Section */}
      <div className="mt-5">
        <h3 className="text-[11px] font-bold tracking-wider text-stone-400 uppercase mb-2">
          Category
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-normal'
                  }`}
                >
                  {cat}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Sunlight Needs Section */}
      <div className="mt-6">
        <h3 className="text-[11px] font-bold tracking-wider text-stone-400 uppercase mb-2">
          Sunlight Needs
        </h3>
        <ul className="space-y-1">
          {sunlightOptions.map((light) => {
            const isActive = selectedLight === light;
            return (
              <li key={light}>
                <button
                  type="button"
                  onClick={() => onSelectLight && onSelectLight(light)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-normal'
                  }`}
                >
                  {light}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Care Difficulty Section */}
      <div className="mt-6">
        <h3 className="text-[11px] font-bold tracking-wider text-stone-400 uppercase mb-2">
          Care Difficulty
        </h3>
        <ul className="space-y-1">
          {careOptions.map((care) => {
            const isActive = selectedCare === care;
            return (
              <li key={care}>
                <button
                  type="button"
                  onClick={() => onSelectCare && onSelectCare(care)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-normal'
                  }`}
                >
                  {care}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default CategoryCard;

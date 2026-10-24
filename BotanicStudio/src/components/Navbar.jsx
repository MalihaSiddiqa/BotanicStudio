import { LeafyGreen, Heart, Menu } from "lucide-react";
const Navbar = (props) => {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 p-2">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 sm:gap-4">
        {/* Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={props.onToggleMenu}
            className="m-0 flex items-center gap-2 text-emerald-900 hover:text-black active:bg-stone-300 rounded-lg p-2 sm:p-3"
          >
            <Menu size={24} />
          </button>
          <span className="hidden sm:inline font-bold font-serif text-2xl text-emerald-900">
            Menu
          </span>
        </div>

        {/* Title & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="rounded-full p-2 sm:p-3 bg-emerald-800 text-white shrink-0">
            <LeafyGreen size={20} />
          </div>

          <div className="flex flex-col min-w-0">
            <h1 className="font-serif font-bold text-lg sm:text-2xl truncate">
              Botanic Studio
            </h1>
            <span className="hidden md:block opacity-75 text-sm">
              Nursery & living Terrariums
            </span>
          </div>
        </div>

        {/* Search Input: full-width 2nd row on mobile, inline on md+ */}
        <div className="order-last basis-full md:order-none md:basis-auto flex-1 md:max-w-md md:mx-6 relative">
          <input
            type="text"
            value={props.value}
            onChange={(e) => props.onSearch(e.target.value)}
            placeholder="Search monstera, terrarium, light needs..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100 rounded-full text-xs text-stone-800 placeholder-stone-400
             focus:bg-white focus:ring-2 focus:ring-emerald-800 outline-none transition"
          />
          <span className="absolute left-3 top-2.5 text-stone-400 text-xs">
            🔍
          </span>
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button type="button" className="rounded-full p-2 sm:p-3 bg-stone-100">
            <Heart size={18} />
          </button>
          <button
            onClick={props.onToggleCart}
            className="bg-emerald-800 text-white font-bold min-w-20 px-3 whitespace-nowrap rounded-2xl h-8 sm:mt-3"
          >
            Cart : {props.savedItems}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
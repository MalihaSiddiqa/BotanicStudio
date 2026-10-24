import { LeafyGreen, Heart, Menu } from "lucide-react";
const Navbar = (props) => {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 p-2">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={props.onToggleMenu}
            className="m-0 flex items-center gap-2 text-emerald-900 hover:text-black active:bg-stone-300 rounded-lg p-3"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold font-serif text-2xl text-emerald-900">
            Menu
          </span>
        </div>

        {/* Title & Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-full p-3 bg-emerald-800 text-white">
            <LeafyGreen size={20} />
          </div>

          <div className="flex flex-col">
            <h1 className="font-serif font-bold text-2xl">Botanic Studio</h1>
            <span className="opacity-75 text-sm">
              Nursery & living Terrariums
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md mx-6 relative">
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
        <div className="flex items-center gap-3">
          <button type="button" className="rounded-full p-3 bg-stone-100">
            <Heart size={18} />
          </button>
          <button
            onClick={props.onToggleCart}
            className=" bg-emerald-800 text-white font-bold w-20 rounded-2xl h-8 mt-3"
          >
            Cart : {props.savedItems}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

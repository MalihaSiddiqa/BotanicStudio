import { LeafyGreen, Search,Heart, Menu } from "lucide-react";

const Navbar = (props) => {
  return (
    <div className="w-full bg-white/90 sticky top-0 z-30 p-2">
      {/* Laptop only: menu pinned to the far-left corner of the screen */}
      <div className=" hidden lg:flex items-center absolute gap-4 left-6 top-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={props.onToggleMenu}
          className="flex items-center text-emerald-900 hover:text-emerald-950 active:bg-stone-300 rounded-lg p-3"
        >
          <Menu size={24} />
        </button>
        <span className="font-bold font-serif text-2xl text-emerald-900">
          Menu
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-4 py-1 sm:py-3 grid grid-cols-3 md:grid-cols-4 items-center gap-x-2 sm:gap-x-4 gap-y-2">
        <div className="flex items-center gap-1 sm:gap-4 lg:invisible">
          <button
            type="button"
            onClick={props.onToggleMenu}
            className="flex items-center text-emerald-900 hover:text-emerald-950 active:bg-stone-300 rounded-lg p-2 sm:p-3"
          >
            <Menu size={24} />
          </button>
          <span className="hidden lg:inline font-bold font-serif text-2xl text-emerald-900">
            Menu
          </span>
        </div>

        {/* Title & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="rounded-full p-2  bg-emerald-800 text-white ">
            <LeafyGreen size={24} />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-serif font-bold text-lg sm:text-2xl">
              Botanic Studio
            </h1>
            <span className="lg:block opacity-75 text-sm">
              Nursery & living Terrariums
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="order-last col-span-3 md:order-0 md:col-span-1 md:mx-4 lg:mx-6 relative w-full md:max-w-md md:justify-self-center">
          <input
            type="text"
            value={props.value}
            onChange={(e) => props.onSearch(e.target.value)}
            placeholder="Search monstera, terrarium, light needs..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100 rounded-full text-xs text-stone-800 placeholder-stone-400
             focus:bg-white focus:ring-2 focus:ring-emerald-800 outline-none "
          />
          <span className="absolute left-3 top-2 text-stone-400 text-xs">
            <Search size={15} />
          </span>
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
          onClick={props.onToggleWishlist}
            type="button"
            className="relative rounded-full p-2 sm:p-3 bg-stone-100"
          >
            <Heart size={18} />
             {props.WishlistCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-emerald-900
     text-white rounded-full">
      {props.WishlistCount}
    </span>
              )}
          </button>
          <button
            onClick={props.onToggleCart}
            className="bg-emerald-800 text-white font-bold text-xs sm:text-base px-3 min-w-20 rounded-2xl h-8 lg:mt-3"
          >
            Cart : {props.savedItems}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
import { Heart } from "lucide-react";

const Wishlist = ({
  wishlistItems,
  onClose,
  onRemove,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[85vh] flex flex-col bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
            <Heart size={18} className="fill-rose-600 text-rose-600" />
            Your Wishlist ({wishlistItems.length})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="mt-4 space-y-3 overflow-y-auto pr-1">
          {wishlistItems.length === 0 ? (
            <p className="text-center text-stone-400 text-sm py-8">
              No liked plants yet. Tap the ♡ on a plant to save it here.
            </p>
          ) : (
            wishlistItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-stone-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      ₹{item.price}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="text-[10px] text-red-500 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
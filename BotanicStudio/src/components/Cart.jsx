import { useState } from "react";
import ShippingDetails from "./ShippingDetails";

const Cart = ({
  cartItems = [],
  onClose,
  onRemove,
  onUpdateQty,
  coupon,
  setCoupon,
  setCartItems,
  addShippingDetails,
}) => {
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const discount = isDiscountApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal - discount;
  const ApplyCoupon = () => {
    if (coupon?.trim().toUpperCase() === "PLANTLOVE10") {
      setIsDiscountApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };
  return (
    <>
      <aside className="w-80 sm:w-96 bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between max-h-[calc(100vh-120px)] sticky top-24 select-none">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-serif font-bold text-lg text-stone-900 tracking-tight">
              Your Plant Bag ({cartItems.length})
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-800 text-lg leading-none transition"
            >
              ✕
            </button>
          </div>

          {/* Free Delivery Banner */}
          <div className="mt-3 bg-emerald-50 text-emerald-900 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-2 border border-emerald-100">
            <span>🎉</span> You unlocked Free Delivery!
          </div>

          {/* Items List */}
          <div className="mt-4 space-y-3 overflow-y-auto max-h-72 pr-1">
            {cartItems.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-8">
                Your bag is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50/70 border border-stone-200/60 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  {/* Image */}
                  <img
                    src={item.image || item.img}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-stone-200 shrink-0"
                  />

                  {/* Name & Stepper */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQty && onUpdateQty(item.id, -1)}
                        className="w-5 h-5 bg-white border border-stone-200 text-stone-700 rounded text-xs flex items-center justify-center hover:bg-stone-100 active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-stone-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty && onUpdateQty(item.id, 1)}
                        className="w-5 h-5 bg-white border border-stone-200 text-stone-700 rounded text-xs flex items-center justify-center hover:bg-stone-100 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Item Price & Remove */}
                  <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                    <span className="text-xs font-bold text-stone-900">
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove && onRemove(item.id)}
                      className="text-[10px] text-red-500 hover:text-red-700 font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer / Summary */}
        <div className="pt-4 mt-4 border-t border-stone-200">
          {/* Coupon */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="COUPON: PLANTLOVE10"
              className="flex-1 bg-stone-100 rounded-lg text-[10px] px-2.5 py-1.5 font-mono text-stone-600 outline-none"
            />
            <button
              type="button"
              onClick={ApplyCoupon}
              className="bg-stone-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-stone-800"
            >
              Apply
            </button>
          </div>

          {/* Price Summary */}
          <div className="space-y-1 text-xs text-stone-500 mb-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-stone-800 font-medium">₹{subtotal}</span>
            </div>

            {isDiscountApplied && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>10% Discount (PLANTLOVE10)</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-100">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <button
            onClick={() => addShippingDetails((prev) => !prev)}
            type="button"
            className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] text-white text-xs font-semibold rounded-xl shadow-sm transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default Cart;

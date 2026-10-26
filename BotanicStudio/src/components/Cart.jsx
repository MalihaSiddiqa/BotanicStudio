import { useState } from "react";

const Cart = ({
  cartItems = [],
  onClose,
  onRemove,
  onUpdateQty,
  coupon,
  setCoupon,
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
      <div className="w-full lg:w-120 bg-white/95 rounded-2xl p-5 shadow-lg flex flex-col justify-between sticky top-24">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 ">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Your Plant Bag ({cartItems.length})
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-800 text-lg"
            >
              ✕
            </button>
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
                  className="bg-stone-70 border border-stone-200 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-stone-200 shrink-0"
                  />

                  {/* Name & Stepper */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {item.scientificName}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQty && onUpdateQty(item.id, -1)}
                        className="w-5 h-5 bg-white border border-stone-200 text-stone-700 rounded text-xs flex items-center justify-center "
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-stone-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty && onUpdateQty(item.id, 1)}
                        className="w-5 h-5 bg-white border border-stone-200 text-stone-700 rounded text-xs flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Item Price & Remove */}
                  <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                    <span className="text-xs font-bold text-stone-900">
                      ₹{(item.price ) * (item.quantity || 1)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove && onRemove(item.id)}
                      className="text-[10px] text-red-50 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer*/}
        <div className="pt-4 mt-4 border-t border-stone-200">
          {/* Coupon */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="COUPON: PLANTLOVE10"
              className="flex-1 bg-stone-100 rounded-lg text-[10px] px-2.5 py-1.5 text-stone-600 outline-none"
            />
            <button
              type="button"
              disabled={cartItems.length <=0}
              onClick={ApplyCoupon}
              className="bg-stone-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg "
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
            disabled={cartItems.length <= 0}
            type="button"
            className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>   
      </>
  );
};

export default Cart;

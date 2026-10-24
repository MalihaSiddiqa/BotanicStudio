import { useState } from "react";
import OrderConfirmed from "./OrderConfirmed";

const ShippingDetails = (props) => {
  const [onConfirmation, setonConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setonConfirmation(true);
    if (props.onOrderSuccess) {
      props.onOrderSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px]">
      {/* Modal Container */}

      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <h2 className="font-serif font-bold text-lg text-stone-900 tracking-tight">
            Shipping Details
          </h2>
          <button
            onClick={() => props.setOrderConfirm((prev) => !prev)}
            type="button"
            className="text-stone-400 hover:text-stone-700 text-sm font-semibold transition leading-none p-1"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-800 transition"
            />
          </div>

          {/* Phone Number & City Side-by-Side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                type="tel"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                required
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-800 transition"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-800 transition resize-none"
            />
          </div>

          {/* Simulation Disclaimer */}
          <p className="text-[11px] text-stone-400 italic pt-1">
            This is a simulated checkout. No real payment or money is required.
          </p>

          {/* Confirm Order Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition mt-2"
          >
            CONFIRM ORDER
          </button>
        </form>
        {onConfirmation && (
          <OrderConfirmed
            Name={formData.fullName}
            city={formData.city}
            closeConfirmation={() => {
              setonConfirmation(false);
              if (props.setOrderConfirm) {
                props.setOrderConfirm(false);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ShippingDetails;

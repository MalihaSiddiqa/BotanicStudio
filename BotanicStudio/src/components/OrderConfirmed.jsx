const OrderConfirmed = (props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px]">
      {/* Modal Container */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-stone-200/80 flex flex-col items-center text-center">
        {/* Mint Checkmark Circle */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <svg
            className="w-7 h-7 text-emerald-600 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mb-3">
          Order Confirmed!
        </h2>

        {/* Message */}
        <p className="text-sm text-stone-600 leading-relaxed max-w-xs mb-6">
          Thank you,{" "}
          <span className="font-semibold text-stone-900">{props.Name}</span>.
          Your plants are getting prepped for delivery to{" "}
          <span className="font-semibold text-stone-900">{props.city}</span>.
        </p>

        {/* Close Button */}
        <button
          onClick={() => props.closeConfirmation((prev) => !prev)}
          type="button"
          className="w-full py-3 bg-stone-100 hover:bg-stone-200 active:scale-[0.99] text-stone-800 font-semibold text-sm rounded-xl transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;

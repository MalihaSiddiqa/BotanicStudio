const OrderConfirmed = (props) => {
  return (
    <div 
    onClick={() => props.closeConfirmation((prev) => !prev)}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      {/* Modal Container */}
      <div 
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-stone-200/80 flex flex-col items-center text-center">
        {/* Mint Checkmark Circle */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          ✔️
        
        </div>

        {/* Heading */}
        <h2 className="font-serif font-bold text-2xl text-stone-900 mb-3">
          Order Confirmed!
        </h2>

        {/* Message */}
        <p className="text-sm text-stone-600 max-w-xs mb-6">
          Thank you,{" "}
          <span className="font-semibold text-stone-900">{props.Name}</span>.
          Your plants are getting prepped for delivery to{" "}
          <span className="font-semibold text-stone-900">{props.city}</span>.
        </p>

        {/* Close Button */}
        <button
          onClick={() => props.closeConfirmation((prev) => !prev)}
          type="button"
          className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;

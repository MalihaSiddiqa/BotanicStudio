import { Heart } from "lucide-react";

const Home = (props) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
        <img
          src={props.img}
          alt={props.name}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Heart Icon */}
        <button
        type='button'
          onClick={()=>props.onLike(props.plant)}
         className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/80 text-stone-600 rounded-full text-xs flex justify-center items-center">
          <Heart 
         className={`${props.like ? 'fill-emerald-900 text-emerald-900' : 'fill-none text-stone-600'}`}
          size={15} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-[11px] text-stone-400 mb-1">
            <span className="uppercase font-semibold text-[10px] text-emerald-800">
              {props.category}
            </span>
            <span className="text-stone-500 font-medium">★ 4.8</span>
          </div>

          <h3 className="font-bold text-stone-900 text-sm ">
            {props.name}
          </h3>

          <p className="text-[11px] text-stone-400 italic mt-0.5">
            {props.scientificName}
          </p>
          <p className="text-[11px] text-stone-400 italic mt-0.5">
            {props.careLevel} ({props.lightNeed})
          </p>
        </div>

        {/* Bottom Price & Button Bar */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
          <div>
            <p className="font-bold text-stone-900 text-sm">₹{props.price}</p>
          </div>

          <button
            onClick={()=>props.onSave(props.plant)}
            disabled={props.isSaved}
            className="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg cursor-pointer "
          >
            {props.isSaved ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

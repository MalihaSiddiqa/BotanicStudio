import { useEffect, useState,useMemo } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";
import ShippingDetails from "./components/ShippingDetails";
import Wishlist from "./components/Wishlist";

const App = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [careFilter, setCareFilter] = useState("All");
  const [lightFilter, setLightFilter] = useState("All");
  const [isMenu, setIsMenu] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(false);
  const [isWishlistOpn , setIsWishlistOpn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false)

    const [wishlistItems, setWishlistItems] = useState(() => {
  try {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
  const [cartItems, setCartItems] = useState(() => {
  try {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  useEffect(() => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}, [wishlistItems]);

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

    const API_URL = "https://6adb40d43b7e90b8208f96d6.mockapi.io/plants/plants";
    const fetchPlants = () => {
      axios
        .get(API_URL)
        .then((res) => {
          setPlants(res.data[0]);
          //console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading plants:", err);
          setLoading(false);
        });
    };
    useEffect(() => {
      fetchPlants();
    }, []);
   const filteredPlants = useMemo(() => {
  return plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || plant.category === categoryFilter;
    const matchesCare = careFilter === "All" || plant.careLevel === careFilter;
    const matchesLight = lightFilter === "All" || plant.lightNeed === lightFilter;
    return matchesCategory && matchesCare && matchesLight && matchesSearch;
  });
}, [plants, search, categoryFilter, careFilter, lightFilter]);

const handleToggleWishlist =(plant) => {
  setWishlistItems((prev) =>
     prev.find((item) => item.id === plant.id)  
  ? prev.filter((item) => item.id !== plant.id)
   : [...prev, plant], 
  );}

const handleAddToCart =(plant) => { setCartItems((prev) => [...prev, { ...plant , quantity : 1}])}

   const handleRemoveFromCart =(id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
}

const handleUpdateQty = (id, change) => {
  setCartItems((prev) => {
    return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity ) + change };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
  });
};


    return (
      <div className="bg-amber-50 min-h-screen">
        <Navbar
          WishlistCount={wishlistItems.length}
          savedItems={cartItems.length}
          onToggleWishlist={() => setIsWishlistOpn((prev) => !prev)}
          onToggleCart={() => setIsCartOpen((prev) => !prev)}
          onToggleMenu={() => setIsMenu((prev) => !prev)}
          value={search}
          onSearch={(text) => setSearch(text)}
        />

        {(isMenu || isCartOpen || isWishlistOpn || shippingDetails) && (
          <div
            className="fixed inset-0 bg-black/30 z-40 "
            onClick={() => {
              setIsMenu(false);
              setIsCartOpen(false);
              setIsWishlistOpn(false)
              setShippingDetails(false)
            }}
          />
        )}

        <main className="w-full px-3 sm:px-6 py-6 flex items-start gap-6">

          {isMenu &&
            <div className="w-64 fixed top-0 left-0 h-full z-50 bg-white">
              <CategoryCard
                selectedCategory={categoryFilter}
                onSelectCategory={(v) => {
                  setCategoryFilter(v);
                }}
                selectedLight={lightFilter}
                onSelectLight={(v) => {
                  setLightFilter(v);
                }}
                selectedCare={careFilter}
                onSelectCare={(v) => {
                  setCareFilter(v);
                }}
                onResetAll={() => {
                  setCategoryFilter("All");
                  setLightFilter("All");
                  setCareFilter("All");
                }}
              />
            </div>
          }

          {/* Plants Catalog */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <p className="opacity-75 text-center py-10">Loading...</p>
            ): filteredPlants.length === 0 ? (
             <p className="opacity-75 text-center py-10">
                No plants found. Try a different search or filter.
                 </p>
                )
             : (
              <div
                className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
              >
                {filteredPlants.map((plant) => (
                  <Home 
                    key={plant.id}
                    plant={plant}
                    img={plant.image}
                    name={plant.name}
                    scientificName={plant.scientificName}
                    category={plant.category}
                    price={plant.price}
                    careLevel={plant.careLevel}
                    lightNeed={plant.lightNeed}
                    like={wishlistItems.some((item) => item.id === plant.id)}
                    isSaved={cartItems.some((item) => item.id === plant.id)}
                    onLike={()=>handleToggleWishlist(plant)}
                    onSave={() => handleAddToCart(plant)}
                  />
                ))}
              </div> 
            )}
          </div>

          {isCartOpen && (
            <div 
            className="w-full fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 ">
              <Cart
                setCartItems={setCartItems}
                cartItems={cartItems}
                onClose={() => setIsCartOpen(false)}
                onRemove={handleRemoveFromCart}
                onUpdateQty={handleUpdateQty}
                addShippingDetails={setShippingDetails}
              />
            </div>
          )}
        </main>

        {shippingDetails &&  (
          <ShippingDetails
            addShippingDetails={setShippingDetails}
            onOrderSuccess={() => {
              setCartItems([]);
            }}
          />
        )}
        {isWishlistOpn && <Wishlist 
        wishlistItems={wishlistItems}
        onClose={()=> setIsWishlistOpn((prev) => !prev)}
        onRemove={handleToggleWishlist}
        />}
      </div>
    )
  }

export default App

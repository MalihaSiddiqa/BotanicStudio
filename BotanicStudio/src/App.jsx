import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Home from "./components/Home";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";
import ShippingDetails from "./components/ShippingDetails";
import Wishlist from "./components/Wishlist";
import { useMemo } from "react";
import { useCallback } from "react";

const App = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [wishlistItems, setWishlistItems] = useState(() => {
  try {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
  const [isWishlistOpn , setIsWishlistOpn] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [careFilter, setCareFilter] = useState("All");
  const [lightFilter, setLightFilter] = useState("All");
  const [cartItems, setCartItems] = useState(() => {
  try {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [orderConfirm, setOrderConfirm] = useState(false);


  useEffect(() => {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}, [wishlistItems]);

// optional: for the cart
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);


const handleToggleWishlist = useCallback((plant) => {
  setWishlistItems((prev) =>
    prev.some((item) => item.id === plant.id)
      ? prev.filter((item) => item.id !== plant.id)
      : [...prev, plant],
  );
}, []);

const handleAddToCart = useCallback((plant) => {
  setCartItems((prev) => {
    const exists = prev.find((item) => item.id === plant.id);
    if (exists) {
      return prev.map((item) =>
        item.id === plant.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item,
      );
    }
    return [...prev, { ...plant, quantity: 1 }];
  });
}, []);


   const handleRemoveFromCart = useCallback((id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
}, []);

const handleUpdateQty = useCallback((id, change) => {
  setCartItems((prev) =>
    prev
      .map((item) => {
        if (item.id === id) {
          const newQty = (item.quantity || 1) + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean),
  );
}, []);

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
    const closeDrawersOnMobile = () => {
      if (window.innerWidth < 1024) {
        setIsMenu(false);
        setIsCartOpen(false);
      }
    };
    return (
      <div className="bg-amber-50 min-h-screen">
        <Navbar
           WishlistCount={wishlistItems.length}
          onToggleWishlist={() => setIsWishlistOpn((prev) => !prev)}
          onToggleCart={() => setIsCartOpen((prev) => !prev)}
          savedItems={cartItems.length}
          onToggleMenu={() => setIsMenu((prev) => !prev)}
          value={search}
          onSearch={(text) => setSearch(text)}
        />

        {/* Backdrop for mobile/tablet drawers (tap outside to close) */}
        {(isMenu || isCartOpen) && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => {
              setIsMenu(false);
              setIsCartOpen(false);
            }}
          />
        )}

        <main className="w-full px-3 sm:px-6 py-6 flex items-start gap-6">
          {/* 1. Left: Menu Sidebar (drawer below lg, inline at lg+) */}
          <div
            className={`fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto bg-white lg:bg-transparent overflow-y-auto lg:overflow-visible transition-all duration-300 shrink-0 ${
              isMenu
                ? "w-64 max-w-[85vw] opacity-100 translate-x-0"
                : "w-0 opacity-0 -translate-x-4 pointer-events-none"
            }`}
          >
            <div className="w-64 max-w-[85vw]">
              <CategoryCard
                selectedCategory={categoryFilter}
                onSelectCategory={(v) => {
                  setCategoryFilter(v);
                  closeDrawersOnMobile();
                }}
                selectedLight={lightFilter}
                onSelectLight={(v) => {
                  setLightFilter(v);
                  closeDrawersOnMobile();
                }}
                selectedCare={careFilter}
                onSelectCare={(v) => {
                  setCareFilter(v);
                  closeDrawersOnMobile();
                }}
                onResetAll={() => {
                  setCategoryFilter("All");
                  setLightFilter("All");
                  setCareFilter("All");
                  closeDrawersOnMobile();
                }}
              />
            </div>
          </div>

          {/* 2. Center: Plants Catalog */}
          <div className="flex-1 min-w-0 transition-all duration-300">
            {loading ? (
              <p className="opacity-75 text-center">loading...</p>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                  isMenu && isCartOpen
                    ? "lg:grid-cols-2 xl:grid-cols-3"
                    : isMenu || isCartOpen
                      ? "lg:grid-cols-3 xl:grid-cols-4"
                      : "lg:grid-cols-4 xl:grid-cols-5"
                }`}
              >
                {filteredPlants.map((plant) => (
                  <Home 
                    onLike={()=>handleToggleWishlist(plant)}
                    like={wishlistItems.some((item) => item.id === plant.id)}
                    key={plant.id}
                    plant={plant}
                    img={plant.image}
                    name={plant.name}
                    scientificName={plant.scientificName}
                    category={plant.category}
                    price={plant.price}
                    careLevel={plant.careLevel}
                    lightNeed={plant.lightNeed}
                    isSaved={cartItems.some((item) => item.id === plant.id)}
                    onSave={() => handleAddToCart(plant)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 3. Right: Cart (drawer below lg, inline at lg+) */}
          <div
            className={`fixed lg:static top-0 right-0 h-full lg:h-auto z-50 lg:z-auto overflow-y-auto lg:overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${
              isCartOpen
                ? "w-[90vw] max-w-sm sm:w-96 opacity-100 translate-x-0 p-3 lg:p-0"
                : "w-0 opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <div className="w-full lg:w-96">
              <Cart
                setCartItems={setCartItems}
                coupon={coupon}
                setCoupon={setCoupon}
                cartItems={cartItems}
                onClose={() => setIsCartOpen(false)}
                onRemove={handleRemoveFromCart}
                onUpdateQty={handleUpdateQty}
                addShippingDetails={setOrderConfirm}
              />
            </div>
          </div>
        </main>

        {orderConfirm && (
          <ShippingDetails
            setOrderConfirm={setOrderConfirm}
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

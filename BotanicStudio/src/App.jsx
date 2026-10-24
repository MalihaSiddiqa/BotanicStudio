import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Home from "./components/Home";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";
import ShippingDetails from "./components/ShippingDetails";

const App = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isLiked, seIsLiked] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [careFilter, setCareFilter] = useState("All");
  const [lightFilter, setLightFilter] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [orderConfirm, setOrderConfirm] = useState(false);

  const handleAddToCart = (plant) => {
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
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id, change) => {
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
  };

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
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || plant.category === categoryFilter;
    const matchesCare = careFilter === "All" || plant.careLevel === careFilter;
    const matchesLight =
      lightFilter === "All" || plant.lightNeed === lightFilter;
    const matchesFilter = matchesCategory && matchesCare && matchesLight;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar
        onToggleCart={() => setIsCartOpen((prev) => !prev)}
        savedItems={cartItems.length}
        onToggleMenu={() => setIsMenu((prev) => !prev)}
        value={search}
        onSearch={(text) => setSearch(text)}
      />
      <main className="w-full px-6 py-6 flex items-start gap-6">
        {/* 1. Left: Menu Sidebar */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${
            isMenu
              ? "w-64 opacity-100 translate-x-0"
              : "w-0 opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          <div className="w-64">
            <CategoryCard
              selectedCategory={categoryFilter}
              onSelectCategory={setCategoryFilter}
              selectedLight={lightFilter}
              onSelectLight={setLightFilter}
              selectedCare={careFilter}
              onSelectCare={setCareFilter}
              onResetAll={() => {
                setCategoryFilter("All");
                setLightFilter("All");
                setCareFilter("All");
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
              className={`grid gap-6 ${
                isMenu && isCartOpen
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                  : isMenu || isCartOpen
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              }`}
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
                  isSaved={cartItems.some((item) => item.id === plant.id)}
                  onSave={() => handleAddToCart(plant)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. Right: Smooth Sliding Cart Panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${
            isCartOpen
              ? "w-80 sm:w-96 opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <div className="w-80 sm:w-96">
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
    </div>
  );
};

export default App;

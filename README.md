# 🌿 Botanic Studio

**Botanic Studio** is a responsive, modern e-commerce web application for a plant nursery and living terrariums[cite: 2, 4]. Built with React, Tailwind CSS, and Lucide React icons, it features dynamic multi-criteria plant filtering, an interactive sliding drawer cart with quantity management, coupon discounts, and a simulated checkout flow with instant order confirmation[cite: 1, 15, 17, 18, 20].

---

## ✨ Features

- **Live Search & Plant Catalog**: Real-time name search and grid catalog rendering plant images, scientific names, categories, and prices[cite: 4, 19, 21].
- **Dynamic Multi-Criteria Filters**: Collapsible sidebar menu to filter inventory by:
  - **Category**: Indoor Plants, Terrariums, Succulents, Care Supplies[cite: 15]
  - **Sunlight Needs**: Low Light, Bright Indirect, Direct Sunlight[cite: 15]
  - **Care Difficulty**: Low-Maintenance, Enthusiast[cite: 15]
- **Sliding Slide-Over Drawers**: Smooth Tailwind animations for both the left filter panel (`CategoryCard`) and the right shopping cart panel (`Cart`)[cite: 15, 18, 19].
- **Interactive Bag / Cart**:
  - Quantity controls (`+` / `-`) and item removal[cite: 17, 26].
  - Subtotal calculation.
  - Coupon code support (`PLANTLOVE10` for an instant 10% discount)[cite: 17].
  - Dynamic free delivery banner and bag badge counter[cite: 16, 17, 25].
- **Simulated Checkout Flow**:
  - `ShippingDetails` modal with required form validation (Full Name, Phone, City, Address)[cite: 22, 23, 24, 25].
  - `OrderConfirmed` success modal featuring a personalized thank-you message and order confirmation state[cite: 20, 21].
  - Automatic bag clearance upon order completion.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)[cite: 2, 8]
- **Icons**: [Lucide React](https://lucide.dev/) (`LeafyGreen`, `Heart`, `Menu`)[cite: 1, 23]
- **HTTP Client**: [Axios](https://axios-http.com/)[cite: 19]
- **Data Source**: MockAPI (`mockapi.io`)[cite: 9]

---

## 📂 Project Structure

```text
BotanicStudio/
├── src/
│   ├── components/
│   │   ├── Cart.jsx            # Sliding cart drawer & checkout trigger
│   │   ├── CategoryCard.jsx    # Nursery filter options & reset controls
│   │   ├── Home.jsx            # Plant product display card
│   │   ├── Navbar.jsx          # Header with menu toggle, search bar & cart count
│   │   ├── OrderConfirmed.jsx  # Order success modal
│   │   └── ShippingDetails.jsx # Checkout address & customer details form
│   ├── App.jsx                 # Main application controller & centralized state
│   ├── index.css               # Global Tailwind CSS directives
│   └── main.jsx                # Application root entry point
├── package.json
├── tailwind.config.js
└── vite.config.js

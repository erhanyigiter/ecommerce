import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopDetails from "./pages/ShopDetails";
import NotFound from "./components/NotFound";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import Wishlist from "./pages/Whislist";
import OrderTrackingPage from "./pages/OrderTrackingPage"; // OrderTrackingPage'i import ediyoruz

function App() {
  return (
    <>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/shop" element={<ShopDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} /> {/* OrderTrackingPage rotası */}
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;

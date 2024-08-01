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

function App() {
  return (
    <>
      <TopBar />
      <NavBar />
      <Routes>
        {/* Anasayfa için rota */}
        <Route path="/" element={<MainPage />} />
        {/* Ürün detayları sayfası için rota */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        {/* Diğer sayfalar için ek rotalar burada tanımlanabilir */}
        <Route path="/shop" element={<ShopDetails/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;

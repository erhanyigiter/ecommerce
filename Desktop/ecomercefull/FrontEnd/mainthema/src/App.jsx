import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ProductDetailsPage from "./pages/ProductDetailsPage";

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
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;

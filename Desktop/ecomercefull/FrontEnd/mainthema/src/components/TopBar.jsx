import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.products || []);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Arama terimi ile eşleşen ürünleri filtrele
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(searchResults); // Konsol logları ile sonuçları kontrol edin

    // Arama sonuçları sayfasına yönlendirme
    navigate('/search', { state: { searchResults, searchTerm } });
  };

  return (
    <div className="container-fluid">
      {/* Diğer kodlar */}
      <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
        <div className="col-lg-4">
          <Link to="/" className="text-decoration-none">
            <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
          </Link>
        </div>
        <div className="col-lg-4 col-6 text-left">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button type="submit" className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 col-6 text-right">
          <p className="m-0">Customer Service</p>
          <h5 className="m-0"><a href="tel:+905382015729" className="text-dark">0538 201 5729</a></h5>
        </div>
      </div>
    </div>
  );
}

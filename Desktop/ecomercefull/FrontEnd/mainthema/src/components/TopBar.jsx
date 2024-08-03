import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Büyük küçük harf duyarlılığını kaldırarak arama terimiyle eşleşen ürünleri bulma
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Arama sonuçlarını bir sayfada göstermek için yönlendirme
    navigate('/search', { state: { searchResults } });
  };

  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-1 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center h-100">
            <Link className="text-body mr-3" to="#">About</Link>
            <Link className="text-body mr-3" to="#">Contact</Link>
            <Link className="text-body mr-3" to="#">Help</Link>
            <Link className="text-body mr-3" to="#">FAQs</Link>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">My Account</button>
              <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" type="button">Sign in</button>
                <button className="dropdown-item" type="button">Sign up</button>
              </div>
            </div>
          </div>
          <div className="d-inline-flex align-items-center d-block d-lg-none">
            <Link to="/" className="btn px-0 ml-2">
              <i className="fas fa-heart text-dark"></i>
              <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
            </Link>
            <Link to="/" className="btn px-0 ml-2">
              <i className="fas fa-shopping-cart text-dark"></i>
              <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
            </Link>
          </div>
        </div>
      </div>
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

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/categoriesSlice';

const NavBar = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className="container-fluid bg-dark mb-30">
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <button
            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
            style={{ height: '65px', padding: '0 30px' }}
            onClick={toggleCategories}
          >
            <h6 className="text-dark m-0">
              <i className="fa fa-bars mr-2"></i>Categories
            </h6>
            <i className={`fa fa-angle-down text-dark ${isCategoriesOpen ? 'rotate-icon' : ''}`}></i>
          </button>
          <div
            className={`collapse navbar-collapse ${isCategoriesOpen ? 'show' : ''}`}
            style={{ width: 'calc(100% - 30px)', zIndex: 999 }}
            
          >  <div className="navbar-nav w-100">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <a key={index} href="#" className="nav-item nav-link">
                {category.name}
              </a>
            ))
          ) : (
            <span>No Categories Available</span>
          )}
        </div>
          
          </div>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <a href="#" className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav mr-auto py-0">
                <a href="/" className="nav-item nav-link active">Home</a>
                <a href="/shop" className="nav-item nav-link">Shop</a>
                <a href="/detail" className="nav-item nav-link">Shop Detail</a>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1"></i></a>
                  <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                    <a href="/cart" className="dropdown-item">Shopping Cart</a>
                    <a href="/checkout" className="dropdown-item">Checkout</a>
                  </div>
                </div>
                <a href="/contact" className="nav-item nav-link">Contact</a>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <a href="#" className="btn px-0">
                  <i className="fas fa-heart text-primary"></i>
                  <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                </a>
                <a href="cart" className="btn px-0 ml-3">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/categoriesSlice';

const NavBar = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.shoppingCart);

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
          >
            <div className="navbar-nav w-100">
              {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                  <Link key={index} to={`/category/${category.id}`} className="nav-item nav-link">
                    {category.name}
                  </Link>
                ))
              ) : (
                <span>No Categories Available</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
            </Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav mr-auto py-0">
                <Link to="/" className="nav-item nav-link active">Home</Link>
                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                <Link to="/about" className="nav-item nav-link">About</Link>
                <Link to="/contact" className="nav-item nav-link">Contact</Link>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <Link to="/wishlist" className="btn px-0">
                  <i className="fas fa-heart text-primary"></i>
                  <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>
                    0
                  </span>
                </Link>
                <Link to="/cart" className="btn px-0 ml-3">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>
                    {items.length}
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

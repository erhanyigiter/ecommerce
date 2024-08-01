import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';

export default function ProductsMain() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = products.map((product) => (
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img className="img-fluid w-100" src={product.imageUrl} alt={product.name} />
            <div className="product-action">
              <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-shopping-cart"></i></a>
              <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
              <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-search"></i></a>
            </div>
          </div>
          <div className="text-center py-4">
            <a className="h6 text-decoration-none text-truncate" href="#">{product.name}</a>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>${product.price}</h5><h6 className="text-muted ml-2"><del>${product.price}</del></h6>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small>(99)</small>
            </div>
          </div>
        </div>
      </div>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Recent Products</span></h2>
      <div className="row px-xl-5">
        {content}
      </div>
    </div>
  );
}

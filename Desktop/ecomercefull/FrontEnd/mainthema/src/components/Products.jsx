import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { Button } from 'reactstrap';

const Products = () => {
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
    content = (
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
          {products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product.id}>
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src={product.imageUrl} alt={product.name} />
                  <div className="product-action">
                    <Button className="btn btn-outline-dark btn-square">
                      <i className="fa fa-shopping-cart"></i>
                    </Button>
                    <Button className="btn btn-outline-dark btn-square">
                      <i className="far fa-heart"></i>
                    </Button>
                    <Button className="btn btn-outline-dark btn-square">
                      <i className="fa fa-sync-alt"></i>
                    </Button>
                    <Button className="btn btn-outline-dark btn-square">
                      <i className="fa fa-search"></i>
                    </Button>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    {product.name}
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${product.price}</h5>
                    {product.oldPrice && (
                      <h6 className="text-muted ml-2">
                        <del>${product.oldPrice}</del>
                      </h6>
                    )}
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    {[...Array(5)].map((_, index) => (
                      <small
                        className={`fa fa-star ${index < product.rating ? 'text-primary' : 'text-secondary'}`}
                        key={index}
                      ></small>
                    ))}
                    <small>({product.reviews})</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default Products;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { Link } from 'react-router-dom';

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
                <Link to={`/product/${product.id}`}>
                  <div className="product-img position-relative overflow-hidden" style={{ height: '250px' }}>
                    <img className="img-fluid w-100 h-100" src={product.imageUrl} alt={product.name} style={{ objectFit: 'cover' }} />
                  </div>
                </Link>
                <div className="text-center py-4">
                  <Link to={`/product/${product.id}`} className="h6 text-decoration-none text-truncate">
                    {product.name}
                  </Link>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${product.price}</h5>
                    {product.oldPrice && (
                      <h6 className="text-muted ml-2">
                        <del>${product.oldPrice}</del>
                      </h6>
                    )}
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

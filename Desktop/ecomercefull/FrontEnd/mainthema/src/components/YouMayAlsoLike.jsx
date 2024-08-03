import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const YouMayAlsoLike = ({ currentProductId }) => {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (status === 'succeeded' && products.length > 0) {
      // currentProductId ile eşleşmeyen ürünleri filtrele
      const otherProducts = products.filter((product) => product.id !== currentProductId);

      // Diğer ürünler arasından rastgele ürünler seç
      if (otherProducts.length > 0) {
        const shuffledProducts = [...otherProducts].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffledProducts.slice(0, Math.min(4, shuffledProducts.length)));
      } else {
        setRandomProducts(products);
      }
    }
  }, [products, status, currentProductId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid py-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">You May Also Like</span>
      </h2>
      <div className="row px-xl-5">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="product-item bg-light h-100" style={{ cursor: 'pointer' }}>
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div className="product-img position-relative overflow-hidden">
                    <img className="img-fluid w-100" src={product.imageUrl} alt={product.name} style={{ objectFit: 'cover', height: '250px' }} />
                  </div>
                  <div className="text-center py-4">
                    <div className="h6 text-decoration-none text-truncate">{product.name}</div>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${product.price}</h5>
                    </div>
                    <div className="product-description mt-2">
                      <p className="text-muted small mb-0" style={{ height: '50px', overflow: 'hidden' }}>
                        {product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description}
                      </p>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-center mb-1">
                      {[...Array(5)].map((_, index) => (
                        <small
                          className={`fa fa-star ${index < product.rating ? 'text-primary' : 'text-secondary'}`}
                          key={index}
                        ></small>
                      ))}
                      <small>({product.reviews})</small>
                    </div> */}
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No products to show</div>
        )}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;

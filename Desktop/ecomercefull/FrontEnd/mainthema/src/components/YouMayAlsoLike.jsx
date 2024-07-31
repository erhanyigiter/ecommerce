import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const YouMayAlsoLike = ({ currentProductId }) => {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    console.log('Products:', products); // Verileri kontrol etmek için
    console.log('Current Product ID:', currentProductId);

    if (status === 'succeeded' && products.length > 0) {
      const otherProducts = products.filter((product) => product.id !== currentProductId);
      console.log('Other Products:', otherProducts); // Filtered products

      if (otherProducts.length === 0 && products.length > 0) {
        setRandomProducts([products[0]]); // Mevcut ürünü göster
      } else {
        const shuffledProducts = [...otherProducts].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffledProducts.slice(0, Math.min(4, shuffledProducts.length)));
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
        <div className="col">
          <div className="owl-carousel related-carousel">
            {randomProducts.length > 0 ? (
              randomProducts.map((product) => (
                <div className="product-item bg-light" key={product.id}>
                  <div className="product-img position-relative overflow-hidden">
                    <img className="img-fluid w-100" src={product.imageUrl} alt={product.name} />
                    <div className="product-action">
                      <a className="btn btn-outline-dark btn-square" href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="#">
                        <i className="far fa-heart"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="#">
                        <i className="fa fa-sync-alt"></i>
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="#">
                        <i className="fa fa-search"></i>
                      </a>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a className="h6 text-decoration-none text-truncate" href="#">
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
              ))
            ) : (
              <div>No products to show</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;

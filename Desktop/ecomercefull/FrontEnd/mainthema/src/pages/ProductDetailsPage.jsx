import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YouMayAlsoLike from '../components/YouMayAlsoLike';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.products.products.find(product => product.id === parseInt(id)));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-lg-5 mb-30">
          <div id="product-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner bg-light">
              {product.images && product.images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img className="w-100 h-100" src={image.url} alt={`Product Image ${index + 1}`} />
                </div>
              ))}
            </div>
            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
              <i className="fa fa-2x fa-angle-left text-dark"></i>
            </a>
            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
              <i className="fa fa-2x fa-angle-right text-dark"></i>
            </a>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{product.name}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                {[...Array(5)].map((_, index) => (
                  <small key={index} className={`fas fa-star ${index < product.rating ? 'text-primary' : ''}`}></small>
                ))}
              </div>
              <small className="pt-1">({product.reviews} Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
            <p className="mb-4">{product.description}</p>
            <div className="d-flex mb-3">
              <strong className="text-dark mr-3">Sizes:</strong>
              <form>
                {product.sizes && product.sizes.map((size, index) => (
                  <div key={index} className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id={`size-${index}`} name="size" />
                    <label className="custom-control-label" htmlFor={`size-${index}`}>
                      {size}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
                {product.colors && product.colors.map((color, index) => (
                  <div key={index} className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id={`color-${index}`} name="color" />
                    <label className="custom-control-label" htmlFor={`color-${index}`}>
                      {color}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input type="text" className="form-control bg-secondary border-0 text-center" value="1" />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3">
                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
            </div>
            <div className="d-flex pt-2">
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-dark px-2" href="#">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YouMayAlsoLike />
    </div>
  );
}

export default ProductDetailsPage;

import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function CustomCarousel() {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <Carousel className="mb-30 mb-lg-0">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/carousel-1.jpg"
                alt="First slide"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <div className="p-3" style={{ maxWidth: '700px' }}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                  <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/carousel-2.jpg"
                alt="Second slide"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <div className="p-3" style={{ maxWidth: '700px' }}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                  <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/carousel-3.jpg"
                alt="Third slide"
                style={{ height: '430px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <div className="p-3" style={{ maxWidth: '700px' }}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                  <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src="img/offer-1.jpg" alt="offer-1" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary">Shop Now</a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src="img/offer-2.jpg" alt="offer-2" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

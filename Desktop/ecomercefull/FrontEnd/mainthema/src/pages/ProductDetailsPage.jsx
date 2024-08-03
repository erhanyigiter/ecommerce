import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '../redux/shoppingCartSlice';
import YouMayAlsoLike from '../components/YouMayAlsoLike';
import { fetchProducts } from '../redux/productsSlice';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.products.products.find(product => product.id === parseInt(id)));
  const cartItems = useSelector((state) => state.shoppingCart.items);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes[0] ? product.sizes[0] : '');
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0] : '');
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Ürün açıklamasından renk ve beden bilgilerini ayrıştır
  const description = product.description || '';
  const colorPattern = /Color:([^|]+)/i;
  const sizePattern = /Sizes:([^|]+)/i;

  const colors = description.match(colorPattern) ? description.match(colorPattern)[1].split(',').map(c => c.trim()) : [];
  const sizes = description.match(sizePattern) ? description.match(sizePattern)[1].split(',').map(s => s.trim()) : [];

  const handleAddToCart = () => {
    // Sepetteki ürünleri kontrol et
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id && item.product.description === `Size: ${selectedSize}, Color: ${selectedColor}`
    );

    // Sepetteki mevcut miktarı ve eklenmek istenen miktarı kontrol et
    const totalQuantityInCart = existingCartItem ? existingCartItem.quantity + quantity : quantity;

    // Toplam miktar stoktan fazlaysa hata mesajı göster
    if (totalQuantityInCart > product.stock) {
      alertify.error('Cannot add more than available stock.');
      return;
    }

    // Sepete ekleme işlemi
    const cartItem = {
      productId: product.id,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: `Size: ${selectedSize}, Color: ${selectedColor}`,
      },
      quantity,
    };

    dispatch(addItemToCart(cartItem));

    // Sepete ekleme işlemi tamamlandığında kullanıcıya bildirim göster
    alertify.success('Item added to cart successfully!');
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-lg-5 mb-30">
          <div id="product-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner bg-light">
              {product.imageUrl ? (
                <div className="carousel-item active">
                  <img className="d-block w-100" src={product.imageUrl} alt={product.name} />
                </div>
              ) : (
                <div className="carousel-item active">
                  <img className="d-block w-100" src="/path/to/default-image.jpg" alt="Default Product" />
                </div>
              )}
            </div>
            <a className="carousel-control-prev" href="#product-carousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#product-carousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{product.name}</h3>
            <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
            <p className="mb-4">{product.description}</p>

            <div className="d-flex mb-3">
              <strong className="text-dark mr-3">Sizes:</strong>
              <form>
                {sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <div key={index} className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${index}`}
                        name="size"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                      />
                      <label className="custom-control-label" htmlFor={`size-${index}`}>
                        {size}
                      </label>
                    </div>
                  ))
                ) : (
                  <div>No available sizes</div>
                )}
              </form>
            </div>

            <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
                {colors.length > 0 ? (
                  colors.map((color, index) => (
                    <div key={index} className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`color-${index}`}
                        name="color"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                      />
                      <label className="custom-control-label" htmlFor={`color-${index}`}>
                        {color}
                      </label>
                    </div>
                  ))
                ) : (
                  <div>No available colors</div>
                )}
              </form>
            </div>
            <div>Stock: {product.stock} available. Enjoy your shopping.</div>
            <br />
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-minus" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-center"
                  value={quantity}
                  readOnly
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-plus" onClick={() => setQuantity(quantity < product.stock ? quantity + 1 : quantity)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3" onClick={handleAddToCart}>
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
                  <i className="fab fa-pinterest"></i>
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

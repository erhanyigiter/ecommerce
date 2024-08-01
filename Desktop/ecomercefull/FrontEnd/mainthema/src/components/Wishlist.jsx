import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWishlist, addItemToCart, removeFromWishlist } from "../redux/wishlistSlice";
import Hero from "../components/Hero";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWishlist());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <>
      <Hero title="Wishlist" subtitle="Your favorite products" />
      <div className="page-content-wrapper">
        <div className="shopping-cart-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table-container">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th className="product-name" colSpan={2}>
                          Product
                        </th>
                        <th className="product-price">Price</th>
                        <th className="product-subtotal">&nbsp;</th>
                        <th className="product-remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map((item) => (
                        <tr key={item.id}>
                          <td className="product-thumbnail">
                            <Link to={`/product/${item.product.slug}`}>
                              <img
                                src={item.product.image}
                                className="img-fluid"
                                alt={item.product.title}
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link to={`/product/${item.product.slug}`}>
                              {item.product.title}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="price">${item.product.price}</span>
                          </td>
                          <td className="add-to-cart">
                            <button
                              onClick={() => dispatch(addItemToCart(item.product))}
                              className="theme-button theme-button--alt theme-button--wishlist"
                            >
                              ADD TO CART
                            </button>
                          </td>
                          <td className="product-remove">
                            <button
                              onClick={() => dispatch(removeFromWishlist(item.product))}
                            >
                              <i className="pe-7s-close" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;

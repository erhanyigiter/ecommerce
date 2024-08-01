import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingCart, clearCart, removeItemFromCart, updateItemInCart } from '../redux/shoppingCartSlice';
import { Button, Table } from 'reactstrap';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchShoppingCart());
    }
  }, [dispatch, status]);

  const handleRemoveItem = async (itemId) => {
    await dispatch(removeItemFromCart(itemId));
    dispatch(fetchShoppingCart()); // Güncellenen veriyi yeniden yüklemek için
    alertify.success('Item removed from cart.');
  };

  const handleClearCart = async () => {
    await dispatch(clearCart());
    dispatch(fetchShoppingCart()); // Güncellenen veriyi yeniden yüklemek için
    alertify.success('Cart cleared.');
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity <= 0) {
      await dispatch(removeItemFromCart(item.id));
    } else {
      const updatedItem = { ...item, quantity: newQuantity };
      await dispatch(updateItemInCart({ id: item.id, updatedItem }));
    }
    dispatch(fetchShoppingCart()); // Güncellenen veriyi yeniden yüklemek için
  };

  // Ürünleri birleştirme ve miktarlarını toplama
  const mergedItems = items.reduce((acc, item) => {
    const existingItem = acc.find(i => i.product.id === item.product.id && i.product.description === item.product.description);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  // Toplam fiyat hesaplama
  const totalPrice = mergedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <Table bordered hover className="table-light table-borderless text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {mergedItems.map((item) => {
                  const sizeMatch = item.product.description.match(/Sizes:([^,]+)/);
                  const colorMatch = item.product.description.match(/Color:([^,]+)/);

                  const size = sizeMatch ? sizeMatch[1].trim() : 'N/A';
                  const color = colorMatch ? colorMatch[1].trim() : 'N/A';

                  return (
                    <tr key={item.id}> {/* Benzersiz ve sabit bir key */}
                      <td className="align-middle">
                        <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '50px' }} /> {item.product.name}
                      </td>
                      <td className="align-middle">${item.product.price}</td>
                      <td className="align-middle">{size}</td>
                      <td className="align-middle">{color}</td>
                      <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">${item.quantity * item.product.price}</td>
                      <td className="align-middle">
                        <Button color="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                          <i className="fa fa-times"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="col-lg-4">
            <form className="mb-30" action="">
              <div className="input-group">
                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                <div className="input-group-append">
                  <Button color="primary">Apply Coupon</Button>
                </div>
              </div>
            </form>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Cart Summary</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>${totalPrice}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>${totalPrice + 10}</h5>
                </div>
                <Button color="success" block className="font-weight-bold my-3 py-3" onClick={() => alertify.success('Proceeding to checkout...')}>
                  Proceed To Checkout
                </Button>
                <Button color="danger" block className="font-weight-bold my-3 py-3" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default CartPage;

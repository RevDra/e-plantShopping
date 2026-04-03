import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from './CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const CartItem = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>Paradise Nursery</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart" className="cart-icon">
            🛒 <span className="cart-count">{totalQuantity}</span>
          </Link>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Cost: ${totalAmount}</p>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.cost}</p>
                  <p>Total: ${item.cost * item.quantity}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decrementQuantity(item.name))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.name))}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

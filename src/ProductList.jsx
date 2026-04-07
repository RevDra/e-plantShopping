import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=1000&auto=format&fit=crop", cost: 25 },
      { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", cost: 18 },
      { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=1000&auto=format&fit=crop", cost: 30 },
      { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1000&auto=format&fit=crop", cost: 15 },
      { name: "Boston Fern", image: "https://images.unsplash.com/photo-1512428813833-df521677bb92?q=80&w=1000&auto=format&fit=crop", cost: 22 },
      { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=1000&auto=format&fit=crop", cost: 35 }
    ]
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1000&auto=format&fit=crop", cost: 32 },
      { name: "Lavender", image: "https://images.unsplash.com/photo-1520903074185-8ec362b39c67?q=80&w=1000&auto=format&fit=crop", cost: 18 },
      { name: "Gardenia", image: "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?q=80&w=1000&auto=format&fit=crop", cost: 38 },
      { name: "Rosemary", image: "https://images.unsplash.com/photo-1515541582439-07bf5a997132?q=80&w=1000&auto=format&fit=crop", cost: 15 },
      { name: "Mint", image: "https://images.unsplash.com/photo-1607013142842-16dc2c82c270?q=80&w=1000&auto=format&fit=crop", cost: 10 },
      { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1533934191487-19379183bb76?q=80&w=1000&auto=format&fit=crop", cost: 14 }
    ]
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      { name: "Pothos", image: "https://images.unsplash.com/photo-1597055181300-e3633a207519?q=80&w=1000&auto=format&fit=crop", cost: 12 },
      { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop", cost: 40 },
      { name: "Jade Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1000&auto=format&fit=crop", cost: 20 },
      { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop", cost: 45 },
      { name: "Philodendron", image: "https://images.unsplash.com/photo-1512429234300-1c0286887295?q=80&w=1000&auto=format&fit=crop", cost: 28 },
      { name: "Snake Plant 'Laurentii'", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=1000&auto=format&fit=crop", cost: 25 }
    ]
  }
];

const ProductList = ({ setShowProductList }) => {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (name) => {
    return cartItems.some(item => item.name === name);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setShowProductList(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={handleHomeClick}>
          Paradise Nursery
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link" onClick={handleHomeClick}>Home</a>
          <a href="#" className="navbar-link" onClick={handlePlantsClick}>Plants</a>
          <div className="cart-icon" onClick={handleCartClick}>
            🛒 <span className="cart-count">{totalCartItems}</span>
          </div>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-list">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index}>
              <h2 className="category-title">{categoryGroup.category}</h2>
              <div className="product-grid">
                {categoryGroup.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="price">${plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={isItemInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isItemInCart(plant.name) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

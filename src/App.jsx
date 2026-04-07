import React, { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
          <div className="content">
            <div className="landing_content">
              <h1>Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Bringing Nature into Your Home</p>
              <button className="get-started-btn" onClick={() => setShowProductList(true)}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList setShowProductList={setShowProductList} />
        </div>
      )}
    </div>
  );
}

export default App;

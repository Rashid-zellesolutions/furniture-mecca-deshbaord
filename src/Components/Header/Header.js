// Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="parentHeadClass">
      <div className="categoryClass">
        <div className="product">All Product</div>
        <div className="authSection">
          <img src="/Notifier.png" alt="Notifier" className="notifierImage" />
          <img src="/Frame.png" alt="Frame" className="framerImage" />
          <a href="https://myfurnituremecca.com" target="_blank" rel="noopener noreferrer" className="furnitureMeccaText">
            Furniture Mecca
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

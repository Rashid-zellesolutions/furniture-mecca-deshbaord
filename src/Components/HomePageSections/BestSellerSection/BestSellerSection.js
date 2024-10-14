import React, { useState } from 'react'
import './BestSellerSection.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png';

const BestSellerSection = () => {
  const [showCategory, setShowCategory] = useState(false);
  const handleCategoryDropDown = () => {setShowCategory(!showCategory)}
  return (
    <div>
      <CMSHead 
            heading={"Best Seller"}
            buttonText={"Save"}
        />
        <div className='best-seller-category'>
            <div className='best-seller-inner-section'>
                <div className='best-seller-dropdown-main'>
                  <div className='best-seller-drop-down-head' onClick={handleCategoryDropDown}>
                    <p>Add Category</p>
                    <img src={arrowDown} alt='arrow-down' />
                  </div>
                  <div className={`best-seller-dropdown-body ${showCategory ? 'show-category' : ''}`}>
                      <p>item one</p>
                      <p>item two</p>
                      <p>item three</p>
                  </div>
                </div>
                <div className='best-seller-category-btn'>
                  <button>
                    + add
                  </button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default BestSellerSection

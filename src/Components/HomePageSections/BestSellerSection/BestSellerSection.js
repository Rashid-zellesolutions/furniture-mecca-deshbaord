import React, { useState } from 'react'
import './BestSellerSection.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png';
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png'
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';

const BestSellerSection = () => {
  const [showCategory, setShowCategory] = useState(false);
  const handleCategoryDropDown = () => {setShowCategory(!showCategory)}
  const [showCategories, setShowCategories] = useState(false);
    const selectCategoryData = [
        { name: 'None' },
        { name: 'Bedroom' },
        { name: 'Living Room' },
        { name: 'Dining Room' },
        { name: 'Outlets' },
        { name: 'Matterasses' },

    ]
    const handleCategories = () => {
        setShowCategories(!showCategories)
    }
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
                      <div className='best-seller-dropdown-containt'>
                          <div className='best-seller-category-image-upload-div'>
                            <img src={uploadImageIcon} alt='upload image' />
                          </div>
                          <div className='best-seller-dropdown-inputs-div'>
                            <input type='text' placeholder='Text' className='best-seller-category-title-input' />
                            <CategoryDropdown 
                              handleCategories={handleCategories}
                              showCategories={showCategories}
                              selectCategoryData={selectCategoryData}
                            />
                          </div>
                      </div>
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

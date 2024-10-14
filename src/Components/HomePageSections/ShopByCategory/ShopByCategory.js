import React, { useState } from 'react'
import './ShopByCategory.css'
import explanationMark from '../../../Assets/Images/Frame.png';
import eyeIcon from '../../../Assets/Images/hide-show.png'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';

const ShopByCategory = ({categoryHeading}) => {
    const [showCategories, setShowCategories] = useState(false);
    const handleCategories = () => {
        setShowCategories(!showCategories)
    }
  return (
    <div className='CategoryMainSection'>
        {/* <div className='CategoryHead'>
            <div className='CategoryHeadLeft'>
                <h3>{categoryHeading}</h3>
                <img src={explanationMark} alt='icon' />
            </div>
            <div className='CategoryHeadRight'>
                <img src={eyeIcon} alt='hide-show' />
                <button>Save</button>
            </div>
        </div> */}
        <CMSHead 
            heading={'Shop By Category'}
            buttonText={'Save'}
        />
        <div className='CategoryBody'>
            <p className='category-heading'>Select Category</p>
            <div className='category-fropdown-and-button'>
            <div className='category-dropdown'>
                <div className='category-drop-down-head' onClick={handleCategories}>
                    <p>Select Category</p>
                    <img src={arrowDown} alt='arrow down' />
                </div>
                <div className={`categor-drop-down-items ${showCategories ? 'show-drop-down-items' : ''}`}>
                    <p>item one</p>
                    <p>item two</p>
                    <p>Living Room</p>
                </div>
            </div>
            <div className='add-category-btn-div'>
                <button>
                    + Add
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShopByCategory

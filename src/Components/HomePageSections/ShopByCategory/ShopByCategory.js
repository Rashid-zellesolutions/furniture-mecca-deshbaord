import React, { useState } from 'react'
import './ShopByCategory.css'
import explanationMark from '../../../Assets/Images/Frame.png';
import eyeIcon from '../../../Assets/Images/hide-show.png'
// import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';

const ShopByCategory = ({ categoryHeading }) => {
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
                    {/* <div className='category-dropdown'>
                        <div className='category-drop-down-head' onClick={handleCategories}>
                            <p>Select Category</p>
                            <img src={arrowDown} alt='arrow down' />
                        </div>
                        <div className={`categor-drop-down-items ${showCategories ? 'show-drop-down-items' : ''}`}>
                            {selectCategoryData.map((item, index) => (
                                <p key={index}>{item.name}</p>
                            ))}
                        </div>
                    </div> */}
                    <CategoryDropdown 
                        handleCategories={handleCategories}
                        selectCategoryData={selectCategoryData}
                        showCategories={showCategories}
                    />
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

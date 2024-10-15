import React from 'react'
import './CategoryDropdown.css'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png'

const CategoryDropdown = ({handleCategories, selectCategoryData, showCategories}) => {
    return (
        <div className='category-dropdown'>
            <div className='category-drop-down-head' onClick={handleCategories}>
                <p>Select Category</p>
                <img src={arrowDown} alt='arrow down' />
            </div>
            <div className={`categor-drop-down-items ${showCategories ? 'show-drop-down-items' : ''}`}>
                {selectCategoryData.map((item, index) => (
                    <p key={index}>{item.name}</p>
                ))}
            </div>
        </div>
    )
}

export default CategoryDropdown

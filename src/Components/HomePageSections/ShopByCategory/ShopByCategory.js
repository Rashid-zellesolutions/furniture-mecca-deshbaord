import React, { useState } from 'react'
import './ShopByCategory.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';

const ShopByCategory = () => {
    const selectCategoryData = [
        { name: 'None' },
        { name: 'Bedroom' },
        { name: 'Living Room' },
        { name: 'Dining Room' },
        { name: 'Outlets' },
        { name: 'Matterasses' },

    ]

    // Multi Select
    const [selectedCategories, setSelectedCategories] = useState(['']);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = (index) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
        console.log("toggle dropdown", dropdownOpen)
    };
    const handleSelect = (index, category) => {
        const newCategory = [...selectedCategories];
        newCategory[index] = category;
        setSelectedCategories(newCategory);
        setDropdownOpen(false);
        console.log("handle select", dropdownOpen)
        console.log("new category", newCategory)
    }

    const addDropdown = () => {
        setSelectedCategories((prev) => [...prev, ''])
    }
    const deleteDropdown = (index) => {
        setSelectedCategories((prev) => prev.filter((_, i) => i !== index));
    }
    return (
        <div className='CategoryMainSection'>
            <CMSHead
                heading={'Shop By Category'}
                buttonText={'Save'}
            />
            <div className='CategoryBody'>
                <p className='category-heading'>Select Category</p>
                <div className='category-fropdown-and-button'>
                    <CategoryDropdown
                        selectCategoryData={selectCategoryData}
                        selectedCategories={selectedCategories}
                        toggleDropdown={toggleDropdown}
                        dropdownOpen={dropdownOpen}
                        handleSelect={handleSelect}
                        deleteDropdown={deleteDropdown}
                    />
                    <div className='add-category-btn-div'>
                        <button onClick={addDropdown}>
                            + Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopByCategory

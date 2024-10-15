import React, {useState} from 'react'
import './FurnitureForBudget.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png';
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';

const FurnitureForBudget = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null)
    const selectCategoryData = [
        { name: 'None' },
        { name: 'Bedroom' },
        { name: 'Living Room' },
        { name: 'Dining Room' },
        { name: 'Outlets' },
        { name: 'Matterasses' },

    ]
    const handleCategories = (index) => {
        setShowCategories(!showCategories)
        setCurrentIndex((prevIndex) => (prevIndex === index) ? null : index)
    }
  return (
    <div>
    <CMSHead 
            heading={"Furniturre For Every Budget"}
            buttonText={"Save"}
        />
      <div className='furniture-for-budget-main-container'>
        <div className='furniture-for-budget-cards-container'>
          {[0,1,2].map((items, index) => (
            <div className='furniture-for-budget-card'>
                <div className='furniture-for-budget-image-upload-main-div'>
                    <div className='furniture-for-budget-image-upload'>
                      <img src={uploadImageIcon} alt='upload image' />
                    </div>
                </div>
                <div className='furniture-for-budget-card-footer'>
                    <CategoryDropdown 
                      handleCategories={() => handleCategories(index)}
                      showCategories={currentIndex === index ? true : false}
                      selectCategoryData={selectCategoryData}
                    />
                    <input type='text' placeholder='Price($)' className='furniture-for-budget-price' />
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FurnitureForBudget

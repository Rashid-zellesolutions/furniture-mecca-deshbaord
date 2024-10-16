import React, {useEffect, useState} from 'react'
import './FurnitureForBudget.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png';
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';

const FurnitureForBudget = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [currentIndex, setCurrentIndex] = useState(null)
  const [furniturePrice, setFurniturePrice] = useState('');
  const [furnitureData, setFurnitureData] = useState([])
    const selectCategoryData = [
        { name: 'None' },
        { name: 'Bedroom' },
        { name: 'Living Room' },
        { name: 'Dining Room' },
        { name: 'Outlets' },
        { name: 'Matterasses' },

    ]

    // Gallery modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }

    const handleCategories = (index) => {
        setShowCategories(!showCategories)
        setCurrentIndex((prevIndex) => (prevIndex === index) ? null : index)
    }

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

    // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      return newSelectedIMages;
    })
    setModalView(false);
  };

    useEffect(() => {
      const newFurnitureData = {
        image: selectedImage,
        category: selectedCategories[0]?.name,
        price: furniturePrice
      }
      setFurnitureData((prev) => ({
        ...prev,
        ...newFurnitureData
      }));
      console.log("new furniture", newFurnitureData)
      console.log("this is furniture data", furnitureData)

    }, [selectedImage, selectedCategories, furniturePrice])
    useEffect(() => {
  console.log("Updated furniture data:", furnitureData);
}, [furnitureData]);

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
                    <div className='furniture-for-budget-image-upload' onClick={handleModalOpen}>
                      <img src={uploadImageIcon} alt='upload image' />
                    </div>
                </div>
                <div className='furniture-for-budget-card-footer'>
                    <CategoryDropdown
                        selectCategoryData={selectCategoryData}
                        selectedCategories={selectedCategories}
                        toggleDropdown={toggleDropdown}
                        dropdownOpen={dropdownOpen}
                        handleSelect={handleSelect}
                        deleteDropdown={deleteDropdown}
                    />
                    <input 
                      type='text' 
                      placeholder='Price($)' 
                      className='furniture-for-budget-price'
                      value={furniturePrice}
                      onChange={(e) => setFurniturePrice(e.target.value)} 
                    />
                </div>
            </div>
          ))}
        </div>
      </div>
      <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
        // imageSendPayload={imageSendPayload}
        // setImageSendPayload={setImageSendPayload}
        // alt_text={imageSendPayload.alt_text}
        // title={imageSendPayload.title}
        // data={data}
        // handleFileChange={handleFileChange}
      />
    </div>
  )
}

export default FurnitureForBudget

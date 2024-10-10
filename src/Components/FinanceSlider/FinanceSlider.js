import React, {useState, useEffect} from 'react'
import './FinanceSlider.css'
import CMSHead from '../UI-Controls/CMSHead/CMSHead'
import CMSBody from '../CMSBody/CMSBody'
import ImageGalleryPopup from '../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup'
import InfoPopUp from '../InfoPopUp/InfoPopUp'
import axios from 'axios'

const FinanceSlider = () => {
    const [modalView, setModalView] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [deletedImagesIds, setDeletedImagesIds] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleModalOpen = () => {setModalView(true)}
  const handleModalClose = () => {setModalView(false)}

  // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => [...prevImages, image]); // Add new image to the array
    setModalView(false); 
    console.log("home page selected image", selectedImage)
  };
  const handleImageDelete = (id) => {
    setSelectedImage((prevImages) => {
      const updatedImages = prevImages.filter((image) => image._id !== id);
      setDeletedImagesIds((prevDeletedIds) => {
        if(!prevDeletedIds.includes(id)){
          return [...prevDeletedIds, id];
        }
        return prevDeletedIds;
      })

      return updatedImages;
    })
  };
  const [infoModal, setInfoModal] = useState(false);
  const handeShowInfoModal = () => {
    setInfoModal(true)
  }
  const handleCloseInfoModal = () => {
    setInfoModal(false);
  }

  // Add bulk 
  const sendImagesHomeSlider = async () => {
    try {
      const updatedImages = selectedImage.map(image => ({
        ...image,
        uid: image._id,
      }));
      const response = await axios.post('https://fm.skyhub.pk/api/v1/pages/home/slider/add-bulk', updatedImages, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response from API:', response.data);
      alert("images send to slider successfully", response)
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <div className='FinanceSlider'>
        <CMSHead
          heading={'Finance Slider'}
          buttonText={'Save'}
          sendImagesHomeSlider={sendImagesHomeSlider}
          handeShowInfoModal={handeShowInfoModal}
        />
        <CMSBody 
          bodyText={'Upload Image'}
          selectedImage={selectedImage}
          handleModalOpen={handleModalOpen}
          handleImageDelete={handleImageDelete}
          setModalView={setModalView}
        />
        <ImageGalleryPopup 
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
        />
        <InfoPopUp 
          showInfoModal={infoModal}
          handleCloseInfoModal={handleCloseInfoModal} 
        />
    </div>
  )
}

export default FinanceSlider

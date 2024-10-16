import React, {useState} from 'react'
import './FinancingBanner.css';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import imageUploadIcon from '../../../Assets/Images/uploadImg 48 x 48.png'
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';

const FinancingBanner = () => {
  const [modalView, setModalView] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  // Gallery modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }

  // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      return newSelectedIMages;
    })
    setModalView(false);
  };
  return (
    <div>
        <CMSHead 
            heading={"Financing Banner"}
            buttonText={"Save"}
        />
        <div className='financing-slider-main-body'>
          <div className='financing-slider-inner-body'>
              <div className='financing-banner-image-border' onClick={handleModalOpen}>
                  <img src={imageUploadIcon} alt='image-upload' />
              </div>
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

export default FinancingBanner

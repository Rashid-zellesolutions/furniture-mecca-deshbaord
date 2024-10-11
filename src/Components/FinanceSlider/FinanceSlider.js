import React, { useState, useEffect } from 'react';
import './FinanceSlider.css';
import CMSHead from '../UI-Controls/CMSHead/CMSHead';
import CMSBody from '../CMSBody/CMSBody';
import ImageGalleryPopup from '../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import InfoPopUp from '../InfoPopUp/InfoPopUp';
import axios from 'axios';
import { url } from '../../Services/Api';

const FinanceSlider = () => {
  const [selectedImage, setSelectedImage] = useState([])
  const [homeSliderImagesFromApi, setHomeSliderImagesFromApi] = useState([])
  const [combinedImages, setCombinedIMages] = useState([])
  const [data, setData] = useState([])
  const [modalView, setModalView] = useState(false)


  // All type of functions start from here
  
  // Gallery modal open and close functions 
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }

  // Get data from api
  const getApi = async () => {
    try {
        const response = await axios.get(`${url}/api/v1/pages/home/finance-slider/get`);
        setData(response.data.homeSliders)
        console.log("home api response ", response)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getApi()
  }, [])

  // get images in finance slider 

  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      updateCombinedImages(homeSliderImagesFromApi, newSelectedIMages);
      return newSelectedIMages;
    })
    setModalView(false);
  };

  // set all images to combiled state 

  const updateCombinedImages = (apiImages, selectedImages) => {
    const newCombinedImages = [...apiImages, ...selectedImages];
    setCombinedIMages(newCombinedImages)
  }

  // Get Images from api 

  const getHomeSliderImagesFRomApi = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/slider/get')
      setHomeSliderImagesFromApi(response.data.homeSliders)
      updateCombinedImages(response.data.homeSliders, selectedImage)
    } catch (error) {
      console.error("error geting slider images", error);
    }
  }

  useEffect(() => {
    getHomeSliderImagesFRomApi()
    
  }, [])
  

  return (
    <div className='FinanceSlider'>
      <CMSHead
        heading={'Finance Slider'}
        buttonText={'Save'}
        // sendImagesHomeSlider={sendImagesHomeSlider}
        // handleShowInfoModal={() => setInfoModal(true)}
      />
      <CMSBody 
        bodyText={'Upload Image'}
        selectedImage={selectedImage}
        handleModalOpen={handleModalOpen}
        // handleImageDelete={handleImageDelete}
        // setModalView={setModalView}
      />
      <ImageGalleryPopup 
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        // onImageSelect={handleImageSelect}
        // data={data}
        addImageToHomeSliderApi={`/api/v1/media/pages/home/slider/add`}
      />
      <InfoPopUp 
        // showInfoModal={infoModal}
        // handleCloseInfoModal={() => setInfoModal(false)} 
      />
    </div>
  );
};

export default FinanceSlider;

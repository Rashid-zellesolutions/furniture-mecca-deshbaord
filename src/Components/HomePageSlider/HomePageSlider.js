import React, {useState, useEffect} from 'react'
import './HomePageSlider.css'
import axios from 'axios';
import Loader from '../UI-Controls/Loader/Loader';

// icons
import CMSMain from '../CMSMain/CMSMain';
import CMSHead from '../UI-Controls/CMSHead/CMSHead';
import CMSBody from '../CMSBody/CMSBody';
import ImageGalleryPopup from '../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import InfoPopUp from '../InfoPopUp/InfoPopUp';
import useLoader from '../../Services/LoaderHook';
import { url } from '../../Services/Api';

const HomePageSlider = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [loading, setLoading] = useState()
  const [selectedImage, setSelectedImage] = useState([])
  const [homeSliderImagesFromApi, setHomeSliderImagesFromApi] = useState([])
  const [combinedImages, setCombinedIMages] = useState([])
  const [deletedImagesIds, setDeletedImagesIds] = useState([])

  // gallery modal imports
  const [data, setData] = useState([])

  // Gallery Modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const [imageSendPayload, setImageSendPayload] = useState({
      file: null,
      alt_text: '',
      title: '',
      description: '',
  })


  // Get data from api
  const getApi = async () => {
    try {
        const response = await axios.get(`${url}/api/v1/media/pages/home/slider/get`);
        setData(response.data.homeSliders)
        console.log("home api response ", response.data.homeSliders)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getApi()
  }, [])

  const handleModalClose = () => {
    setModalView(false)
  }

  // info modal
  const handeShowInfoModal = () => {
    setInfoModal(true)
  }

  const handleCloseInfoModal = () => {
    setInfoModal(false);
  }

  // get images in homepage slider 

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

  // Delete Image from temporary and api

  const handleImageDelete = (id) => {
    const existsInApiImage = homeSliderImagesFromApi.some(image => image._id === id);
    setCombinedIMages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image._id !== id);

      if(!existsInApiImage){
        setSelectedImage((prevSelected) => prevSelected.filter(image => image._id !== id)) 
      }
      
      setDeletedImagesIds((prevDeletedIds) => {
        // Only add the ID to deletedImagesIds if it's from the API
        if (existsInApiImage && !prevDeletedIds.includes(id)) {
          return [...prevDeletedIds, id];
        }
        // If the image is temporary, don't add it to deletedImagesIds
        return prevDeletedIds;
      });
      
      return updatedImages;
    });
  };

  // Add bulk 

  const sendImagesHomeSlider = async () => {
    try {
      // Filter selected images to post
      const imagesToPost = selectedImage.filter(image => !deletedImagesIds.includes(image._id));
  
      // Find only the IDs that need to be deleted from the API
      const apiImagesToDelete = deletedImagesIds.filter(id => homeSliderImagesFromApi.some(image => image._id === id));
  
      if (apiImagesToDelete.length > 0) {
        try {
          await deleteImagesBulk(apiImagesToDelete);
        } catch (error) {
          console.error("Error during delete images from API:", error);
        }
      }
  
      // Proceed to post images that are not deleted
      if (imagesToPost.length > 0) {
        await posImagesToHomeSlider(imagesToPost);
        console.log("Selected images posted to database:", imagesToPost);
        alert("All new images added to home slider");
      } else {
        alert("No images to add to slider");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

  };
  
  const deleteImagesBulk = async (ids) => {
    return axios.post(`https://fm.skyhub.pk/api/v1/pages/home/slider/delete-bulk`, ids , {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set
      }
    });
  }

  const posImagesToHomeSlider = async (images) => {
    const updatedImages = images.map(image => ({
      ...image,
      uid: image._id,
    }));
    return axios.post('https://fm.skyhub.pk/api/v1/pages/home/slider/add-bulk', updatedImages, {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set
      }
    })
  }

  // console.log("home page Data", data)

  return (
        <div className='SlderMainSection'>
          {loading && <Loader />}
        <CMSHead
          heading={'Home Page Slider'}
          buttonText={'Save'}
          sendImagesHomeSlider={sendImagesHomeSlider}
          handeShowInfoModal={handeShowInfoModal}
        />

        <CMSBody 
          bodyText={'Upload Image'}
          selectedImage={combinedImages}
          handleModalOpen={handleModalOpen}
          handleImageDelete={handleImageDelete}
          setModalView={setModalView}
        />

        <ImageGalleryPopup 
          showImageGalleryPopUp={modalView}
          handleModalView={handleModalClose}
          onImageSelect={handleImageSelect}
          imageSendPayload={imageSendPayload}
          setImageSendPayload={setImageSendPayload}
          alt_text={imageSendPayload.alt_text}
          title={imageSendPayload.title}
          // getGalleyImages={getGalleyImages}
          data={data}
          addImageToHomeSliderApi={`/api/v1/media/pages/home/slider/add`}
        />
        <InfoPopUp 
          showInfoModal={infoModal}
          handleCloseInfoModal={handleCloseInfoModal} 
        />
      </div>
  )
}

export default HomePageSlider


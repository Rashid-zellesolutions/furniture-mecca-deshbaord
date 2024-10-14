import React, { useEffect, useRef, useState } from 'react'
import './TrandingNow.css';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import imageUploadIcon from '../../../Assets/Images/uploadImg 48 x 48.png';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import { url } from '../../../Services/Api';
import { uploadImage } from '../../../Services/functions';
import axios from 'axios';
import crossBtn from '../../../Assets/Images/cross-button-32-X-32.png'

const TrandingNow = () => {
  const [modalView, setModalView] = useState(false);
  const [uploadedStatus, setUploadedStates] = useState('');
  const [trandingNowMainImageIndex, setTrandingNowMainImageIndex] = useState(0);
  const [mediaDeta, setMediaData] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [trandingNowMainImages, setTrandingNowMainImages] = useState([])
  const [subImagesData, setSubImagesData] = useState(Array(6).fill(null));
  const [combinedTrandingNowImages, setCombinedTrandingNowImages] = useState(null);
  const [checkCMSData, setCheckCMSData] = useState(null);
  // Track IDs for the images to allow deletions
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const handleImageDelete = (imageId) => {
  setDeletedImageIds((prev) => [...prev, imageId]); // Track deleted image ID
};


  const [imageSendPayload, setImageSendPayload] = useState({
    file: null,
    alt_text: '',
    title: '',
    description: '',
  });

  // upload image to tranding now media 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/pages/home/trending/add`

    if (file) {
      setImageSendPayload((prevData) => ({
        ...prevData,
        file: file,
      }));
      setUploadedStates('loading');
      alert('wait');
      const imagePayloadToSend = new FormData();
      imagePayloadToSend.append('image', file);
      imagePayloadToSend.append('alt_text', imageSendPayload.alt_text);
      imagePayloadToSend.append('title', imageSendPayload.title);
      imagePayloadToSend.append('description', imageSendPayload.description);
      imagePayloadToSend.append('image_url', imageSendPayload.image_url);
      imagePayloadToSend.append('link_url', imageSendPayload.link_url);

      await uploadImage(imagePayloadToSend, api, setUploadedStates)

    }
    console.log("handleChange file", file);
  }
  const handleImageSelect = (selectedImage) => {
    const newSelectedImage = selectedImage;
    console.log('Selected Image:', newSelectedImage);
    if (selectedImageIndex !== null) {
      setSubImagesData((prevData) => {
        const newData = [...prevData];
        newData[selectedImageIndex] = newSelectedImage;
        return newData;
      });
      handleModalClose()
    } else {
      setTrandingNowMainImages((prevData) => [...prevData, newSelectedImage]);
      handleModalClose()
    }
    // Handle the selected image as needed
  };

  // get tranding now images of media
  const getTrandingNowMediaImages = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/media/pages/home/trending/get');
      setMediaData(response.data.data)
      console.log('tranding now media images response', response.data.data);
    } catch (error) {
      console.error('Error', error);
    }
  }
  useEffect(() => {
    getTrandingNowMediaImages()
  }, [])

  // get cms data to check if its empty or not
  const getTrandingNowCMSData = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/trending-now/get');
      console.log("existing payload of tranding now", response.data.data);
      if (response.data && response.data.data) {
        setCheckCMSData(response.data.data)
      }
      console.log("check cms", checkCMSData)
    } catch (error) {
      console.error("error checking cms data", error);
    }
  }

  useEffect(() => {
    getTrandingNowCMSData();
  }, []);

  // create payload to send on CMS
  const createTrandingNowCMSPayload = () => {
    const payload = {
      sliders: []
    };
    if (trandingNowMainImages.length >= 2) {
      payload.sliders = trandingNowMainImages.map((image, index) => ({
        uid: `slider-${index + 1}`,
        image_url: image.image_url,
        alt_text: image.alt_text || '',
        title: image.title || '',
        llink_url: image.link_url || '#',
        description: image.description || ''
      }));
    }

    subImagesData.forEach((item, index) => {
      if (item && item.image_url) {
        payload[`product_${index + 1}`] = {
          uid: `product-${index + 1}`,
          image_url: item.image_url, // Adjust based on your actual data structure
          alt_text: item.alt_text || `Product ${index + 1}`,
          title: item.title || '',
          link_url: item.link_url || '#',
          description: item.description || '',
        }
      }
    });

    return payload
  }

  useEffect(() => {
    createTrandingNowCMSPayload();
  }, [trandingNowMainImages, subImagesData]);

  // update existing data of tranding now
  const editTrandingData = async () => {
    const existingPayload = checkCMSData;
    const updatedPayload = createTrandingNowCMSPayload();

    // Merge existing sliders with new ones while avoiding duplicates if necessary
  // Filter out deleted images from existing sliders
  const mergedSliders = existingPayload.sliders
    .filter(slider => !deletedImageIds.includes(slider._id)) // Exclude deleted images
    .concat(updatedPayload.sliders)
    .filter((value, index, self) =>
      index === self.findIndex((t) => (t.image_url === value.image_url))
    );

    const payloadToUpload = {
      ...existingPayload,
      sliders: mergedSliders,

      ...subImagesData.reduce((acc, item, index) => {
        if(item && item.image_url){
           acc[`product_${index + 1}`] = {
            uid: `product-${index + 1}`,
            image_url: item.image_url,
            alt_text: item.alt_text || `Product ${index + 1}`,
            title: item.title || '',
            link_url: item.link_url || '#',
            description: item.description || '',
          };
        }
        return acc;
      }, {})
    };
    const editApi = `https://fm.skyhub.pk/api/v1/pages/home/trending-now/${existingPayload._id}`;
    try {
      const response = await axios.put(editApi, {...payloadToUpload, id: existingPayload._id});
      console.log("Edit images response", response.data);
    } catch (error) {
      console.error("updating data error", error);
    }
  }

  // send payload to cms
  const sendTrandingNowData = async (payload) => {
    const trandingNowApi = `https://fm.skyhub.pk/api/v1/pages/home/trending-now/add`;
    try {
      const response = await axios.post(trandingNowApi, payload);
      console.log("send Tranding images response", response.data)
    } catch (error) {
      console.error("error", error);
    }
  }

  // check payload structure and call api to send data
  // const handleSaveClick = () => {
  //   const payload = createTrandingNowCMSPayload();
  //   if (payload.sliders.length >= 2 && Object.keys(payload).length > 1) {
  //     sendTrandingNowData(payload); 
  //   } else {
  //     console.error("Payload is not valid:", payload);
  //   }
  // };

  // Handle save click to determine whether to add or edit
  const handleSaveClick = () => {
    const payload = createTrandingNowCMSPayload();
    if (checkCMSData) {
      // If CMS data exists, call edit function
      editTrandingData();
    } else if (payload.sliders.length >= 2) {
      // If CMS is empty, call existing add function
      sendTrandingNowData(payload); // Your existing add function should be implemented here
    } else {
      console.error("Not enough images to save");
    }
  };

  // handle modal open and close
  const handleModalOpen = (index = null) => {
    setSelectedImageIndex(index);
    setModalView(true);
  }
  const handleModalClose = () => {
    setModalView(false)
  }

  return (
    <div className='tranding-now-main-container'>
      <CMSHead
        heading={"Tranding Now"}
        buttonText={"Save"}
        sendImagesHomeSlider={handleSaveClick}
      />
      <div className='tranding-now-body-top'>
        <div className='tranding-now-body-main-container'>
          <div className='tranding-now-main-image-slider'>
            {checkCMSData && 
            checkCMSData.sliders && 
            checkCMSData.sliders.length > 0 ? (
              <div className='tranding-now-slider-container'>
                <div className='tranding-now-slider'
                  style={{ 
                    transform: `translateX(-${trandingNowMainImageIndex * 100}%)`, 
                    transition: 'transform 0.5s ease' 
                  }}
                >
                  {checkCMSData.sliders.map((image, index) => (
                    <div
                      className={`tranding-now-slide ${index === trandingNowMainImageIndex ? 'active' : ''}`}
                      key={index}
                    >
                      <div className='tranding-now-slider-body-selected-images-slider'>
                        <button 
                          className='image-slider-image-delete' 
                          onClick={() => handleImageDelete(image._id)}
                          /* onClick={() => handleImageDelete(image._id)} */ 
                        >
                          <img 
                            src={crossBtn} 
                            alt='delete-btn' 
                          />
                        </button>
                        <img 
                          src={`${url}${image.image_url}`} 
                          alt={`Selected ${index + 1}`} 
                          className='tranding-now-image-slider-image' 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='tranding-now-pagination-dots'>
                  <div className='pagi-dots'>
                    {checkCMSData.sliders.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === trandingNowMainImageIndex ? 'active' : ''}`}
                        onClick={() => setTrandingNowMainImageIndex(index)}
                      />
                    ))}
                  </div>
                  <div className='add-image-button-container'>
                    <button onClick={() => handleModalOpen(null)}>+ Add</button>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className='tranding-now-main-image-upload' 
                onClick={() => handleModalOpen(null)}
              >
                <img 
                  src={imageUploadIcon} 
                  alt='image-upload' 
                />
              </div>
            )}
          </div>
          <div className='tranding-now-sub-images'>
            {checkCMSData && 
              (checkCMSData.product_1 || 
              checkCMSData.product_2 || 
              checkCMSData.product_3 || 
              checkCMSData.product_4 || 
              checkCMSData.product_5 || 
              checkCMSData.product_6) ? (
              // Display existing sub-images from checkCMSData
              <>
                {Array.from({ length: 6 }).map((_, index) => {
                  const product = checkCMSData[`product_${index + 1}`];
                  return product ? (
                    <div 
                      className='sub-image-single-show' 
                      key={index}>
                      <button className='close-sub-image-btn'>
                        <img 
                          src={crossBtn} 
                          alt='close-sub-item' 
                        />
                      </button>
                      <img 
                        src={`${url}${product.image_url}`} 
                        alt={product.alt_text || `Product ${index + 1}`} 
                        className='product-sub-image' 
                      />
                    </div>
                  ) : null;
                })}
              </>
            ) : (
              // Fallback to rendering subImagesData
              subImagesData.map((item, index) => (
                <div 
                  className={`tranding-now-sub-image-item ${item?.image_url ? 'remove-padding' : 'add-padding'}`} 
                  key={index} 
                  onClick={() => handleModalOpen(index)}
                >
                  {item?.image_url ? (
                    <div className='sub-image-single-show'>
                      <button className='close-sub-image-btn'>
                        <img 
                          src={crossBtn} 
                          alt='close-sub-item' 
                        />
                      </button>
                      <img 
                        src={`${url}${item.image_url}`} 
                        alt={item?.alt_text || `Image ${index}`} 
                        className='product-sub-image' 
                      />
                    </div>
                  ) : (
                    <img 
                      src={imageUploadIcon} 
                      alt={item?.alt_text || `Image ${index}`} 
                      className='product-sub-upload-image' 
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        handleFileChange={handleFileChange}
        onImageSelect={handleImageSelect}
        imageSendPayload={imageSendPayload}
        data={mediaDeta}
        setImageSendPayload={setImageSendPayload}
      />
    </div>
  )
}

export default TrandingNow

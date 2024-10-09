import React, {useState, useEffect} from 'react'
import './HomePageSlider.css'



// icons
import eyeIcon from '../../Assets/Images/hide-show.png';
import explanationMark from '../../Assets/Images/Frame.png'
import imageIcon from '../../Assets/Images/uploadImg 48 x 48.png'
import { url } from '../../Services/Api';
import ImageGalleryPopup from '../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';

const HomePageSlider = () => {
    const [modalView, setModalView] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleModalOpen = () => {setModalView(true)}
  const handleModalClose = () => {setModalView(false)}

  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => [...prevImages, image]); // Add new image to the array
    setModalView(false); // Optionally close the modal
  };
  const handleImageDelete = (index) => {
    setSelectedImage((prevImages) => 
      prevImages.filter((_, i) => i !== index) // Remove the image at the specified index
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedImage.length > 1) {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % selectedImage.length // Loop back to the first image
        );
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [selectedImage]);
  return (
    <div className='SlderMainSection'>
        <div className='SliderHead'>
          <div className='SliderHeadLeft'>
            <h3>Home Page Slider</h3>
            <img src={explanationMark} alt='img' />
          </div>
          <div className='SliderHeadRight'>
              <img src={eyeIcon} alt='hide-show' />
              <button className='SliderAddAndSaveBtn'>
                Save
              </button>
          </div>
        </div>
        <div className='SliderBody'>
        {selectedImage.length === 0 ? (  // Check if no images are selected
            <div className='upload-image-section'>
              <p>Upload Image</p>
              <div className='image-icon-div' onClick={handleModalOpen}>
                <img src={imageIcon} alt='img' />
              </div>
            </div>
          ) : (
            selectedImage.map((image, index) => (
              <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                <img
                  src={`${url}${image.image_url}`} // Display each selected image
                  alt={`Selected ${index + 1}`}
                  style={{ width: '100%', height: 'auto' }} // Full width
                />
                <button 
                  onClick={() => handleImageDelete(index)} // Delete button for each image
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
          <button onClick={() => setModalView(true)}>Add image</button>
        </div>
        <ImageGalleryPopup 
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
      />
      </div>
  )
}

export default HomePageSlider

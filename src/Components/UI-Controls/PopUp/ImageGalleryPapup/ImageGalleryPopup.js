import React, { useEffect, useRef, useState } from 'react'
import './ImageGalleryPopup.css'
import CustomBtn from '../../Buttons/Btn'
import axios from 'axios'


// Components


// utils
import { uploadImage } from '../../../../Services/functions'


// images import
import checkImage from '../../../../Assets/check-images/New-Jersey-images-1-600x400 1.png';

// icons import
import crossButton from '../../../../Assets/Images/cross-button-32-X-32.png'
import arrowDown from '../../../../Assets/Images/dropdown 20 x 20.png'
import InputField from '../../InputField/InputField';
import uploadImageIcon from '../../../../Assets/Images/uploadImg 48 x 48.png'
import { url } from '../../../../Services/Api'


const ImageGalleryPopup = ({
        showImageGalleryPopUp, 
        handleModalView, 
        onImageSelect,
        imageSendPayload, 
        setImageSendPayload, 
        alt_text, 
        title, 
        description, 
        addImageToHomeSliderApi,
        data,
        handleFileChange
    }) => {

    // All States
    const [activeTab, setActiveTab] = useState('upload');
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null)
    // const [uploadedStatus, setUploadedStates] = useState('');
    const [selectedImage, setSelectedImage] = useState([])
    const [selectedImageId, setSelectedImageId] = useState()
    const [isEditAble, setIsEditAble] = useState(false);
    // const [data, setData] = useState([])
    const [filterOpenIndex , setFilterOpenIndex] = useState(null);
    // const [updateData, setUpdateData] = useState({
    //     alt_text: '',
    //     title: '',
    //     description: '',
    // })
    
    const handleImageUploadChange = (event) => {
        const {name, value} = event.target;
        setImageSendPayload((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    // const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     const api = `${url}${addImageToHomeSliderApi}`

    //     if(file){
    //         setImageSendPayload((prevData) => ({
    //             ...prevData,
    //             file: file,
    //         }));
    //         setUploadedStates('loading');
    //         alert('wait');
    //         const imagePayloadToSend = new FormData();
    //         imagePayloadToSend.append('image', file);
    //         imagePayloadToSend.append('alt_text', imageSendPayload.alt_text);
    //         imagePayloadToSend.append('title', imageSendPayload.title);
    //         imagePayloadToSend.append('description', imageSendPayload.description);
    //         imagePayloadToSend.append('image_url', imageSendPayload.image_url);
    //         imagePayloadToSend.append('link_url', imageSendPayload.link_url);

    //         await uploadImage(imagePayloadToSend, api, setUploadedStates)

    //     }
    //     console.log("handleChange file", file);
    // }

    
    // Update Images Data
    
    const handleSelectedImage = (item) => {
        setSelectedImage(item)
        setSelectedImageId(item._id)
        onImageSelect(item);
        console.log("selected image", item)
    };

    // const handleChane = (e) => {
    //     const {name , value} = e.target;
    //     setUpdateData({...updateData, [name]: value})
    // };

    // const handleSubmit = async () => {
    //     const hasUpdate = Object.values(updateData).some(field => field != '');
    //     if(!hasUpdate){
    //         alert("no fields to update");
    //         return;
    //     }

    //     try {
    //         await axios.put(`https://fm.skyhub.pk/api/v1/media/pages/home/slider/${selectedImageId}`, updateData);
    //         console.log("Data UPdate", updateData);
    //         alert("data updated")
    //     } catch (error) {
    //         console.error("Error Updating Data", updateData);
    //         alert("Failed To update")
    //     }
    // }

    // Local Objects
    
    const imageGalleryFilterData = [
        {name: 'All media items', items: ['item one', 'item two', 'item three']},
        {name: 'All media items', items: ['item one', 'item two', 'item three']},
    ]

    const tabs = [
        { id: 'upload', label: 'Upload Image' },
        { id: 'gallery', label: 'Media Gallery' },
    ]; 

    const imageEditInputData = [
        {label: 'Alternate Text', placeholder: 'Text',  val: alt_text , name: 'alt_text'},
        {label: 'Title', placeholder: 'Title', val: title , name: 'title'},
        {label: 'Description', placeholder: 'Description', val: description , name: 'description'},
        {label: 'Url', placeholder: 'url', value: selectedImage ? selectedImage.image_url : '' ,}
    ]

    // local functions 
    const handleTabActive = (id) => {
        setActiveTab(id);
        // getGalleyImages()
    }
    const handleFilterOpen = (index) => {
        setFilterOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    }
    const handleEditInput = () => {
        setIsEditAble(true)
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    // console.log("gallery data home slider",data);

  return (
    <div 
        className={`image-gallery-pop-up-main-container 
            ${showImageGalleryPopUp ? 'show-image-gallery-pop-up' : ''}`
        }
    >
        <div className='image-gallery-inner-container'>
            {/* Modal Close Button */}
            <button onClick={handleModalView} className='close-modal' >
                <img src={crossButton} alt='close-modal-button' />
            </button>

            {/* Main Heading Section */}
            <div className='image-gallery-head-section'>
                <p className='image-gallery-heading'>Add image to product gallery</p>
            </div>

            {/* Images Gallery main section */}
            <div className='image-gallery-main-containt-section'>

                {/* IMages Gallerey Tabs */}
                <div className='image-gallery-tabs-select'>
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`image-gallery-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabActive(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                <div className="content">

                    {/* Upload Image Tab */}
                    <div className={`content-item ${activeTab === 'upload' ? 'active' : ''}`}>
                        <div className='upload-images-main-container'>
                            <p>Click or Drag to Upload</p>
                            <div className='upload-image-icon-div' onClick={handleImageClick}>
                                <img src={uploadImageIcon} alt='upload-image' />
                                <input 
                                    type='file'
                                    accept='image/*'
                                    ref={fileInputRef}
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Tab */}
                    <div className={`content-item ${activeTab === 'gallery' ? 'active' : ''}`}>
                        <div className='image-gallery'>

                            <div className='image-gallery-select-images-section'>

                                {/* Image Gallery Filters Section */}
                                <div className='image-gallery-filter-section'>

                                    <h3>Filter Media</h3>
                                    {/* Filders Dropdown */}
                                    <div className='image-gallery-filter-dropdown-section'>
                                        {imageGalleryFilterData.map((items, index) => (
                                            <div className={`image-gallery-filter`} onClick={() => handleFilterOpen(index)}>
                                                <div className='image-gallery-filter-name'>
                                                    <p>{items.name}</p>
                                                    <img src={arrowDown} alt='arrow-down' />
                                                </div>
                                                    <div 
                                                        className={`image-gallery-dropdown 
                                                        ${filterOpenIndex === index ? 'show-filters' : ''}`}
                                                    >
                                                        {items.items.map((item, index) => (
                                                            <p>{item}</p>
                                                        ))}
                                                    </div>
                                                
                                            </div>
                                        ))}
                                    </div>

                                    <div className='images-gallery-and-detail-section'>

                                        {/* Images Gallery images */}
                                        <div className='image-gallery-section'>
                                            {data && data.map((item,) => (
                                                <img 
                                                    key={item._id} 
                                                    src={`${url}${item.image_url}`} 
                                                    alt={data.alt_text} 
                                                    onClick={() => handleSelectedImage(item)}
                                                />
                                            ))}
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Selected Image Full Details */}
                            <div className='images-containt-section'>

                                {/* Selected Image Section */}
                                <div className='edit-image-container'>
                                   {selectedImage && <img src={selectedImage && `${url}${selectedImage.image_url}`} alt='check' />}
                                </div>

                                {/* Selected image details section */}
                                <div className='image-details-section'>
                                    <h3>{selectedImage && selectedImage.title}</h3>
                                    <p>{selectedImage && selectedImage.updatedAt}</p>
                                    <p>132 kb</p>
                                    <p>1400 x 906</p>
                                </div>

                                {/* Gallery Data Edit and Delete section */}
                                <div className='edit-and-delete-image-section'>
                                    <button className='edit-image-button' onClick={handleEditInput}>
                                        Edit image
                                    </button>
                                    <button className='delete-image-button'>
                                        Delete Image Permanently
                                    </button>
                                </div>

                                {/* Gallery Data input fields */}
                                <div className='image-gallery-inputs'>
                                    {imageEditInputData.map((items, index) => (
                                        <InputField 
                                            key={index}
                                            labelText={items.label}
                                            color={'#595959'}
                                            fontSize={'15px'}
                                            fontWeight={'600'}
                                            lineHeight={'18px'}
                                            type={'text'}
                                            placeholder={items.placeholder}
                                            value={items.val}
                                            name={items.name}
                                            onChange={handleImageUploadChange}
                                        />
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Footer add to gallery section */}
            <div className='image-gallery-modal-footer'>
                <button className='add-to-gallery-btn'>
                    Add to gallery
                </button>
            </div>
        </div>
        

    </div>
  )
}

export default ImageGalleryPopup

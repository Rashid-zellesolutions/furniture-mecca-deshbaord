import React from 'react'
import './AdvertisingBanner.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png'

const AdvertisingBanner = () => {
  return (
    <div>
        <CMSHead 
            heading={"Advertising Banner"}
            buttonText={"Save"}
        />
        <div className='advertising-banner-body-main'>
            <div className='advertising-banner-containt'>
              <div className='advertising-banner-name-input'>
                <input type='text' placeholder='Title' />
              </div>
              <div className='advertising-banner-upload-main-container'>
                <div className='advertising-banner-image-upload-div'>
                  <img src={uploadImageIcon} alt='upload image' />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AdvertisingBanner

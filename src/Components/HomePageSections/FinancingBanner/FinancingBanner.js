import React from 'react'
import './FinancingBanner.css';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import imageUploadIcon from '../../../Assets/Images/uploadImg 48 x 48.png'

const FinancingBanner = () => {
  return (
    <div>
        <CMSHead 
            heading={"Financing Banner"}
            buttonText={"Save"}
        />
        <div className='financing-slider-main-body'>
          <div className='financing-slider-inner-body'>
              <div className='financing-banner-image-border'>
                  <img src={imageUploadIcon} alt='image-upload' />
              </div>
          </div>
        </div>
    </div>
  )
}

export default FinancingBanner

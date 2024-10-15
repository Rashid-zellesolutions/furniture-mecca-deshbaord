import React from 'react'
import './DealOfMonth.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import timeIcon from '../../../Assets/Images/time-icon.png';

const DealOfMonth = () => {
  return (
    <div>
      <CMSHead 
            heading={"Deal Of The Month"}
            buttonText={"Save"}
        />
        <div className='deal-of-the-month-main-container'>
            <div className='deal-of-the-month-inputs'>
                <div className='select-date'>
                  <p>Ending Date</p>
                  <img src={timeIcon} alt='time-icon' />
                </div>
                <div className='select-date'>
                  <p>Ending Time</p>
                  <img src={timeIcon} alt='time-icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DealOfMonth

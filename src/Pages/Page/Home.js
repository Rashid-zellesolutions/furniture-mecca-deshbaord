import React from 'react';
import '../Page.css';
import '../../Components/HomePageSlider/HomePageSlider.css';
import '../../Pages/ECommerce/ECommerce.css';

import HomePageSlider from '../../Components/HomePageSlider/HomePageSlider';
import ShopByCategory from '../../Components/ShopByCategory/ShopByCategory';
import FinanceSlider from '../../Components/FinanceSlider/FinanceSlider';

const HomePage = () => {
  
  return (
    <div className="HomePage" style={{gap: '30px'}}>
      <HomePageSlider />
      <ShopByCategory />
      <FinanceSlider />
    </div >
  );
};

export default HomePage;
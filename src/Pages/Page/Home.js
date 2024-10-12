import React from 'react';
// import '../../Page.css';
// import '../Components/HomePageSlider/HomePageSlider.css';
// import '../../Pages/ECommerce/ECommerce.css';

import TrandingNow from '../../Components/HomePageSections/TrandingNow/TrandingNow';
import BestSellerSection from '../../Components/HomePageSections/BestSellerSection/BestSellerSection';
import FinancingBanner from '../../Components/HomePageSections/FinancingBanner/FinancingBanner';
import AdvertisingBanner from '../../Components/HomePageSections/AdvertisingBanner/AdvertisingBanner';
import DealOfMonth from '../../Components/HomePageSections/DealOfMonth/DealOfMonth';
import FurnitureForBudget from '../../Components/HomePageSections/FurnitureForBudget/FurnitureForBudget';
import FinanceSlider from '../../Components/HomePageSections/FinanceSlider/FinanceSlider';
// import HomePageSlider from '../../Components/HomePageSections/HomePageSlider/HomePageSlider';
import HomePageSlider from '../../Components/HomePageSections/HomePageSlider/HomePageSlider';
import ShopByCategory from '../../Components/HomePageSections/ShopByCategory/ShopByCategory';

const HomePage = () => {
  
  return (
    <div className="HomePage" style={{gap: '30px'}}>
      <HomePageSlider />
      <ShopByCategory categoryHeading={'Shop By Category'} />
      <FinanceSlider />
      <TrandingNow />
      <BestSellerSection />
      <FinancingBanner />
      <AdvertisingBanner />
      <DealOfMonth />
      <FurnitureForBudget />
    </div >
  );
};

export default HomePage;
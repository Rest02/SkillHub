import React from "react";
import ImageBar from "../../components/HomeComponents/ImageBar";
import ThreeContainerInfo from '../../components/HomeComponents/ThreeContainerInfo'
import WelcomeInformation from '../../components/HomeComponents/WelcomeInformation'
import TopCategories from '../../components/HomeComponents/TopCategories'

function HomePage() {
  return (
    <div className="container">
      <div>
        <ImageBar />
      </div>
      <div>
        <ThreeContainerInfo/>
      </div>
      <div>
        <WelcomeInformation/>
      </div>
      <div>
        <TopCategories/>
      </div>
    </div>
  );
}

export default HomePage;

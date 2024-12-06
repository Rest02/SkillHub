import React from "react";
import ImageBar from "../../components/HomeComponents/ImageBar";
import ThreeContainerInfo from '../../components/HomeComponents/ThreeContainerInfo'
import WelcomeInformation from '../../components/HomeComponents/WelcomeInformation'
import TopCategories from '../../components/HomeComponents/TopCategories'

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[1200px] mx-auto">
        <ImageBar />
      </div>
      <div className="w-full max-w-[1200px] mx-auto">
        <ThreeContainerInfo/>
      </div>
      <div className="w-full max-w-[1200px] mx-auto mt-8"> {/* Aquí agregamos el margen */}
        <WelcomeInformation/>
      </div>
      <div className="w-full max-w-[1200px] mx-auto">
        <TopCategories/>
      </div>
    </div>
  );
}

export default HomePage;

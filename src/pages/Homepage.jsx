import React from "react";
import Navbar from "../components/Navbar";
import placeholderImage from "../../public/imgs/topHomepage.png";
import placeholderImage2 from "../../public/imgs/middleHomepage.png";
import placeholderImage3 from "../../public/imgs/bottomHomepage.png";

const SmallHomepageImagesDisplay = () => {
  return (
    <div className="p-2 font-montserrat bg-black">
      {/* List of images and their titles */}
      <ul className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <li className="flex items-center justify-center w-full h-screen snap-start">
          <div className="flex flex-col items-center justify-center bg-black w-full h-full">
            <img
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="bg-black text-white mt-4 text-lg">ANIMATED PROJECTS</p>
          </div>
        </li>

        <li className="flex items-center justify-center w-full h-screen snap-start">
          <div className="flex flex-col items-center justify-center bg-black w-full h-full">
            <img
              src={placeholderImage2}
              alt="placeholder"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="bg-black text-white mt-4 text-lg">ILLUSTRATION</p>
          </div>
        </li>

        <li className="flex items-center justify-center w-full h-screen snap-start">
          <div className="flex flex-col items-center justify-center bg-black w-full h-full">
            <img
              src={placeholderImage3}
              alt="placeholder"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="bg-black text-white mt-4 text-lg">CONTACT</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

const Homepage = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <Navbar></Navbar>
      <SmallHomepageImagesDisplay></SmallHomepageImagesDisplay>
    </div>
  );
};

export default Homepage;

import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { cancelRightClick } from "../utils/utilFunctions";
// import placeholderImage from "../../public/imgs/topHomepage.png";
// import placeholderImage2 from "../../public/imgs/middleHomepage.png";
// import placeholderImage3 from "../../public/imgs/bottomHomepage.png";
import placeholderImage from "/imgs/Bài thi vòng 3.png";
import placeholderImage2 from "/imgs/Touka Miyashita - boogiepop.png";
import placeholderImage3 from "/imgs/OC- Thiên Thanh.png";

//url: /animation, /illust, /contact

const SmallHomepageImagesDisplay = () => {
  return (
    <div className="p-2 font-montserrat bg-black">
      {/* List of images and their titles */}
      <ul className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        <Link to={"/animation"}>
          <li className="flex items-center justify-center w-full h-screen snap-start cursor-pointer">
            <div className="flex flex-col items-center justify-center bg-black w-full h-full">
              <img
                src={placeholderImage}
                alt="animation demo"
                className="max-w-full max-h-[80vh] object-contain"
                onContextMenu={cancelRightClick}
              />
              <p className="bg-black text-white mt-4 text-lg">
                ANIMATED PROJECTS
              </p>
            </div>
          </li>
        </Link>

        <Link to={"/illust"}>
          <li className="flex items-center justify-center w-full h-screen snap-start cursor-pointer">
            <div className="flex flex-col items-center justify-center bg-black w-full h-full">
              <img
                src={placeholderImage2}
                alt="illustration demo"
                className="max-w-full max-h-[80vh] object-contain"
                onContextMenu={cancelRightClick}
              />
              <p className="bg-black text-white mt-4 text-lg">ILLUSTRATION</p>
            </div>
          </li>
        </Link>

        <Link to={"/Tien_Portfolio/contact"}>
          <li className="flex items-center justify-center w-full h-screen snap-start cursor-pointer">
            <div className="flex flex-col items-center justify-center bg-black w-full h-full">
              <img
                src={placeholderImage3}
                alt="contact"
                className="max-w-full max-h-[80vh] object-contain"
                onContextMenu={cancelRightClick}
              />
              <p className="bg-black text-white mt-4 text-lg">CONTACT</p>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

const MediumHomepageImagesDisplay = () => {
  return (
    <div className="flex justify-center align-center w-full">
      <div className="grid grid-cols-3 gap-6 bg-black justify-center items-center pt-2 px-6 w-full">
        <Link
          to={"/animation"}
          className="flex flex-col items-center justify-center bg-black w-full h-full"
        >
          <div className="overflow-hidden max-w-full max-h-[80vh] flex items-center justify-center">
            <img
              src={placeholderImage}
              alt="animation demo"
              className="max-w-full max-h-[80vh] object-contain
                transition-transform duration-500 ease-in-out 
                hover:scale-120"
              onContextMenu={cancelRightClick}
            />
          </div>
        </Link>

        <Link
          to={"/illust"}
          className="flex flex-col items-center justify-center bg-black w-full h-full"
        >
          <div className="overflow-hidden max-w-full max-h-[80vh] flex items-center justify-center">
            <img
              src={placeholderImage2}
              alt="illustration demo"
              className="max-w-full max-h-[80vh] object-contain
                transition-transform duration-500 ease-in-out 
                hover:scale-120"
              onContextMenu={cancelRightClick}
            />
          </div>
        </Link>
        <Link
          to={"/Tien_Portfolio/contact"}
          className="flex flex-col items-center justify-center bg-black w-full h-full"
        >
          <div className="overflow-hidden max-w-full max-h-[80vh] flex items-center justify-center">
            <img
              src={placeholderImage3}
              alt="contact"
              className="max-w-full max-h-[80vh] object-contain
                transition-transform duration-500 ease-in-out 
                hover:scale-120"
              onContextMenu={cancelRightClick}
            />
          </div>
        </Link>
        <Link to={"/animation"}>
          <p className="bg-black text-white mt-4 text-2xl font-bold text-center">
            ANIMATED PROJECTS
          </p>
        </Link>
        <Link to={"/illust"}>
          <p className="bg-black text-white mt-4 text-2xl font-bold text-center">
            ILLUSTRATION
          </p>
        </Link>
        <Link to={"/illust"}>
          <p className="bg-black text-white mt-4 text-2xl font-bold text-center">
            CONTACT
          </p>
        </Link>
      </div>
    </div>
  );
};

const Homepage = () => {
  return (
    <div className="bg-black h-screen w-full">
      <div className="md:hidden">
        <SmallHomepageImagesDisplay></SmallHomepageImagesDisplay>
      </div>
      <div className="hidden md:block">
        <MediumHomepageImagesDisplay></MediumHomepageImagesDisplay>
      </div>
    </div>
  );
};

export default Homepage;

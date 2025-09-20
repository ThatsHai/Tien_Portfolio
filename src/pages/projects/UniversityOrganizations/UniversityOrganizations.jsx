import React, { useState, useEffect, useRef } from "react";
import { cancelRightClick } from "../../../utils/utilFunctions";
import {
  ProjectCredit,
  ProjectName,
  MidNote,
  LeftNote,
} from "../ProjectCredit";
import ImageWithSkeleton from "../../../components/ImageWithSkeleton";
import ImageReview from "../../../components/ImageReview";
// import side
import cict_images from "./CICT";
import cictmedias_images from "./CICTMedias";
import eccit_images from "./ECCIT";

const bgColor = "#2B548C";

const projectName = "University Designs";
const introduction =
  "These are the organizations I worked for during university.";
const contribution =
  "* Worked as a designer for various campaigns and media posts.";

const ArrowButton = () => {
  const handleClick = () => {
    // window.open("https://www.facebook.com/latibuleproject", "_blank");
  };

  return (
    <button
      className="flex items-end px-4 border-2 text-defaultYellow rounded-full transition-all duration-300 hover:text-[#2B548C] hover:bg-defaultYellow mb-1 cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-lg">→</span>
    </button>
  );
};

const ImageSection = ({ handleSelectImage, images, title, textColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" or "prev"

  const goPrev = () => {
    setDirection("prev");
    setPrevIndex(currentIndex);
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goNext = () => {
    setDirection("next");
    setPrevIndex(currentIndex);
    setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <div className="">
      <MidNote text={title} textColor={textColor} />

      <div className="flex items-center justify-center gap-4">
        <button onClick={goPrev}>
          <span className="text-4xl">◀</span>
        </button>

        <div className="relative w-[500px] max-w-xl min-h-[300px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Previous image for slide-out */}
          <img
            key={prevIndex}
            src={images[prevIndex]}
            className={`absolute top-0 left-0 w-full h-full object-contain rounded-md transition-transform duration-500 ease-in-out ${
              direction === "next" ? "slide-out-left" : "slide-out-right"
            }`}
            alt=""
            draggable={false}
            onContextMenu={cancelRightClick}
          />

          {/* Current image for slide-in */}
          <img
            key={currentIndex}
            src={images[currentIndex]}
            onClick={() =>
              handleSelectImage({
                src: images[currentIndex],
                w: 716,
                h: 1276,
              })
            }
            className={`absolute top-0 left-0 w-full h-full object-contain rounded-md transition-transform duration-500 ease-in-out ${
              direction === "next" ? "slide-in-right" : "slide-in-left"
            }`}
            alt=""
            draggable={false}
            onContextMenu={cancelRightClick}
          />
        </div>

        <button onClick={goNext}>
          <span className="text-4xl">▶</span>
        </button>
      </div>
    </div>
  );
};

const UniversityOrganizations = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div className="text-white font-montserrat bg-[#2B548C] my-2 rounded-lg">
      <ProjectName text={projectName}></ProjectName>

      <ProjectCredit text={introduction}></ProjectCredit>
      <p className="text-center text-sm italic mb-4">{contribution}</p>
      {/* CICT */}
      <div className="border-y-4 border-[#163671] bg-[rgba(22,54,113,0.5)] py-6 pb-8 px-2 rounded-t-2xl ">
        <ImageSection
          handleSelectImage={handleSelectImage}
          images={cict_images}
          title={"Đoàn Trường Công nghệ Thông tin và Truyền Thông"}
          textColor={"#fff"}
        ></ImageSection>
      </div>
      {/* Medias */}
      <div className="border-y-4 border-[#890002] bg-[#161616] py-6 pb-8 px-2 ">
        <ImageSection
          handleSelectImage={handleSelectImage}
          images={cictmedias_images}
          title={"CICT Médias"}
        ></ImageSection>
      </div>

      <div className="border-y-4 border-[#2C71ED] bg-[#01BAE0] py-6 pb-8 px-2 rounded-b-2xl">
        <ImageSection
          handleSelectImage={handleSelectImage}
          images={eccit_images}
          title={"ECCIT"}
        ></ImageSection>
      </div>

      {openReviewImage && (
        <ImageReview
          image={selectedImage}
          setOpenReviewImage={setOpenReviewImage}
          buttonColor="#19499D"
        />
      )}
    </div>
  );
};

export default UniversityOrganizations;

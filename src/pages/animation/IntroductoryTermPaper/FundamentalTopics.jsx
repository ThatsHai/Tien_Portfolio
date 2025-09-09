import React, { useState, useEffect, useRef } from "react";
import { cancelRightClick } from "../../../utils/utilFunctions";
import {
  ProjectCredit,
  ProjectName,
  MidNote,
  LeftNote,
} from "../../projects/ProjectCredit";
import ImageWithSkeleton from "../../../components/ImageWithSkeleton";
import ImageReview from "../../../components/ImageReview";
import { arrayOfImages } from ".";
import cover from "./cover.jpg";
import laiAvatar from "./image1.png";

// 1 and 10 are wide images

const bgColor = "black";
const ytbBg = "#38386A";

const projectName = "Introductory Term Paper - Giấc Mộng Hoa Linh";
const introduction =
  "This product belongs to the course CT500 – Fundamental Term Paper. “Giấc mộng hoa linh” is a trailer inspired by the Vu Lan Festival. The story follows a young child, Minh Lam, who becomes lost in the spirit realm. On the journey to find the way back home, Minh Lam meets a dog named Lài, and together they embark on a magical and adventurous quest…";
const shortenedIntroduction =
  "This product belongs to the course CT500 – Fundamental Term Paper. “Giấc mộng hoa linh” is a trailer inspired by the Vu Lan Festival...";
const contribution =
  "* I created all of the following animation and character designs.";

const FundamentalTopics = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div className="text-white font-montserrat bg-[black] my-2 rounded-lg">
      <ProjectName text={projectName}></ProjectName>
      <div className="hidden md:block">
        <ProjectCredit text={introduction}></ProjectCredit>
      </div>
      <div className="md:hidden">
        <ProjectCredit text={shortenedIntroduction}></ProjectCredit>
      </div>
      <p className="text-center text-sm italic">{contribution}</p>
      <div className="py-8">
        <MidNote text={"Animation"}></MidNote>

        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="flex items-stretch gap-1 justify-center">
            <div className="hidden md:block bg-[#38386A] rounded-md p-2">
              <iframe
                width="840"
                height="471"
                src="https://www.youtube.com/embed/xIuGfdneQBU?rel=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="md:hidden bg-[#38386A] rounded-md p-2 inline-block">
              <iframe
                width="280"
                height="157"
                src="https://www.youtube.com/embed/xIuGfdneQBU"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <MidNote text={"Concept"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-2 gap-1 w-[1000px] max-w-5xl">
            {/* Cover image spanning full width */}
            <div className="col-span-2 aspect-[16/9]">
              <ImageWithSkeleton
                src={cover}
                alt="-cover"
                onClick={() =>
                  handleSelectImage({
                    src: cover,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
              <ImageWithSkeleton
                src={laiAvatar}
                alt="-cover"
                onClick={() =>
                  handleSelectImage({
                    src: laiAvatar,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>
            {arrayOfImages.map((url, i) => (
              <div key={i} className="">
                <ImageWithSkeleton
                  src={url}
                  onClick={() =>
                    handleSelectImage({ src: url, w: 600, h: 600 })
                  }
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {openReviewImage && (
        <ImageReview
          image={selectedImage}
          setOpenReviewImage={setOpenReviewImage}
        />
      )}
    </div>
  );
};

export default FundamentalTopics;

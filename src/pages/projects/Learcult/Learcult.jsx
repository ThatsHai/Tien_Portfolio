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
import avatarFrame from "./avatarFrame.png";
import avatarFrame2 from "./avatarFrame2.png";
import pin_cam2 from "./pin_cam2.jpg";
import avatar from "./avatar.png";

import cover_ss1 from "./cover_ss1.png";
import side1_ss1 from "./side1_ss1.png";
import side2_ss1 from "./side2_ss1.png";
import side3_ss1 from "./side3_ss1.png";

import cover_ss2 from "./cover_ss2.png";
import side1_ss2 from "./side1_ss2.png";

const bgColorGreen = "#6CC180";
const bgColorOrange = "E43B12";

const projectName = "Learcult";
const introduction =
  "The Learcult is a non-profit project founded in 2024 by high school students to promote and preserve cultural identity.";
const contribution =
  "* Head of Design. I created all of the following illustrations.";

const Learcult = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const targetTop = targetRef.current.offsetTop;

        // adjust offset based on screen width
        let offset = 0;
        if (window.innerWidth > 1200) {
          offset = 400; // trigger earlier on big screens
        } else if (window.innerWidth > 768) {
          offset = 250; // medium devices
        } else {
          offset = 150; // small devices
        }

        setScrolled(window.scrollY >= targetTop - offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div
      className={`text-white font-montserrat my-2 rounded-lg ${
        scrolled ? "bg-[#E43B12]" : "bg-[#6CC180]"
      }`}
    >
      <img
        src={avatar}
        className="fixed w-16 md:w-36 bottom-4 right-8 animate-floating"
        draggable="false"
      />
      <ProjectName text={projectName}></ProjectName>
      <ProjectCredit text={introduction}></ProjectCredit>
      <p className="text-center text-sm italic">{contribution}</p>
      <div className="py-8">
        <MidNote text={"CAMPAIGN 1: INTRODUCTION"}></MidNote>

        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-2 gap-1 w-[810px] max-w-4xl">
            <div className="col-span-2 aspect-[16/9]">
              <ImageWithSkeleton
                src={cover_ss1}
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: cover_ss1,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>

            {[side1_ss1, side2_ss1, side3_ss1, avatarFrame].map((url, i) => (
              <div key={i} className="aspect-square">
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

      <div className="py-8" ref={targetRef}>
        <MidNote text={"CAMPAIGN 2: QUAN SAN"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-2 gap-1 w-[804px] max-w-4xl">
            <div className="col-span-2 aspect-[16/9]">
              <ImageWithSkeleton
                src={cover_ss2}
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: cover_ss2,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>
            <div className="col-span-2 [3507/2480]">
              <ImageWithSkeleton
                src={avatarFrame2}
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: avatarFrame2,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>

            {[
              side1_ss2,
              pin_cam2,
            ].map((url, i) => (
              <div key={i} className="aspect-square">
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

export default Learcult;

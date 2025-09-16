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
import partingWords from "./partingWords.png";
import jellyfish from "./jellyfish.png";

import main_ss1 from "./main_ss1.png";
import side1_ss1 from "./side1_ss1.png";
import side2_ss1 from "./side2_ss1.png";
import side3_ss1 from "./side3_ss1.png";

import main_ss2 from "./main_ss2.png";
import side1_ss2 from "./side1_ss2.png";
import side2_ss2 from "./side2_ss2.png";
import side3_ss2 from "./side3_ss2.png";
import side4_ss2 from "./side4_ss2.png";
import cover_ss2 from "./cover_ss2.png";
// import side

const bgColor = "#2B548C";

const projectName = "Latibule Season 3";
const introduction =
  "Latibule is a non-profit project for academical psychology.";
const contribution =
  "* Vice President of the Design Team. I created all of the following illustrations.";

const Jellyfish = () => {
  //Jellyfish logic
  const imgRef = useRef(null);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Move to a random spot (in px)
  const move = () => {
    if (dragging.current) return;
    const margin = 100; // avoid edges; tweak to match image size
    const top = Math.random() * (window.innerHeight - margin * 2) + margin;
    const left = Math.random() * (window.innerWidth - margin * 2) + margin;
    setPosition({ top: `${Math.round(top)}px`, left: `${Math.round(left)}px` });

    timeoutRef.current = setTimeout(move, 10000 + Math.random() * 4000);
  };

  //When first mounts
  const startWandering = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // small rest before first wander (so it doesn't jump immediately after drag)
    timeoutRef.current = setTimeout(move, 3000 + Math.random() * 1500);
  };

  // initialize numeric px center on mount (so position values are px, not %)
  useEffect(() => {
    const init = () => {
      const imgW = imgRef.current?.offsetWidth ?? 128;
      const imgH = imgRef.current?.offsetHeight ?? 128;
      const left = Math.round((window.innerWidth - imgW) / 2);
      const top = Math.round((window.innerHeight - imgH) / 2);
      setPosition({ top: `${top}px`, left: `${left}px` });
    };
    init();
    startWandering();
    const onResize = () => {
      // keep position within viewport on resize
      setPosition((pos) => {
        const pxTop = parseInt(String(pos.top || "0"), 10) || 0;
        const pxLeft = parseInt(String(pos.left || "0"), 10) || 0;
        const maxTop = Math.max(0, window.innerHeight - 80);
        const maxLeft = Math.max(0, window.innerWidth - 80);
        return {
          top: `${Math.min(pxTop, maxTop)}px`,
          left: `${Math.min(pxLeft, maxLeft)}px`,
        };
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pointer (mouse + touch) handlers
  const handlePointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // get bounding rect to calculate offset from pointer to element top-left
    const rect = imgRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // capture pointer if available (helps with some browsers)
    try {
      imgRef.current.setPointerCapture?.(e.pointerId);
    } catch (err) {
      console.log(err);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    // set position so top-left aligns with pointer minus offset (keeps where user grabbed)
    const left = Math.round(e.clientX - offset.current.x);
    const top = Math.round(e.clientY - offset.current.y);

    // clamp inside viewport (optional)
    const minLeft = 0;
    const minTop = 0;
    const maxLeft = Math.max(
      0,
      window.innerWidth - (imgRef.current?.offsetWidth ?? 80)
    );
    const maxTop = Math.max(
      0,
      window.innerHeight - (imgRef.current?.offsetHeight ?? 80)
    );

    setPosition({
      left: `${Math.min(Math.max(left, minLeft), maxLeft)}px`,
      top: `${Math.min(Math.max(top, minTop), maxTop)}px`,
    });
  };

  const handlePointerUp = (e) => {
    dragging.current = false;
    setIsDragging(false);

    try {
      imgRef.current.releasePointerCapture?.(e.pointerId);
    } catch (err) {
      console.log(err);
    }

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);

    // restart wandering but give it a little rest so it doesn't jump immediately
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(move, 60000 + Math.random() * 2000);
  };
  return (
    <div
      // wrapper handles top/left and transition
      className={`fixed w-16 md:w-36 ${
        isDragging ? "" : "transition-all duration-[1200ms] ease-in-out"
      }`}
      style={position}
    >
      <img
        ref={imgRef}
        src={jellyfish}
        draggable="false"
        onPointerDown={handlePointerDown}
        className="w-full animate-wobble cursor-grab animate-floating"
        // change cursor while grabbing
        style={{ touchAction: "none" }}
        alt="jellyfish"
      />
    </div>
  );
};

const Latibule = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div className="text-white font-montserrat bg-[#2B548C] my-2 rounded-lg">
      <div>
        <div className="hidden md:block">
          <Jellyfish></Jellyfish>
        </div>
        <div className="md:hidden fixed bottom-4 right-8">
          <img
            src={jellyfish}
            draggable="false"
            className="animate-wobble cursor-grab animate-floating w-16"
            alt="jellyfish"
          />
        </div>
      </div>
      <ProjectName text={projectName}></ProjectName>
      <ProjectCredit text={introduction}></ProjectCredit>
      <p className="text-center text-sm italic">{contribution}</p>
      <div className="py-8">
        <MidNote text={"CAMPAIGN 1: Eunoia"}></MidNote>

        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          {/* Left big image */}
          <div className="w-[600px] aspect-square">
            <ImageWithSkeleton
              src={main_ss1}
              onClick={() =>
                handleSelectImage({
                  src: main_ss1,
                  w: 600,
                  h: 600,
                })
              }
              alt="Latibule-main"
              className="w-full h-full object-cover rounded-md cursor-pointer"
              onContextMenu={cancelRightClick}
              draggable={false}
            />
          </div>

          {/* Right column (3 smaller images stacked) */}
          <div className="flex flex-col gap-1 w-[200px]">
            {[side1_ss1, side2_ss1, side3_ss1].map((url, i) => (
              <div key={i} className="w-full aspect-[4/3]">
                <ImageWithSkeleton
                  src={url}
                  onClick={() =>
                    handleSelectImage({ src: url, w: 400, h: 300 })
                  }
                  alt={`Latibule-${i}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <MidNote text={"CAMPAIGN 2: Sea Signs"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-3 gap-1 w-[804px] max-w-4xl">
            {/* Left column: 2 stacked square images */}
            <div className="flex flex-col gap-1 w-full row-span-2">
              {[side1_ss2, side2_ss2].map((url, i) => (
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

            {/* Right column: big image spanning 2 rows & 2 cols */}
            <div className="col-span-2 row-span-2">
              <div className="aspect-square w-full h-full">
                <ImageWithSkeleton
                  src={main_ss2}
                  onClick={() =>
                    handleSelectImage({
                      src: main_ss2,
                      w: 600,
                      h: 600,
                    })
                  }
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            </div>

            {/* Cover image spanning full width */}
            <div className="col-span-3 aspect-[16/9]">
              <ImageWithSkeleton
                src={cover_ss2}
                alt="Latibule-cover"
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

            {/* Bottom 3 images side by side */}
            {[
              side3_ss2,
              side4_ss2,
              avatarFrame,
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

      <div className="py-8">
        <MidNote text={"Parting Words"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-3 gap-1 w-[804px] max-w-4xl">
            <div className="col-span-3 aspect-square">
              <ImageWithSkeleton
                src={partingWords}
                alt="Latibule-cover"
                onClick={() =>
                  handleSelectImage({
                    src: partingWords,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>
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

export default Latibule;

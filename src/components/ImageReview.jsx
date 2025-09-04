import { useEffect } from "react";
import { cancelRightClick } from "../utils/utilFunctions";

// Modal for viewing image
const ImageReview = ({ image, setOpenReviewImage }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpenReviewImage(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenReviewImage]);
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-40 
              bg-black/70 flex items-center justify-center"
    >
      <button
        onClick={() => setOpenReviewImage(false)}
        className="absolute right-4 top-4 flex flex-col justify-center items-center w-8 h-8 group cursor-pointer translate-y-16 md:-translate-x-7 md:translate-y-0"
      >
        <span className="block h-1 w-full bg-white rounded rotate-45 translate-y-1"></span>
        <span className="block h-1 w-full bg-white rounded -rotate-45"></span>
      </button>
      <img
        src={image?.src}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        alt="preview"
        onContextMenu={cancelRightClick}
      />
    </div>
  );
};

export default ImageReview;

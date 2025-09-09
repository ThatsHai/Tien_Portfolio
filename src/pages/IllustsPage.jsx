import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import ImageReview from "../components/ImageReview";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

import { sampleImages } from "./illusts/ImagesIndex";

// const ImageReview = ({ image, setOpenReviewImage }) => {
//   return (
//     <div
//       className="fixed top-0 left-0 h-screen w-screen z-40
//               bg-black/70 flex items-center justify-center"
//     >
//       <button
//         onClick={() => setOpenReviewImage(false)}
//         className="absolute right-4 top-4 flex flex-col justify-center items-center w-8 h-8 group cursor-pointer translate-y-16 md:-translate-x-7 md:translate-y-0"
//       >
//         {/* Top bar */}
//         <span
//           className={
//             "block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out rotate-45 translate-y-1"
//           }
//         ></span>

//         {/* Bottom bar */}
//         <span
//           className={
//             "block h-1 w-full bg-white rounded transition-transform duration-500 ease-in-out -rotate-45"
//           }
//         ></span>
//       </button>
//       <img src={image?.src} className="max-h-[90vh] max-w-[90vw] object-contain" />
//     </div>
//   );
// };

const IllustsPage = ({
  images = sampleImages,
  rowHeight = 400, // target row height in px
  gap = 4, // gap between items in px
  zoomScale = 1.1, // hover zoom
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  // Observe container width so the layout adapts on resize
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      setContainerWidth(w);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Core layout: pack images into rows and scale each row to fill 100% width
  const rows = useMemo(() => {
    if (containerWidth === 0 || images.length === 0) return [];

    const rowsOut = [];
    let row = [];
    let aspectSum = 0;

    // const pushRow = () => {
    //   if (row.length === 0) return;
    //   // Compute the exact row height so that summed widths fit container width
    //   const totalGaps = gap * (row.length - 1);
    //   const exactRowH = (containerWidth - totalGaps) / aspectSum;
    //   const h = Math.max(exactRowH, 80); // clamp to avoid too tiny rows
    //   const items = row.map((img) => {
    //     const ar = img.w / img.h;
    //     return { ...img, width: Math.round(h * ar), height: Math.round(h) };
    //   });
    //   rowsOut.push({ height: Math.round(h), items });
    //   // reset accumulators
    //   row = [];
    //   aspectSum = 0;
    // };

    // images.forEach((img, idx) => {
    //   const ar = img.w / img.h;
    //   row.push(img);
    //   aspectSum += ar;

    //   // Predict row width if we kept target rowHeight
    //   const predictedWidth = aspectSum * rowHeight + gap * (row.length - 1);
    //   // If the row would exceed the container, finalize it now
    //   if (predictedWidth >= containerWidth) pushRow();
    //   // If it’s the last image and row still not flushed, flush anyway
    //   if (idx === images.length - 1) pushRow();
    // });

    const pushRow = (isLastRow = false) => {
      if (row.length === 0) return;

      const totalGaps = gap * (row.length - 1);
      const exactRowH = (containerWidth - totalGaps) / aspectSum;

      // If last row → use target rowHeight (no stretch up)
      const h = isLastRow ? rowHeight : Math.max(exactRowH, 80);

      const items = row.map((img) => {
        const ar = img.w / img.h;
        return { ...img, width: Math.round(h * ar), height: Math.round(h) };
      });

      rowsOut.push({ height: Math.round(h), items });

      row = [];
      aspectSum = 0;
    };

    images.forEach((img, idx) => {
      const ar = img.w / img.h;
      row.push(img);
      aspectSum += ar;

      const predictedWidth = aspectSum * rowHeight + gap * (row.length - 1);

      if (predictedWidth >= containerWidth) {
        pushRow(false); // normal row
      }

      if (idx === images.length - 1) {
        pushRow(true); // last row → don’t stretch
      }
    });

    return rowsOut;
  }, [containerWidth, images, rowHeight, gap]);

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setOpenReviewImage(true);
  };

  return (
    <div ref={containerRef} className="w-full pt-16 md:pt-0 z-0 mb-2">
      {openReviewImage && (
        <ImageReview
          setOpenReviewImage={setOpenReviewImage}
          image={selectedImage}
          description={selectedImage.description}
        ></ImageReview>
      )}
      {/* Optional top/bottom padding */}
      <div className="flex flex-col gap-1">
        {rows.map((r, ri) => (
          <div
            key={ri}
            className="flex"
            style={{ gap: `${gap}px`, height: `${r.height}px` }}
          >
            {r.items.map((img, i) => (
              <div
                key={`${ri}-${i}`}
                className="overflow-hidden flex items-center justify-center rounded"
                style={{ width: `${img.width}px`, height: `${img.height}px` }}
              >
                {/* <img
                  src={img.src}
                  alt={`img-${ri}-${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ transformOrigin: "center center" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = `scale(${zoomScale})`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onContextMenu={cancelRightClick}
                  draggable={false}
                  onClick={() => handleSelectImage(img)}
                /> */}
                <ImageWithSkeleton
                  src={img.src}
                  alt={`img-${ri}-${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  onClick={() => {
                    handleSelectImage(img);
                    console.log(img);
                  }}
                ></ImageWithSkeleton>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IllustsPage;

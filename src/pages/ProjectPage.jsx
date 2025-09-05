import React from "react";
import { cancelRightClick } from "../utils/utilFunctions";

import LatibuleProject from "/imgs/ProjectCovers/Latibule Project.png";
import LearcultProject from "/imgs/ProjectCovers/Learcult Project.png"

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const sampleImages = [
  {
    src: LatibuleProject,
    w: 526,
    h: 526,
    url: "latibule",
    text: "Latibule Season 3",
  },
  {
    src: LearcultProject,
    w:526,
    h:526,
    url: "learcult",
    text: "Learcult"
  }
];

const ImageReview = ({ image, setOpenReviewImage }) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-40 
              bg-black/70 flex items-center justify-center"
    >
      <button
        onClick={() => setOpenReviewImage(false)}
        className="absolute right-4 top-4 flex flex-col justify-center items-center w-8 h-8 group cursor-pointer translate-y-16 md:-translate-x-7 md:translate-y-0"
      >
        {/* Top bar */}
        <span
          className={
            "block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out rotate-45 translate-y-1"
          }
        ></span>

        {/* Bottom bar */}
        <span
          className={
            "block h-1 w-full bg-white rounded transition-transform duration-500 ease-in-out -rotate-45"
          }
        ></span>
      </button>
      <img
        src={image?.src}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
    </div>
  );
};

const ProjectPage = ({
  images = sampleImages,
  rowHeight = 300, // target row height in px
  gap = 4, // gap between items in px
  zoomScale = 1.1, // hover zoom
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  return (
    <div ref={containerRef} className="w-full pt-16 md:pt-0 z-0">
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
                <Link to={`/${img.url}`}>
                  <div className="relative group w-full h-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={`img-${ri}-${i}`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                      onContextMenu={cancelRightClick}
                      draggable={false}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = `scale(${zoomScale})`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white text-lg font-semibold">
                        {img.text}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;

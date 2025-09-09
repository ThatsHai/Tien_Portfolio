import React, { useRef, useState, useEffect, useMemo } from "react";
import { cancelRightClick } from "../utils/utilFunctions";
import IntroductoryTermPaper from "./animation/IntroductoryTermPaper/cover.jpg"
import { Link } from "react-router-dom";

const sampleImages = [
  {
    src: IntroductoryTermPaper,
    w: 1920,
    h: 1080,
    url: "fundamentalTopics",
    text: "Fundamental Topic",
  },
];

const AnimationPage = ({
  images = sampleImages,
  rowHeight = 400, // target row height in px
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

export default AnimationPage;

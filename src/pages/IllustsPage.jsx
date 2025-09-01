import React from "react";
import { cancelRightClick } from "../utils/utilFunctions";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Pass images with known width/height (or any aspect ratio numbers).
 * If you only have URLs, you can prefetch natural sizes once and cache them.
 */
const sampleImages = [
  { src: "https://picsum.photos/id/1015/600/400", w: 600, h: 400 },
  { src: "https://picsum.photos/id/1025/400/600", w: 400, h: 600 },
  { src: "https://picsum.photos/id/1035/1200/800", w: 1200, h: 800 },
  { src: "https://picsum.photos/id/1045/800/500", w: 800, h: 500 },
  { src: "https://picsum.photos/id/1055/700/700", w: 700, h: 700 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
  { src: "https://picsum.photos/id/1015/600/400", w: 600, h: 400 },
  { src: "https://picsum.photos/id/1025/400/600", w: 400, h: 600 },
  { src: "https://picsum.photos/id/1035/1200/800", w: 1200, h: 800 },
  { src: "https://picsum.photos/id/1045/800/500", w: 800, h: 500 },
  { src: "https://picsum.photos/id/1055/700/700", w: 700, h: 700 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
  { src: "https://picsum.photos/id/1065/500/900", w: 500, h: 900 },
  { src: "https://picsum.photos/id/1075/1600/900", w: 1600, h: 900 },
  { src: "https://picsum.photos/id/1080/900/600", w: 900, h: 600 },
];

const IllustsPage = ({
  images = sampleImages,
  rowHeight = 700,          // target row height in px
  gap = 4,                  // gap between items in px
  zoomScale = 1.1,          // hover zoom
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Observe container width so the layout adapts on resize
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
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

    const pushRow = () => {
      if (row.length === 0) return;
      // Compute the exact row height so that summed widths fit container width
      const totalGaps = gap * (row.length - 1);
      const exactRowH = (containerWidth - totalGaps) / aspectSum;
      const h = Math.max(exactRowH, 80); // clamp to avoid too tiny rows
      const items = row.map(img => {
        const ar = img.w / img.h;
        return { ...img, width: Math.round(h * ar), height: Math.round(h) };
      });
      rowsOut.push({ height: Math.round(h), items });
      // reset accumulators
      row = [];
      aspectSum = 0;
    };

    images.forEach((img, idx) => {
      const ar = img.w / img.h;
      row.push(img);
      aspectSum += ar;

      // Predict row width if we kept target rowHeight
      const predictedWidth = aspectSum * rowHeight + gap * (row.length - 1);
      // If the row would exceed the container, finalize it now
      if (predictedWidth >= containerWidth) pushRow();
      // If it’s the last image and row still not flushed, flush anyway
      if (idx === images.length - 1) pushRow();
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
                <img
                  src={img.src}
                  alt={`img-${ri}-${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ transformOrigin: "center center" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = `scale(${zoomScale})`)}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IllustsPage;

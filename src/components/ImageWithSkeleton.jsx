import { useState } from "react";
import { cancelRightClick } from "../utils/utilFunctions";

const Skeleton = ({ className }) => {
  return <div className={`animate-pulse bg-gray-300 rounded ${className}`} />;
};

const ImageWithSkeleton = ({ src, alt, className, onClick = () => {} }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full">
      {!loaded && <Skeleton className="" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        onError={() => setLoaded(true)} // fallback: hide skeleton
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onContextMenu={cancelRightClick}
        draggable="false"
      />
    </div>
  );
};

export default ImageWithSkeleton;

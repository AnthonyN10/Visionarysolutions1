
import { useState, useEffect } from "react";

type PreloadImageProps = {
  src: string;
  children: React.ReactNode;
};

const PreloadImage = ({ src, children }: PreloadImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative">
      {/* Preload overlay to hide image loading */}
      <div className={`absolute inset-0 bg-[#020b43] ${imageLoaded ? 'animate-fadeOut' : ''} z-0`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PreloadImage;


import { useState, useEffect } from "react";

type PreloadImageProps = {
  src: string;
  children: React.ReactNode;
};

const PreloadImage = ({ src, children }: PreloadImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if image is already loaded in cache
    const img = new Image();
    img.src = src;
    
    if (img.complete) {
      // Image is already cached
      setImageLoaded(true);
    } else {
      // Wait for image to load
      img.onload = () => {
        setImageLoaded(true);
      };
    }
    
    // Set a fallback timeout to ensure the overlay doesn't stay indefinitely
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
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

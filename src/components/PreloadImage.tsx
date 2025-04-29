
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type PreloadImageProps = {
  src: string;
  children: React.ReactNode;
};

const PreloadImage = ({ src, children }: PreloadImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!src) {
      setImageLoaded(true);
      return;
    }
    
    // For mobile, use a shorter timeout to improve perceived performance
    const timeoutDuration = isMobile ? 300 : 1000;
    
    // Check if image is already loaded in cache
    const img = new Image();
    
    // Set lower priority for background images on mobile
    if (isMobile) {
      img.setAttribute('fetchpriority', 'low');
    }
    
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
    }, timeoutDuration);
    
    return () => clearTimeout(timer);
  }, [src, isMobile]);

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

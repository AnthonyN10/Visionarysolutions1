
import { useState, useEffect } from "react";

type PreloadImageProps = {
  src: string;
  children: React.ReactNode;
  mobileSrc?: string; // Optional lower-resolution source for mobile
  priority?: boolean; // Flag for high-priority images
};

const PreloadImage = ({ 
  src, 
  children, 
  mobileSrc, 
  priority = false 
}: PreloadImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Convert image path to WebP format
  const getWebPPath = (imagePath: string): string => {
    // Extract file name without extension
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.')) || imagePath;
    
    // Return WebP version if it exists, otherwise return original
    return `${basePath}.webp`;
  };

  useEffect(() => {
    // Check device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Select appropriate image source
    const baseImageSrc = isMobile && mobileSrc ? mobileSrc : src;
    const webpSrc = getWebPPath(baseImageSrc);
    
    // Modern browsers: Try WebP first
    const img = new Image();
    
    // Set loading attribute based on priority
    if (priority) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.setAttribute('loading', 'lazy');
    }
    
    img.onerror = () => {
      // WebP not supported, fallback to original format
      const fallbackImg = new Image();
      if (priority) {
        fallbackImg.setAttribute('loading', 'eager');
        fallbackImg.setAttribute('fetchpriority', 'high');
      } else {
        fallbackImg.setAttribute('loading', 'lazy');
      }
      fallbackImg.src = baseImageSrc;
      
      fallbackImg.onload = () => {
        setImageLoaded(true);
      };
    };
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Try to load WebP first
    img.src = webpSrc;
    
    // Fallback timeout is even shorter for mobile
    const timeout = isMobile ? 400 : 800;
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, timeout);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [src, mobileSrc, priority]);

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

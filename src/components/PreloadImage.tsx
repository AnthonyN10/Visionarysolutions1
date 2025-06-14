
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

  useEffect(() => {
    // Check device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Select appropriate image source
    const imageSrc = isMobile && mobileSrc ? mobileSrc : src;
    
    // Check if image is already loaded in cache
    const img = new Image();
    
    // Set loading attribute based on priority
    if (priority) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.setAttribute('loading', 'lazy');
    }
    
    img.src = imageSrc;
    
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
    // Use shorter timeout on mobile for better perceived performance
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, isMobile ? 500 : 1000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [src, mobileSrc, priority]);

  return (
    <div className="relative">
      {/* Overlay made transparent to immediately show background image */}
      <div className={`absolute inset-0 bg-transparent ${imageLoaded ? 'animate-fadeOut' : ''} z-0`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PreloadImage;


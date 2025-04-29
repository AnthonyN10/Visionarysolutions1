
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceCardProps {
  title: string;
  image: string;
  detailedInfo: string;
}

export const ServiceCard = ({ title, image, detailedInfo }: ServiceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip effect on mobile for better performance
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width / 2;
    setHoverSide(isLeftSide ? 'left' : 'right');
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = image;
    
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => {
        setImageLoaded(true);
      };
    }

    // Fallback in case image doesn't load
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [image]);
  
  // Adjust card height based on device
  const cardHeight = isMobile ? "250px" : "350px";

  return (
    <div 
      className="relative w-full perspective cursor-pointer" 
      style={{ height: cardHeight }} 
      onClick={handleFlip}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        } ${
          !isMobile && hoverSide === 'left' 
            ? '-translate-y-2 -rotate-1' 
            : !isMobile && hoverSide === 'right' 
              ? '-translate-y-2 rotate-1' 
              : ''
        }`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-none shadow-lg group transition-all duration-300 hover:shadow-2xl flex flex-col">
          <div className="flex flex-col h-full">
            <div className="bg-white p-4 md:p-6 flex-grow flex justify-center items-center">
              <div className="max-w-[120px] max-h-[120px] md:max-w-[150px] md:max-h-[150px] mx-auto">
                {imageLoaded ? (
                  <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                    loading="lazy"
                    width="150"
                    height="150"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-gray-200 animate-pulse rounded"></div>
                )}
              </div>
            </div>
            
            <div className="bg-[#0a1657] text-white text-center p-3 md:p-4 flex-shrink-0 group-hover:bg-[#0c1d75] transition-colors duration-300">
              <h3 className="font-bold text-base md:text-lg lg:text-xl">{title}</h3>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-none shadow-lg flex flex-col">
          <div className="flex flex-col h-full bg-[#0c1d75] text-white">
            <div className="p-4 md:p-6 flex-grow overflow-hidden">
              <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-4">{title}</h3>
              <div className="overflow-y-auto h-[calc(100%-40px)] md:h-[calc(100%-60px)] text-xs md:text-sm">
                <p>{detailedInfo}</p>
              </div>
            </div>
            <div className="bg-[#0a1657] p-3 md:p-4 flex-shrink-0 text-center">
              <button 
                className="text-xs md:text-sm text-white opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                BACK TO FRONT
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

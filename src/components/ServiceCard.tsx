
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceCardProps {
  title: string;
  image: string;
  detailedInfo: string;
}

export const ServiceCard = ({ title, image, detailedInfo }: ServiceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Only track mouse movement on non-mobile devices
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width / 2;
    setHoverSide(isLeftSide ? 'left' : 'right');
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  // Adjust card height based on device
  const cardHeight = isMobile ? "250px" : "350px";
  
  // Use simpler animations on mobile
  const hoverAnimation = isMobile ? '' : 
    hoverSide === 'left' ? '-translate-y-2 -rotate-1' : 
    hoverSide === 'right' ? '-translate-y-2 rotate-1' : '';

  return (
    <div 
      className="relative w-full perspective cursor-pointer" 
      style={{ height: cardHeight }} 
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={`Service: ${title}`}
      tabIndex={0}
    >
      <div
        className={`relative w-full h-full transition-all ${isMobile ? 'duration-300' : 'duration-500'} preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        } ${hoverAnimation}`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-none shadow-lg group transition-all duration-300 hover:shadow-2xl flex flex-col">
          <div className="flex flex-col h-full">
            <div className="bg-white p-4 sm:p-6 flex-grow flex justify-center items-center">
              <div className={`${isMobile ? 'max-w-[100px]' : 'max-w-[150px]'} max-h-[150px] mx-auto`}>
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                  loading="lazy"
                  width="150"
                  height="150"
                />
              </div>
            </div>
            
            <div className="bg-[#0a1657] text-white text-center p-4 flex-shrink-0 group-hover:bg-[#0c1d75] transition-colors duration-300">
              <h3 className="font-bold text-base sm:text-lg md:text-xl">{title}</h3>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-none shadow-lg flex flex-col">
          <div className="flex flex-col h-full bg-[#0c1d75] text-white">
            <div className="p-4 sm:p-6 flex-grow overflow-hidden">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4">{title}</h3>
              <div className="overflow-y-auto h-[calc(100%-50px)] text-sm">
                <p>{detailedInfo}</p>
              </div>
            </div>
            <div className="bg-[#0a1657] p-3 sm:p-4 flex-shrink-0 text-center">
              <button 
                className="text-sm text-white opacity-80 hover:opacity-100 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                aria-label="Back to front"
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

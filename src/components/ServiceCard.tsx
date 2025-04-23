
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width / 2;
    setHoverSide(isLeftSide ? 'left' : 'right');
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  // Adjust card height based on device
  const cardHeight = isMobile ? "300px" : "350px";

  return (
    <div 
      className="relative w-full perspective cursor-pointer" 
      style={{ height: cardHeight }} 
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        } ${
          hoverSide === 'left' 
            ? '-translate-y-2 -rotate-1' 
            : hoverSide === 'right' 
              ? '-translate-y-2 rotate-1' 
              : ''
        }`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-none shadow-lg group transition-all duration-300 hover:shadow-2xl flex flex-col">
          <div className="flex flex-col h-full">
            <div className="bg-white p-6 flex-grow flex justify-center items-center">
              <div className="max-w-[150px] max-h-[150px] mx-auto">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="bg-[#0a1657] text-white text-center p-4 flex-shrink-0 group-hover:bg-[#0c1d75] transition-colors duration-300">
              <h3 className="font-bold text-lg sm:text-xl">{title}</h3>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-none shadow-lg flex flex-col">
          <div className="flex flex-col h-full bg-[#0c1d75] text-white">
            <div className="p-6 flex-grow overflow-hidden">
              <h3 className="font-bold text-xl mb-4">{title}</h3>
              <div className="overflow-y-auto h-[calc(100%-60px)]">
                <p className="text-sm">{detailedInfo}</p>
              </div>
            </div>
            <div className="bg-[#0a1657] p-4 flex-shrink-0 text-center">
              <button 
                className="text-sm text-white opacity-80 hover:opacity-100"
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

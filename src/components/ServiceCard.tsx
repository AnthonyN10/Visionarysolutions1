
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { RotateCw } from "lucide-react";

interface ServiceCardProps {
  title: string;
  // description: string;
  image: string;
  detailedInfo: string;
}

export const ServiceCard = ({ title, /*description,*/ image, detailedInfo }: ServiceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-[300px] perspective" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-none shadow-lg group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
          <div className="flex flex-col h-full">
            <div className="bg-white p-3 sm:p-4 flex-shrink-0 flex justify-center items-center aspect-square">
              <img 
                src={image} 
                alt={title} 
                className="max-h-full object-contain w-full h-full transition-transform duration-300 group-hover:scale-110" 
                loading="lazy"
              />
            </div>
            
            <div className="bg-[#0a1657] text-white text-center p-3 sm:p-4 flex-grow flex flex-col justify-center group-hover:bg-[#0c1d75] transition-colors duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-1">{title}</h3>
            
              <RotateCw className="w-5 h-5 mx-auto mt-2 opacity-70" />
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-none shadow-lg">
          <div className="flex flex-col h-full bg-[#0c1d75] text-white p-6">
            <h3 className="font-bold text-xl mb-4">{title}</h3>
            <p className="text-sm flex-grow overflow-y-auto">{detailedInfo}</p>
            <button 
              className="mt-4 text-sm flex items-center justify-center gap-2 opacity-80 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <RotateCw className="w-4 h-4" />
              Flip back
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

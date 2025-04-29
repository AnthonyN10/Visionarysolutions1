
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

type HeroSectionProps = {
  onGetStarted: () => void;
};

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small timeout to trigger animations after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    
    // Call the function directly
    if (typeof onGetStarted === 'function') {
      onGetStarted();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col relative z-0 pt-16 md:pt-24">
      <div className="flex-1 flex flex-col justify-center items-center md:items-end px-4 md:pr-8 lg:pr-24">
        <div 
          className={`text-center md:text-right transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            BUILD YOUR<br />ONLINE<br />PRESENCE
          </h1>
          <Button 
            onClick={handleGetStarted}
            type="button"
            className="bg-white hover:bg-white/90 text-[#020b43] font-bold rounded-full px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-sm sm:text-base md:text-lg cursor-pointer z-[100] relative"
          >
            GET STARTED
          </Button>
        </div>
      </div>
      
      <div className={`py-4 md:py-6 text-center transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
        <h2 className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold px-3 md:px-4">
          YOUR VISION WITH OUR SOLUTIONS
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;

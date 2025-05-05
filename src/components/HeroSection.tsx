
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

type HeroSectionProps = {
  onGetStarted: () => void;
};

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    // Staggered animation timing
    const titleTimer = setTimeout(() => setTitleVisible(true), 600);
    const buttonTimer = setTimeout(() => setButtonVisible(true), 1000);
    const taglineTimer = setTimeout(() => setTaglineVisible(true), 1400);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    
    // Call the function directly
    if (typeof onGetStarted === 'function') {
      onGetStarted();
    } else {
      console.error("onGetStarted is not a function", onGetStarted);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col relative z-0 pt-16 md:pt-24">
      <div className="flex-1 flex flex-col justify-center items-center md:items-end px-4 md:pr-8 lg:pr-24">
        <div className="text-center md:text-right">
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight transition-all duration-700 transform ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            BUILD YOUR<br />ONLINE<br />PRESENCE
          </h1>
          <div 
            className={`transition-all duration-700 transform ${
              buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              onClick={handleGetStarted}
              type="button"
              className={`bg-white hover:bg-white/90 text-[#020b43] font-bold rounded-full ${
                isMobile ? 'px-6 py-4 text-sm' : 'px-6 py-5 text-base md:px-8 md:py-6 md:text-lg'
              } cursor-pointer z-[100] relative touch-manipulation hover:scale-105 transition-transform duration-300`}
              aria-label="Get started"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className={`py-4 md:py-6 text-center transition-all duration-700 transform ${
          taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-4">
          YOUR VISION WITH OUR SOLUTIONS
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;


import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onGetStarted: () => void;
};

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    console.log("Get Started button clicked");
    onGetStarted();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col relative z-0 pt-20 md:pt-24">
      <div className="flex-1 flex flex-col justify-center items-center md:items-end px-4 md:pr-8 lg:pr-24">
        <div className="text-center md:text-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            BUILD YOUR<br />ONLINE<br />PRESENCE
          </h1>
          <Button 
            onClick={handleGetStarted}
            type="button"
            className="bg-white hover:bg-white/90 text-[#020b43] font-bold rounded-full px-6 py-5 text-base md:px-8 md:py-6 md:text-lg cursor-pointer"
          >
            GET STARTED
          </Button>
        </div>
      </div>
      
      <div className="py-6 text-center">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-4">
          YOUR VISION WITH OUR SOLUTIONS
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;

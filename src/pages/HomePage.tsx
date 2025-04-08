
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#020b43] bg-[url('/lovable-uploads/3f5239a1-b4c7-46aa-9439-faabc0478907.png')] bg-cover bg-center">
      <div className="min-h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center text-center bg-black/40">
          <div className="max-w-4xl px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              BUILD YOUR ONLINE PRESENCE
            </h1>
            <Link to="/contact">
              <Button className="bg-white hover:bg-white/90 text-[#020b43] font-bold rounded-full px-8 py-6 text-lg">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-[#020b43]/70 backdrop-blur-sm py-6 text-center">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
            YOUR VISION WITH OUR SOLUTIONS
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

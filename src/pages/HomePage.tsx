
import HeroSection from "@/components/HeroSection";
import ThreeBackground from "@/components/ThreeBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const HomePage = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay setting visibility for a smooth entry animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToContact = () => {
    // Try direct element access first - most efficient
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    
    // Fallback methods if the above doesn't work
    const contactSectionAlt = document.querySelector('[id="contact"]');
    if (contactSectionAlt) {
      (contactSectionAlt as HTMLElement).scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    
    // Use fixed position as last resort - make this faster for mobile
    window.scrollTo({
      top: 3000, 
      behavior: isMobile ? 'auto' : 'smooth'
    });
  };

  return (
    <div className={`min-h-screen bg-[#020b43] relative transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Only the new shader-based 3D background */}
      <ThreeBackground />
      
      {/* Content - top layer */}
      <div className="relative z-20">
        <HeroSection onGetStarted={scrollToContact} />
      </div>
    </div>
  );
};

export default HomePage;

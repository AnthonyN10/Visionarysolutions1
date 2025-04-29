
import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  
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
    <div className="min-h-screen bg-[#020b43] bg-[url('/BACKROUND.png')] bg-cover bg-center relative">
      <PreloadImage 
        src="/BACKROUND.png" 
        mobileSrc="/BACKROUND.png" 
        priority={true}
      >
        <HeroSection onGetStarted={scrollToContact} />
      </PreloadImage>
    </div>
  );
};

export default HomePage;

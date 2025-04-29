
import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const isMobile = useIsMobile();

  const scrollToContact = () => {
    // Get the contact section element
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        contactSection.scrollIntoView({ 
          behavior: isMobile ? 'auto' : 'smooth', // Use auto for mobile (faster)
          block: 'start' 
        });
      });
      return;
    }

    // Fallback - use hash navigation which is faster on mobile
    window.location.href = "#contact";
  };

  // For mobile, use a simpler background approach
  const backgroundStyle = isMobile 
    ? { backgroundColor: '#020b43' } 
    : { backgroundImage: 'url("/BACKROUND.png")', backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <div className="min-h-screen bg-[#020b43]" style={backgroundStyle}>
      {!isMobile ? (
        <PreloadImage src="/BACKROUND.png">
          <HeroSection onGetStarted={scrollToContact} />
        </PreloadImage>
      ) : (
        <HeroSection onGetStarted={scrollToContact} />
      )}
    </div>
  );
};

export default HomePage;

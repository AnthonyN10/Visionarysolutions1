
import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  const scrollToContact = () => {
    // Add a console log to debug
    console.log("Scrolling to contact section");
    
    // Try first with getElementById
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log("Found contact section by ID");
    } else {
      // If not found by ID, try querySelector as fallback
      const contactSectionAlt = document.querySelector('[id="contact"]');
      if (contactSectionAlt) {
        console.log("Found contact section by querySelector");
        (contactSectionAlt as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log("Contact section not found");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020b43] bg-[url('/BACKROUND.png')] bg-cover bg-center relative">
      <PreloadImage src="/BACKROUND.png">
        <HeroSection onGetStarted={scrollToContact} />
      </PreloadImage>
    </div>
  );
};

export default HomePage;

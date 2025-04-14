
import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  const scrollToContact = () => {
    // Add a console log to debug
    console.log("Scrolling to contact section");
    
    // Try multiple methods to find and scroll to the contact section
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
      // Try to scroll directly
      console.log("Found contact section by ID, scrolling to it");
      window.scrollTo({
        top: contactSection.offsetTop - 80, // Account for navbar height
        behavior: 'smooth'
      });
      return;
    }
    
    // If direct ID doesn't work, try querySelector
    const contactSectionAlt = document.querySelector('[id="contact"]');
    if (contactSectionAlt) {
      console.log("Found contact section by querySelector");
      window.scrollTo({
        top: (contactSectionAlt as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
      return;
    }
    
    // Last resort - try to find by section name in URL
    console.log("Trying navigation by hash");
    window.location.href = "/#contact";
    
    console.log("Contact section not found with any method");
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

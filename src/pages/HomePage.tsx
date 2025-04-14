
import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  const scrollToContact = () => {
    // Add extensive console logs to debug
    console.log("Scrolling to contact section - function called");
    
    // Method 1: Try direct element access
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      console.log("Found contact section by ID");
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    
    // Method 2: Try querySelector
    const contactSectionAlt = document.querySelector('[id="contact"]');
    if (contactSectionAlt) {
      console.log("Found contact section by querySelector");
      (contactSectionAlt as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    
    // Method 3: Try to use window.scrollTo with fixed position
    // This is a fallback assuming the contact section is roughly 3000px from the top
    // Which is reasonable based on the console logs we've seen
    console.log("Using fallback scroll to fixed position");
    window.scrollTo({
      top: 3000, // Approximate position of contact section based on logs
      behavior: 'smooth'
    });
    
    // Method 4: Last resort - navigate by hash
    console.log("Using navigation by hash as final method");
    window.location.href = "#contact";
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


import PreloadImage from "@/components/PreloadImage";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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

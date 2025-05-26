import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
const AboutPage = () => {
  useEffect(() => {
    // Preload any images used in this component
    const preloadImages = () => {
      // Add any images that need preloading here
    };
    preloadImages();
  }, []);
  return <div className="bg-white pt-24 md:pt-28 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1657] mb-8 text-center">ABOUT US</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 animate-fade-in" style={{
          animationDelay: '0.1s'
        }}>
            <Card className="h-full shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4 text-center">OUR MISSION</h2>
                <p className="text-gray-700 text-center">
                  At Visionary Solutions, we are committed to transforming your digital presence with innovative web solutions and branding solutions. 
                  We believe in creating websites that not only look stunning but also drive results for your business.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <Card className="h-full shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4 text-center">OUR APPROACH</h2>
                <p className="text-gray-700 text-center">
                  We take a client-centered approach to every project, ensuring that we understand your unique needs and goals.
                  Our team combines technical expertise with creative design to deliver websites that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1 animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            <Card className="h-full shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4 text-center">WHY CHOOSE US</h2>
                <ul className="list-disc pl-5 text-left text-gray-700 space-y-2">
                  <li>Expert team with years of experience</li>
                  <li>Personalized solutions tailored to you</li>
                  <li>Commitment to quality and detail</li>
                  <li>Ongoing support and maintenance</li>
                  <li>Affordable pricing with transparency</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default AboutPage;
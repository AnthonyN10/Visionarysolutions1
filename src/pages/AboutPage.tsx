
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

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1657] mb-12 text-center">ABOUT US</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Our Mission</h2>
                <p className="text-gray-700">
                  At Visionary Solutions, we are committed to transforming your digital presence with innovative web solutions. 
                  We believe in creating websites that not only look stunning but also drive results for your business.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Our Approach</h2>
                <p className="text-gray-700">
                  We take a client-centered approach to every project, ensuring that we understand your unique needs and goals.
                  Our team combines technical expertise with creative design to deliver websites that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="shadow-lg border-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Why Choose Us</h2>
                <ul className="list-disc inline-block text-left text-gray-700 space-y-2">
                  <li>Expert team with years of experience in web development</li>
                  <li>Personalized solutions tailored to your specific requirements</li>
                  <li>Commitment to quality and attention to detail</li>
                  <li>Ongoing support and maintenance services</li>
                  <li>Affordable pricing with transparent quotes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

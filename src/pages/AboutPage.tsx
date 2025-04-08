
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1657] mb-12">ABOUT US</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Our Mission</h2>
                <p className="text-gray-700">
                  At Visionary Solutions, we are committed to transforming your digital presence with innovative web solutions. 
                  We believe in creating websites that not only look stunning but also drive results for your business.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Our Approach</h2>
                <p className="text-gray-700">
                  We take a client-centered approach to every project, ensuring that we understand your unique needs and goals.
                  Our team combines technical expertise with creative design to deliver websites that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#0a1657] mb-4">Why Choose Us</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
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

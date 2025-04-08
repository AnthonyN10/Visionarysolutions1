
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  {
    title: "PROFILE CREATION",
    description: "Professional profile setup for businesses and individuals.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "WEBSITE DEVELOPMENT",
    description: "Custom website design and development tailored to your needs.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "BRAND BUILDING",
    description: "Strategic brand development to establish your market presence.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "CREATIVE STRATEGY",
    description: "Innovative digital strategies to grow your business.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "WEBSITE MAINTENANCE",
    description: "Regular updates and maintenance for optimal performance.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "WEBSITE REVAMPS",
    description: "Refresh and modernize your existing website.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "PHOTOGRAPHY",
    description: "Professional photography services for your digital content.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "SEO MANAGEMENT",
    description: "Search engine optimization to improve your online visibility.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  },
  {
    title: "STARTUP",
    description: "Complete digital setup for new businesses.",
    image: "/lovable-uploads/2309855d-9ffc-40a7-87d1-5808108852e4.png"
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1657] text-center mb-12">
          OUR SERVICES
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

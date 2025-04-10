
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  {
    title: "PROFILE CREATION",
    description: "Professional profile setup for businesses and individuals.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "WEBSITE DEVELOPMENT",
    description: "Custom website design and development tailored to your needs.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "BRAND BUILDING",
    description: "Strategic brand development to establish your market presence.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    title: "CREATIVE STRATEGY",
    description: "Innovative digital strategies to grow your business.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
  {
    title: "WEBSITE MAINTENANCE",
    description: "Regular updates and maintenance for optimal performance.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "WEBSITE REVAMPS",
    description: "Refresh and modernize your existing website.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    title: "PHOTOGRAPHY",
    description: "Professional photography services for your digital content.",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c"
  },
  {
    title: "SEO MANAGEMENT",
    description: "Search engine optimization to improve your online visibility.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "STARTUP",
    description: "Complete digital setup for new businesses.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
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

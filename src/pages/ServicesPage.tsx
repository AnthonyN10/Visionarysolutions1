
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  {
    title: "PROFILE CREATION",
    description: "Professional profile setup for businesses and individuals.",
    image: "1.svg"
  },
  {
    title: "WEBSITE DEVELOPMENT",
    description: "Custom website design and development tailored to your needs.",
    image: "2.svg"
  },
  {
    title: "BRAND BUILDING",
    description: "Strategic brand development to establish your market presence.",
    image: "3.svg"
  },
  {
    title: "CREATIVE STRATEGY",
    description: "Innovative digital strategies to grow your business.",
    image: "4.svg"
  },
  {
    title: "WEBSITE MAINTENANCE",
    description: "Regular updates and maintenance for optimal performance.",
    image: "5.svg"
  },
  {
    title: "WEBSITE REVAMPS",
    description: "Refresh and modernize your existing website.",
    image: "6.svg"
  },
  {
    title: "PHOTOGRAPHY",
    description: "Professional photography services for your digital content.",
    image: "7.svg"
  },
  {
    title: "SEO MANAGEMENT",
    description: "Search engine optimization to improve your online visibility.",
    image: "8.svg"
  },
  {
    title: "STARTUP",
    description: "Complete digital setup for new businesses.",
    image: "9.svg"
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

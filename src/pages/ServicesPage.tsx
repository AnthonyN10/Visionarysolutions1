
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
    <div className="min-h-screen bg-white py-16 pt-24 md:pt-28">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1657] text-center mb-8 md:mb-12">
          OUR SERVICES
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ServiceCard 
                title={service.title}
                description={service.description}
                image={service.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

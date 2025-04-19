
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  {
    title: "PROFILE CREATION",
    image: "1.svg",
    detailedInfo: "Our profile creation service includes comprehensive social media presence setup, brand voice development, and content strategy planning. We ensure your profiles are optimized for maximum engagement and professional presentation across all platforms."
  },
  {
    title: "WEBSITE DEVELOPMENT",
    image: "2.svg",
    detailedInfo: "From concept to deployment, we create responsive, modern websites using the latest technologies. Our development process includes UI/UX design, mobile optimization, SEO implementation, and comprehensive testing."
  },
  {
    title: "BRAND BUILDING",
    image: "3.svg",
    detailedInfo: "We help develop your brand identity through logo design, color schemes, typography, and brand guidelines. Our approach ensures consistency across all platforms while building recognition and trust."
  },
  {
    title: "CREATIVE STRATEGY",
    image: "4.svg",
    detailedInfo: "Our creative strategy service provides data-driven marketing plans, content calendars, audience targeting, and engagement strategies to help your business stand out in the digital landscape."
  },
  {
    title: "WEBSITE MAINTENANCE",
    image: "5.svg",
    detailedInfo: "Keep your website running smoothly with our maintenance service including regular updates, security patches, performance optimization, backup management, and technical support."
  },
  {
    title: "WEBSITE REVAMPS",
    image: "6.svg",
    detailedInfo: "Transform your outdated website with modern design trends, improved functionality, enhanced user experience, and better performance while maintaining your brand identity."
  },
  {
    title: "PHOTOGRAPHY",
    image: "7.svg",
    detailedInfo: "High-quality professional photography for your website, social media, and marketing materials. Includes product photography, corporate headshots, and event coverage."
  },
  {
    title: "SEO MANAGEMENT",
    image: "8.svg",
    detailedInfo: "Comprehensive SEO services including keyword research, on-page optimization, content strategy, backlink building, and regular performance reporting to improve your search rankings."
  },
  {
    title: "STARTUP",
    image: "9.svg",
    detailedInfo: "End-to-end digital setup for startups including branding, website development, social media setup, and initial marketing strategy to help launch your business successfully."
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white py-16 pt-24 md:pt-28">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1657] text-center mb-8 md:mb-12">
          OUR SERVICES
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-fade-in p-4 bg-gray-50 rounded-lg" 
              style={{ 
                animationDelay: `${index * 0.1}s`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <ServiceCard 
                title={service.title}
                image={service.image}
                detailedInfo={service.detailedInfo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

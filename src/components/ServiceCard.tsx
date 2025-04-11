
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export const ServiceCard = ({ title, description, image }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg h-full group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="flex flex-col h-full">
        <div className="bg-white p-4 flex-shrink-0 flex justify-center items-center aspect-square">
          <img 
            src={image} 
            alt={title} 
            className="max-h-full object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" 
            loading="lazy"
          />
        </div>
        
        <div className="bg-[#0a1657] text-white text-center p-4 flex-grow flex flex-col justify-center group-hover:bg-[#0c1d75] transition-colors duration-300">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-sm mt-1 opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  );
};


import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export const ServiceCard = ({ title, description, image }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="flex flex-col h-full">
        <div className="bg-white p-4 flex justify-center items-center aspect-square">
          <img src={image} alt={title} className="max-h-full object-contain" />
        </div>
        
        <div className="bg-[#0a1657] text-white text-center p-4">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-sm mt-1 opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  );
};

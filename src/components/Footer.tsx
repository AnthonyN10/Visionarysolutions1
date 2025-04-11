
import { Link } from "react-router-dom";
import { Mail, Instagram, Facebook, Phone, WhatsApp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1657] text-white py-10">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">CONTACT</h2>
          <div className="flex items-center mb-3">
            <Phone className="mr-2" size={20} />
            <a href="tel:0817098779" className="hover:underline">- 0817098779</a>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2" size={20} />
            <a href="mailto:info@visionarysolutions.co.za" className="hover:underline">- info@visionarysolutions.co.za</a>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">SOCIALS</h2>
          <div className="flex gap-4">
            <Link to="https://www.instagram.com/visionary_solutions1?igsh=MXZnaTlhZjBsend4Zw%3D%3D&utm_source=qr " target="_blank" className="bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-2 rounded-md hover:scale-110 transition-transform">
              <Instagram size={24} />
            </Link>
            <Link to="https://facebook.com" target="_blank" className="bg-blue-600 p-2 rounded-md hover:scale-110 transition-transform">
              <Facebook size={24} />
            </Link>
            <Link to="https://wa.me/27817098779?text=Welcome%20to%20Visionary%20Solutions%2C%20how%20can%20I%20help%20you?" target="_blank" className="bg-green-500 p-2 rounded-md hover:scale-110 transition-transform">
              <WhatsApp size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

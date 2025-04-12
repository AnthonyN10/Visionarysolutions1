
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-white font-bold" : "text-white/90 hover:text-white";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex flex-col px-4 py-4 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-[#020b43]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
          VISIONARY SOLUTIONS
        </Link>
        {isMobile ? (
          <button onClick={toggleMenu} className="text-white p-2">
            <Menu size={24} />
          </button>
        ) : (
          <div className="flex gap-4 md:gap-8">
            <Link to="/" className={`${isActive("/")} text-lg`}>
              HOME
            </Link>
            <Link to="/about" className={`${isActive("/about")} text-lg`}>
              ABOUT
            </Link>
            <Link to="/services" className={`${isActive("/services")} text-lg`}>
              SERVICES
            </Link>
            <Link to="/contact" className={`${isActive("/contact")} text-lg`}>
              CONTACT US
            </Link>
          </div>
        )}
      </div>
      
      {isMobile && menuOpen && (
        <div className="flex flex-col gap-4 mt-4 pb-2 animate-fade-in">
          <Link 
            to="/" 
            className={`${isActive("/")} text-lg`}
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`${isActive("/about")} text-lg`}
            onClick={() => setMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link 
            to="/services" 
            className={`${isActive("/services")} text-lg`}
            onClick={() => setMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link 
            to="/contact" 
            className={`${isActive("/contact")} text-lg`}
            onClick={() => setMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

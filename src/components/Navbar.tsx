
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-white font-bold" : "text-white/90 hover:text-white";
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 lg:px-16">
      <Link to="/" className="text-white text-3xl font-bold">
        VISIONARY SOLUTIONS
      </Link>
      <div className="flex gap-8">
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
    </nav>
  );
};

export default Navbar;

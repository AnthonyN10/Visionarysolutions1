
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import { useEffect, useRef } from "react";

const queryClient = new QueryClient();

const ScrollToSection = () => {
  const location = useLocation();
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle hash-based navigation
    if (location.hash) {
      console.log("Location hash detected:", location.hash);
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        console.log("Found element by ID:", id);
        // Delay scrolling slightly to ensure DOM is ready
        setTimeout(() => {
          const offsetTop = element.offsetTop;
          console.log("Scrolling to offset:", offsetTop);
          window.scrollTo({
            top: offsetTop - 80, // Adjust for header height
            behavior: "smooth"
          });
        }, 200);
      } else {
        console.log("Element not found for hash:", id);
      }
    }
  }, [location]);

  return (
    <main className="flex-1">
      <div ref={homeRef} id="home" className="section-target">
        <HomePage />
      </div>
      <div ref={aboutRef} id="about" className="section-target">
        <AboutPage />
      </div>
      <div ref={servicesRef} id="services" className="section-target">
        <ServicesPage />
      </div>
      <div ref={contactRef} id="contact" className="section-target">
        <ContactPage />
      </div>
    </main>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#020b43]">
          <Navbar />
          <Routes>
            <Route path="/" element={<ScrollToSection />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

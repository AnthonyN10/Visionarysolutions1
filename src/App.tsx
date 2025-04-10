import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      "/": homeRef,
      "/about": aboutRef,
      "/services": servicesRef,
      "/contact": contactRef,
    };

    const ref = refMap[location.pathname];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="flex-1">
      <div ref={homeRef} id="home">
        <HomePage />
      </div>
      <div ref={aboutRef} id="about">
        <AboutPage />
      </div>
      <div ref={servicesRef} id="services">
        <ServicesPage />
      </div>
      <div ref={contactRef} id="contact">
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
            <Route path="*" element={<ScrollToSection />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

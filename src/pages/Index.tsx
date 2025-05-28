
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import PricingWithQuote from "../components/PricingWithQuote";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import EditModeToolbar from "../components/EditModeToolbar";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash-based navigation for smooth scrolling
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <SEO />
      <EditModeToolbar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <PricingWithQuote />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;

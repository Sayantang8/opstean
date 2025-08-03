
import { useEffect } from "react";
import { useQueryClient } from '@tanstack/react-query';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import About from "@/components/About";
import CompanyGrowthChart from "@/components/CompanyGrowthChart";
import Products from "@/components/Products";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { logger } from "@/utils/logger";

const Index = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Initialize intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the fade-in-section class
    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    // Invalidate products cache for fresh data
    queryClient.invalidateQueries({ queryKey: ['products'] });
    logger.info('Index page loaded', { component: 'Index' });

    return () => observer.disconnect();
  }, [queryClient]);

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <ProductCatalog />
      <About />
      <div className="container mx-auto px-6">
        <CompanyGrowthChart />
      </div>
      <Products />
      <Careers />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;

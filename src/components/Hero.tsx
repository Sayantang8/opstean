
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format",
      title: "Opstean Healthcare Pvt. Ltd.",
      subtitle: "Our mission is to serve the best quality medicine to humanity…",
      accent: "Welcome To"
    },
    {
      image: "/public/images/beyza-yurtkuran-P9afJG5BqEQ-unsplash.jpg",
      title: "Leading Innovation in Healthcare",
      subtitle: "Committed to achieve and maintain excellence in our products.",
      accent: "Trusted by Healthcare Professionals"
    },
    {
      image: "/quality.jpg",
      title: "Serving World Class Medicines",
      subtitle: "To the Humanity",
      accent: "WHO & CGMP Certified"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500); // Changed to 3.5 seconds
    
    return () => clearInterval(timer);
  }, []);

  const smoothScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Sliding Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              backgroundAttachment: "fixed" 
            }}
          >
            {/* Enhanced overlay for better text visibility */}
            <div className="w-full h-full bg-gradient-to-r from-black/70 via-navy/60 to-black/50"></div>
          </div>
        </div>
      ))}
      
      {/* Content with enhanced text visibility */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-4 text-teal-400 font-medium tracking-wider animate-fade-in text-lg">
          {slides[currentSlide].accent}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in drop-shadow-2xl" 
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-fade-in drop-shadow-xl" 
           style={{ animationDelay: "0.2s", textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {slides[currentSlide].subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => smoothScrollToSection('contact')}
            className="bg-teal hover:bg-navy text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 btn-hover-effect animate-fade-in shadow-2xl"
            style={{ animationDelay: "0.4s" }}
          >
            Contact Us
          </Button>
          <Button 
            onClick={() => smoothScrollToSection('products')}
            variant="outline"
            className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-navy px-8 py-6 text-lg rounded-lg transition-all duration-300 animate-fade-in shadow-2xl"
            style={{ animationDelay: "0.6s" }}
          >
            View Products
          </Button>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-teal w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

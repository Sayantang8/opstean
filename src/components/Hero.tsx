import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slides data with images for mobile and text for all
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format",
      title: "Opstean Healthcare Pvt. Ltd.",
      subtitle: "Making Quality Healthcare Accessible and Affordable for Everyone",
      accent: "Welcome To"
    },
    {
      image: "/images/beyza-yurtkuran-P9afJG5BqEQ-unsplash.jpg",
      title: "Fastest Growing Pharmaceutical Company",
      subtitle: "In the Indian Pharma Industry",
      accent: "We are the"
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
    }, 3500); // 3.5 seconds per slide

    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-play video when component mounts and handle custom looping with 8-second pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Pause the video at the last frame
      video.pause();

      // Wait 8 seconds then restart the video
      setTimeout(() => {
        video.currentTime = 0; // Reset to beginning
        video.play().catch(console.error);
      }, 8000); // 8 second delay
    };

    // Remove the loop attribute and handle looping manually
    video.loop = false;
    video.addEventListener('ended', handleVideoEnd);

    // Start playing the video
    video.play().catch(console.error);

    // Cleanup
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
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

  const currentSlide_data = slides[currentSlide];

  return (
    <section id="home" className="relative h-screen flex items-center lg:items-end justify-center overflow-hidden">
      {/* Mobile: Sliding Background Images (hidden on lg and above) */}
      <div className="lg:hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
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
      </div>

      {/* Desktop: Full Screen Video Background (visible on lg and above) */}
      <div className="hidden lg:block absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        >
          <source src="/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-navy/50 to-black/60"></div>
      </div>

      {/* Text Content Overlay - Centered on mobile, bottom on desktop */}
      <div className="container mx-auto px-6 relative z-10 text-center lg:mb-20 xl:mb-24 2xl:mb-28">
        <div className="mb-4 lg:mb-3 text-teal-400 font-medium tracking-wider animate-fade-in text-lg">
          {currentSlide_data.accent}
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 lg:mb-3 animate-fade-in drop-shadow-2xl"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
        >
          {currentSlide_data.title}
        </h1>
        <p
          className="text-xl md:text-2xl lg:text-2xl text-white mb-8 lg:mb-6 max-w-3xl mx-auto animate-fade-in drop-shadow-xl"
          style={{ animationDelay: "0.2s", textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          {currentSlide_data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-3 justify-center items-center">
          <Button
            onClick={() => smoothScrollToSection('contact')}
            className="bg-teal hover:bg-navy text-white px-8 py-6 lg:py-4 text-lg lg:text-base rounded-lg transition-all duration-300 btn-hover-effect animate-fade-in shadow-2xl"
            style={{ animationDelay: "0.4s" }}
          >
            Contact Us
          </Button>
          <Button
            onClick={() => smoothScrollToSection('products')}
            variant="outline"
            className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-navy px-8 py-6 lg:py-4 text-lg lg:text-base rounded-lg transition-all duration-300 animate-fade-in shadow-2xl"
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-teal w-8' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Video indicator - only show on desktop */}
      <div className="hidden lg:block absolute top-8 right-8 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Video Background
        </div>
      </div>
    </section>
  );
};

export default Hero;
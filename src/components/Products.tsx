
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FeaturedProductsByCategory } from './products/FeaturedProductsByCategory';

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="products" className="py-8 md:py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-6 md:mb-12 fade-in-section">
          <h2 className="text-2xl md:text-4xl font-bold text-navy mb-3 md:mb-6">Featured Products</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
            Discover our featured pharmaceutical products across key therapeutic categories. 
            Each product is crafted with precision and manufactured under strict quality standards.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal to-navy mx-auto mt-3 md:mt-6 rounded-full"></div>
        </div>
        
        <FeaturedProductsByCategory />
        
        <div className="text-center mt-6 md:mt-12 fade-in-section">
          <Link to="/products">
            <Button className="bg-teal hover:bg-navy text-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg rounded-lg transition-all duration-300 btn-hover-effect shadow-lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;

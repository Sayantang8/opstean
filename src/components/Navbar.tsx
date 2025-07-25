import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const smoothScrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage first
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMobileMenuOpen(false);
  };

  const navigateToProductCategory = (category: string) => {
    if (location.pathname === '/products') {
      // If already on products page, trigger category navigation
      const event = new CustomEvent('navigateToCategory', { detail: { category } });
      window.dispatchEvent(event);
    } else {
      // Navigate to products page with category parameter
      window.location.href = `/products?category=${encodeURIComponent(category)}`;
    }
    setMobileMenuOpen(false);
  };

  const productCategories = [
    'Antibiotics',
    'Cardio Care',
    'Child Care',
    'Cold Care',
    'Derma Care',
    'Eye Care',
    'Gastro',
    'General Segment',
    'Gyno Care',
    'Neuro Care',
    'Ortho Care',
    'Pain Care',
    'Urology Care',
  ];

  const navItems = [
    { name: 'HOME', sectionId: 'home' },
    { name: 'ABOUT US', sectionId: 'about' },
    { name: 'PRODUCTS', sectionId: 'products', hasDropdown: true },
    { name: 'CAREERS', sectionId: 'careers' },
    { name: 'CONTACT', sectionId: 'contact' }
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6',
        'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100',
        'animate-slide-down'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover-scale">
          <img
            src="/lovable-uploads/dc77f5ec-2925-4e96-ab0d-51a138dee8d7.png"
            alt="Opstean Healthcare Logo"
            className="h-8 w-auto transition-transform duration-300"
          />
          <span className="text-lg font-bold text-navy hidden sm:block">
            HEALTHCARE PVT. LTD.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            item.hasDropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center text-sm uppercase tracking-wider font-medium text-navy transition-all duration-300 hover:text-teal hover:scale-105 focus:outline-none">
                  {item.name}
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-300" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-md border shadow-lg animate-slide-down">
                  <DropdownMenuItem className="hover:bg-gray-50">
                    <Link to="/products" className="w-full">View All Products</Link>
                  </DropdownMenuItem>
                  {productCategories.map((category) => (
                    <DropdownMenuItem key={category} className="hover:bg-gray-50">
                      <button
                        onClick={() => navigateToProductCategory(category)}
                        className="w-full text-left"
                      >
                        {category}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                key={item.name}
                onClick={() => smoothScrollToSection(item.sectionId)}
                className="text-sm uppercase tracking-wider font-medium text-navy transition-all duration-300 hover:text-teal hover:scale-105"
              >
                {item.name}
              </button>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-navy focus:outline-none transition-transform duration-300 hover:scale-110"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg py-4 px-6 animate-slide-down">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => smoothScrollToSection(item.sectionId)}
                className="block py-2 text-sm uppercase tracking-wider font-medium text-navy transition-colors duration-300 hover:text-teal w-full text-left"
              >
                {item.name}
              </button>
              {item.hasDropdown && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    to="/products"
                    className="block py-1 text-sm text-gray-600 hover:text-teal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View All Products
                  </Link>
                  {productCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => navigateToProductCategory(category)}
                      className="block py-1 text-sm text-gray-600 hover:text-teal w-full text-left"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import { Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleMapClick = () => {
    window.open('https://maps.google.com/?q=3+Uttarag+Apartment+Vivekananda+Road+Thakurpukur+Kolkata+700063', '_blank');
  };
  
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/dc77f5ec-2925-4e96-ab0d-51a138dee8d7.png"
                alt="Opstean Healthcare Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">
                <span className="text-teal">OPSTEAN</span> HEALTHCARE PVT. LTD.
              </span>
            </div>
            <p className="text-sm text-gray-300 text-center md:text-left mb-4">
              Our mission is to serve the best quality medicine to humanity…
            </p>
            <p className="text-xs text-gray-400 text-center md:text-left">
              &copy; {currentYear} Opstean Healthcare Pvt. Ltd.<br />
              All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="#about" className="text-gray-300 hover:text-teal transition-colors duration-300">About Us</a>
              <a href="#products" className="text-gray-300 hover:text-teal transition-colors duration-300">Products</a>
              <a href="#careers" className="text-gray-300 hover:text-teal transition-colors duration-300">Careers</a>
              <a href="#contact" className="text-gray-300 hover:text-teal transition-colors duration-300">Contact</a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-teal mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  3, Uttarag Apartment, Ground Floor,<br />
                  Vivekananda Road, Mukund Das Colony,<br />
                  Thakurpukur, Kolkata, West Bengal 700063
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal" />
                <p className="text-sm text-gray-300">+91 947486 0402</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal" />
                <p className="text-sm text-gray-300">info@opsteanhealthcare.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal" />
                <p className="text-sm text-gray-300">10 AM - 6 PM</p>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-teal transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@opsteanhealthcare.com" 
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-teal transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            {/* Google Map Integration */}
            <div className="w-full">
              <h4 className="text-sm font-semibold mb-2">Our Location</h4>
              <div 
                className="w-full h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-gray-700 flex items-center justify-center"
                onClick={handleMapClick}
                title="Click to open in Google Maps"
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-teal mx-auto mb-2" />
                  <p className="text-xs text-gray-300">Click to view on Google Maps</p>
                  <p className="text-xs text-gray-400">Thakurpukur, Kolkata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            Opstean Healthcare Pvt. Ltd. - Leading Pharmaceutical Company in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

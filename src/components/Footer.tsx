
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
                className="w-full h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                onClick={handleMapClick}
                title="Click to open in Google Maps"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0722354332956!2d88.3068886768592!3d22.463919636941903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027ba740e84c69%3A0xe90c52c1d7cc2898!2sOpstean%20Healthcare%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1753259389554!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Opstean Healthcare Location - Footer Map"
                ></iframe>
                
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-white mx-auto mb-1" />
                    <p className="text-xs text-white font-medium">Opstean Healthcare</p>
                    <p className="text-xs text-gray-200">Thakurpukur, Kolkata</p>
                  </div>
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

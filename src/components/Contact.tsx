
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

// Input validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
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

  // Enhanced input validation
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    // Name validation
    if (!formState.name || formState.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formState.name.length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (formState.email.length > 254) {
      errors.email = 'Email address is too long';
    }

    // Message validation
    if (!formState.message || formState.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (formState.message.length > 5000) {
      errors.message = 'Message must be less than 5000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Please correct the errors',
        description: 'Check the form for validation errors.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize inputs before submission
      const sanitizedData = {
        name: sanitizeInput(formState.name),
        email: formState.email.toLowerCase().trim(),
        subject: sanitizeInput(formState.subject),
        message: sanitizeInput(formState.message),
        status: 'unread'
      };

      const { error } = await supabase
        .from('contacts')
        .insert([sanitizedData]);

      if (error) throw error;

      toast({
        title: 'Message Sent!',
        description: 'Thank you for your message! We will get back to you soon.',
      });

      setFormState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setFormErrors({});

      logger.info('Contact form submitted successfully', { component: 'Contact' });
    } catch (error) {
      logger.error('Error submitting contact form', error as Error, { component: 'Contact' });
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/4wgg8yUvu6JU6B1S9', '_blank');
  };
  
  return (
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4 fade-in-section">Contact Us</h2>
          <p className="text-xl text-teal font-medium fade-in-section">I WOULD LOVE TO HEAR FROM YOU. PLEASE DROP YOUR MAIL.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fade-in-section">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal peer pt-6 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder=" "
                />
                <label 
                  htmlFor="name"
                  className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Name
                </label>
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal peer pt-6 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder=" "
                />
                <label 
                  htmlFor="email"
                  className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Email
                </label>
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="relative">
                <select
                  name="subject"
                  id="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Career Inquiry">Career Inquiry</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={5000}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal peer pt-6 resize-none ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder=" "
                />
                <label 
                  htmlFor="message"
                  className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Message
                </label>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {formState.message.length}/5000 characters
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-teal hover:bg-navy text-white py-3 rounded-lg transition-all duration-300 btn-hover-effect disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          <div className="fade-in-section">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Our Address</h3>
              <p className="text-gray-600 mb-4">
                3, Uttarag Apartment, Ground Floor<br />
                Vivekananda Road, Mukund Das Colony<br />
                Thakurpukur, Kolkata<br />
                West Bengal 700063<br />
                India
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Email:</strong> info@opsteanhealthcare.com<br />
                <strong>Phone:</strong> +91 947486 0402<br />
                <strong>Working Hours:</strong> 10 AM To 6 PM
              </p>
            </div>
            
            <div 
              className="h-64 relative rounded-lg overflow-hidden group cursor-pointer"
              onClick={handleMapClick}
              title="Click to open in Google Maps"
            >
              <div className="absolute inset-0 bg-gray-200 group-hover:bg-transparent transition-all duration-300 z-10 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium group-hover:opacity-0 transition-opacity">
                  Click to open in Google Maps
                </span>
              </div>

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.2992715394897!2d88.29708451488306!3d22.470860485194348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027184a4c2d4e7%3A0x3d8b5c8b5a8b5b8b!2s3%2C%20Uttarag%20Apartment%2C%20Vivekananda%20Rd%2C%20Mukund%20Das%20Colony%2C%20Thakurpukur%2C%20Kolkata%2C%20West%20Bengal%20700063!5e0!3m2!1sen!2sin!4v1735718245876!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Opstean Healthcare Location - Thakurpukur, Kolkata"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

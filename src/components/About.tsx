import React, { useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Observe all fade-in sections
    const fadeInElements = document.querySelectorAll('.fade-in-section');
    fadeInElements.forEach((element) => {
      observer.observe(element);
    });

    // Observe cards individually
    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    // Fallback: Make all elements visible immediately
    const fallbackTimer = setTimeout(() => {
      fadeInElements.forEach((element) => {
        element.classList.add('is-visible');
      });
      cardRefs.current.forEach((card) => {
        if (card) {
          card.classList.add('is-visible');
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const featureCards = [
    {
      title: 'Certified (WHO, CGMP)',
      description: 'We are collaborated with top manufacturers of India with WHO, CGMP certificate',
      icon: (
        <img src="/certificate.png" alt="Certified WHO CGMP" className="w-20 h-20" />
      )
    },
    {
      title: 'Experienced Team',
      description: 'We have experienced and knowledgeable professional.',
      icon: (
        <img src="/expertise.png" alt="Experienced Team" className="w-16 h-16 object-cover rounded-full" />
      )
    },
    {
      title: 'Technology Driven',
      description: 'We are technology driven company.',
      icon: (
        <img src="/tech.jpg" alt="Technology Driven" className="w-16 h-16 object-cover rounded-full" />
      )
    },
    {
      title: 'Quality Maintain',
      description: 'Our strong policies reflects in product quality.',
      icon: (
        <img src="/quality.jpg" alt="Experienced Team" className="w-16 h-16 object-cover rounded-full" />
      )
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">'OPSTEAN' means 'RISE' in Frisian language.</h2>

        </div>

        {/* Blended Layout: Description + Feature Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

            {/* Left Column: Company Description (2 columns) - Split into two cards */}
            <div className="lg:col-span-2">
              <div className="space-y-6 h-full">
                {/* Company Origin Card */}
                <div
                  className="relative rounded-xl p-6 shadow-xl transform transition-all duration-500 hover:scale-105 group"
                  style={{ backgroundColor: '#b3e7ff' }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-4"></h3>
                    <p className="text-blue-700 leading-relaxed">
                      In 2010, We came into existence, at the forefront of pharmaceutical innovation in India, transforming healthcare delivery across the nation.
                    </p><br />
                    <p className="text-blue-700 leading-relaxed mb-6">
                      We specialize in comprehensive therapeutic areas including Ortho, Cardio, Derma, Gastro Care, and Pain Management, serving healthcare providers nationwide with unwavering commitment to excellence.
                    </p>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>

                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Company Specialization & Achievement Badges Card */}
                

                  {/* Achievement Badges */}
                  <div
                  className="relative rounded-xl p-6 shadow-xl transform transition-all duration-500 hover:scale-105 group flex-1"
                  style={{ backgroundColor: '#b3e7ff' }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center text-sm font-medium text-navy">
                      <div className="w-3 h-3 bg-navy rounded-full mr-3 animate-pulse"></div>
                      <span>💊 Trusted by Healthcare Professionals</span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-navy">
                      <div className="w-3 h-3 bg-navy rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span>🌍 Aiming PAN-India Distribution Network</span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-navy">
                      <div className="w-3 h-3 bg-navy rounded-full mr-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <span>⚡ Rapid Product Development</span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-navy">
                      <div className="w-3 h-3 bg-navy rounded-full mr-3 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      <span>🤝 Customer-Centric Approach</span>
                    </div>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>

                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Column: Feature Cards Grid (3 columns) */}
            <div className="lg:col-span-3 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {featureCards.map((card, index) => (
                  <div
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className="relative rounded-xl p-4 shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl group"
                    style={{ backgroundColor: '#b3e7ff', animationDelay: `${0.2 * index}s` }}
                  >
                    <div className="flex justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <div className="rounded-full overflow-hidden">
                        {React.cloneElement(card.icon, {
                          className: card.title === 'Certified (WHO, CGMP)'
                            ? "w-24 h-24"
                            : "w-20 h-20 object-cover rounded-full"
                        })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-blue-700 leading-relaxed group-hover:text-navy transition-colors duration-300">
                      {card.description}
                    </p>

                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>

                    {/* Floating particles effect */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-3 left-3 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

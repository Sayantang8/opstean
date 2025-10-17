import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Add custom styles for timeline animations
  const timelineStyles = `
        .timeline-line {
            transition: transform 3s ease-out;
            background: linear-gradient(to bottom, #14b8a6, #1e40af);
            box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }
        
        .timeline-item {
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .timeline-dot {
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 4px 15px rgba(0, 122, 179, 0.3);
        }
        
        .timeline-content {
            transition: all 0.6s ease-out;
        }
        
        .timeline-item.animate {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        
        .timeline-dot.animate {
            transform: scale(1) !important;
        }
        
        @keyframes flowDown {
            0% {
                transform: translateX(-50%) scaleY(0);
            }
            100% {
                transform: translateX(-50%) scaleY(1);
            }
        }
        
        @keyframes popIn {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.8);
            }
            60% {
                transform: translateY(-5px) scale(1.05);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes dotBounce {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.3);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(20, 184, 166, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(20, 184, 166, 0.8), 0 0 30px rgba(20, 184, 166, 0.4);
            }
        }
        
        .timeline-line {
            animation: pulseGlow 2s ease-in-out infinite;
        }
    `;

  useEffect(() => {
    // Timeline animation observer
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timelineContainer = entry.target;
            const timelineItems = timelineContainer.querySelectorAll('.timeline-item');

            // Create segmented line animation with stops
            const originalLine = timelineContainer.querySelector('.timeline-line') as HTMLElement;

            if (originalLine && timelineItems.length > 0) {
              // Check if we're on mobile or desktop
              const isMobile = window.innerWidth < 768;

              // Use the original line but control its growth progressively
              if (isMobile) {
                originalLine.style.transform = 'scaleY(0)';
              } else {
                originalLine.style.transform = 'translateX(-50%) scaleY(0)';
              }
              originalLine.style.transformOrigin = 'top';
              originalLine.style.transition = 'none';

              // Calculate precise stopping points for each timeline item
              // Since timeline items are evenly spaced, we need to stop at the center of each item
              const getTargetScale = (segmentIndex: number) => {
                const totalItems = timelineItems.length;
                // Each item takes up 1/totalItems of the space
                // We want to stop at the center of each item
                const itemHeight = 1 / totalItems;
                const itemCenter = (segmentIndex * itemHeight) + (itemHeight / 2);
                return itemCenter;
              };

              // Create animated segments for each timeline item
              const animateSegment = (segmentIndex: number) => {
                if (segmentIndex >= timelineItems.length) return;

                const item = timelineItems[segmentIndex];
                const htmlItem = item as HTMLElement;
                const dot = item.querySelector('.timeline-dot') as HTMLElement;

                // Calculate the exact center position for this item
                const targetScale = getTargetScale(segmentIndex);

                // Start flowing this segment
                setTimeout(() => {
                  originalLine.style.transition = 'transform 1s ease-out';
                  if (isMobile) {
                    originalLine.style.transform = `scaleY(${targetScale})`;
                  } else {
                    originalLine.style.transform = `translateX(-50%) scaleY(${targetScale})`;
                  }

                  // When segment completes, reveal the card
                  setTimeout(() => {
                    // Pop up the timeline item
                    htmlItem.style.opacity = '1';
                    if (isMobile) {
                      htmlItem.style.transform = 'translateY(0)';
                    } else {
                      htmlItem.style.transform = 'translateX(0)';
                    }
                    htmlItem.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

                    // Animate the dot
                    if (dot) {
                      setTimeout(() => {
                        dot.style.transform = 'scale(1.4)';
                        dot.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

                        setTimeout(() => {
                          dot.style.transform = 'scale(1)';
                          dot.style.transition = 'transform 0.2s ease-out';
                        }, 150);
                      }, 100);
                    }

                    // After card is revealed, start the next segment or extend to end
                    setTimeout(() => {
                      if (segmentIndex + 1 < timelineItems.length) {
                        // Continue to next segment
                        animateSegment(segmentIndex + 1);
                      } else {
                        // This is the last item, extend line to the end
                        setTimeout(() => {
                          originalLine.style.transition = 'transform 0.8s ease-out';
                          if (isMobile) {
                            originalLine.style.transform = 'scaleY(1)';
                          } else {
                            originalLine.style.transform = 'translateX(-50%) scaleY(1)';
                          }
                        }, 400); // Wait a bit before extending to end
                      }
                    }, 800); // Wait 800ms before starting next segment

                  }, 1000); // Card appears 1s after segment starts flowing
                }, 100);
              };

              // Start the first segment
              animateSegment(0);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe timeline section
    const timelineSection = sectionRef.current;
    if (timelineSection) {
      timelineObserver.observe(timelineSection);
    }

    return () => {
      timelineObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-12 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: timelineStyles }} />

      {/* Floating background elements */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-200/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-teal-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-8 sm:right-12 md:right-20 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-navy/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-20 md:left-20 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-pink-200/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>

      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-navy mb-3 sm:mb-4 md:mb-6">
          Our Journey
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2 sm:px-4 md:px-0">
          From our humble beginnings in 2010 to becoming one of India's fastest-growing pharmaceutical companies,
          discover the milestones that shaped our commitment to healthcare excellence.
        </p>
        <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-teal to-navy mx-auto rounded-full"></div>
      </div>

      {/* Company Timeline */}
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Animated timeline line - Responsive positioning */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gray-200"></div>
          <div
            className="timeline-line absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-teal to-navy origin-top scale-y-0 transition-transform duration-2000 ease-out"
            style={{ height: '100%' }}
          ></div>

          <div className="space-y-8 md:space-y-12">
            {/* Timeline Item 1 - 2010 */}
            <div className="timeline-item flex items-center opacity-0 transform translate-y-8 md:translate-y-0 md:translate-x-8 transition-all duration-800 ease-out group cursor-pointer">
              {/* Mobile: Content on right, Desktop: Content on left */}
              <div className="flex-1 pl-12 md:pl-0 md:text-right md:pr-8 md:order-1">
                <div className="timeline-content bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 md:border-l-4 border-teal group-hover:border-navy">
                  <h4 className="text-lg md:text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">2010</h4>
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    <strong>Company Foundation</strong> - Opstean Healthcare came into existence, marking the beginning of our journey
                    at the forefront of pharmaceutical innovation in India.
                  </p>
                </div>
              </div>
              {/* Timeline dot - positioned absolutely for mobile, in flex for desktop */}
              <div className="timeline-dot absolute left-1 md:relative md:left-auto w-6 h-6 bg-teal rounded-full z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white md:order-2">
                <div className="absolute inset-0 bg-teal rounded-full animate-ping opacity-40"></div>
                <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
              </div>
              {/* Desktop: empty space on right */}
              <div className="hidden md:block flex-1 pl-8 md:order-3"></div>
            </div>

            {/* Timeline Item 2 - 2021 */}
            <div className="timeline-item flex items-center opacity-0 transform translate-y-8 md:translate-y-0 md:-translate-x-8 transition-all duration-800 ease-out group cursor-pointer" style={{ transitionDelay: '400ms' }}>
              {/* Desktop: empty space on left */}
              <div className="hidden md:block flex-1 pr-8 md:order-1"></div>
              {/* Timeline dot */}
              <div className="timeline-dot absolute left-1 md:relative md:left-auto w-6 h-6 bg-navy rounded-full z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white md:order-2" style={{ transitionDelay: '600ms' }}>
                <div className="absolute inset-0 bg-navy rounded-full animate-ping opacity-40"></div>
                <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
              </div>
              {/* Mobile: Content on right, Desktop: Content on right */}
              <div className="flex-1 pl-12 md:pl-8 md:text-left md:order-3">
                <div className="timeline-content bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 md:border-l-0 md:border-r-4 border-navy group-hover:border-teal">
                  <h4 className="text-lg md:text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">2021</h4>
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    <strong>Legal Corporation</strong> - Transformed into a legal corporation, strengthening our foundation
                    and expanding our capabilities to serve healthcare providers nationwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 - Coming Soon */}
            <div className="timeline-item flex items-center opacity-0 transform translate-y-8 md:translate-y-0 md:translate-x-8 transition-all duration-800 ease-out group cursor-pointer" style={{ transitionDelay: '800ms' }}>
              {/* Mobile: Content on right, Desktop: Content on left */}
              <div className="flex-1 pl-12 md:pl-0 md:text-right md:pr-8 md:order-1">
                <div className="timeline-content bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 md:border-l-4 border-teal group-hover:from-teal-50 group-hover:to-blue-50">
                  <h4 className="text-lg md:text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">Coming Soon</h4>
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    <strong>OPSTEAN LABORATORIES</strong> - Our new state-of-the-art manufacturing facility
                    will further enhance our production capabilities and quality standards.
                  </p>
                </div>
              </div>
              {/* Timeline dot */}
              <div className="timeline-dot absolute left-1 md:relative md:left-auto w-6 h-6 bg-gradient-to-r from-teal to-navy rounded-full z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white md:order-2" style={{ transitionDelay: '1000ms' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-teal to-navy rounded-full animate-pulse opacity-60"></div>
                <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              </div>
              {/* Desktop: empty space on right */}
              <div className="hidden md:block flex-1 pl-8 md:order-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
        <div className="bg-gradient-to-r from-navy to-teal rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-white shadow-xl">
          <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">Building the Future of Healthcare</h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-4 lg:mb-6 px-1 sm:px-2 lg:px-0">
            From our establishment in 2010 to our upcoming manufacturing facility, we continue to evolve
            and innovate, always keeping our commitment to quality healthcare at the forefront of everything we do.
          </p>
          <button
            className="bg-white text-navy px-4 sm:px-5 md:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg text-xs sm:text-sm md:text-sm lg:text-base hover:scale-105 active:scale-95 transform"
            onClick={() => {
              navigate('/about');
              // Scroll to top after navigation
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
          >
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyTimeline;

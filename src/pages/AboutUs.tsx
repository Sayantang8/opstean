import React, { useEffect, useRef } from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Add custom styles for timeline animations
    const timelineStyles = `
        .timeline-line {
            transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-item {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-dot {
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
        
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes dotPop {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    `;

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

        // Timeline animation observer
        const timelineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate the timeline line first
                        const timelineLine = entry.target.querySelector('.timeline-line') as HTMLElement;
                        if (timelineLine) {
                            timelineLine.style.transform = 'translateX(-50%) scaleY(1)';
                        }

                        // Then animate timeline items with staggered delays
                        const timelineItems = entry.target.querySelectorAll('.timeline-item');
                        timelineItems.forEach((item, index) => {
                            const htmlItem = item as HTMLElement;
                            setTimeout(() => {
                                htmlItem.style.opacity = '1';
                                htmlItem.style.transform = 'translateX(0)';

                                // Animate the dot
                                const dot = item.querySelector('.timeline-dot') as HTMLElement;
                                if (dot) {
                                    setTimeout(() => {
                                        dot.style.transform = 'scale(1)';
                                    }, 200);
                                }
                            }, index * 600); // 600ms delay between each item
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        // Observe all fade-in sections
        const fadeInElements = document.querySelectorAll('.fade-in-section');
        fadeInElements.forEach((element) => {
            observer.observe(element);
        });

        // Observe timeline section
        const timelineSection = document.querySelector('.mt-20:has(.timeline-line)');
        if (timelineSection) {
            timelineObserver.observe(timelineSection);
        }

        // Fallback: Make all elements visible after a short delay
        const fallbackTimer = setTimeout(() => {
            fadeInElements.forEach((element) => {
                element.classList.add('is-visible');
            });
        }, 500);

        return () => {
            observer.disconnect();
            timelineObserver.disconnect();
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <style dangerouslySetInnerHTML={{ __html: timelineStyles }} />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">About Us</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Leading the way in pharmaceutical excellence since 2010
                        </p>
                        {/* Key Highlights Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div
                                className="relative rounded-xl p-6 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                                        <span className="text-xl">🏥</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue-800 transition-colors duration-300">Healthcare Excellence</h3>
                                <p className="text-blue-700 text-sm group-hover:text-navy transition-colors duration-300">
                                    Quality medicines accessible to everyone
                                </p>
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                            </div>

                            <div
                                className="relative rounded-xl p-6 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
                                        <span className="text-xl">🚀</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue-800 transition-colors duration-300">Fastest Growing</h3>
                                <p className="text-blue-700 text-sm group-hover:text-navy transition-colors duration-300">
                                    One of India's fastest-growing pharma company
                                </p>
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                            </div>

                            <div
                                className="relative rounded-xl p-6 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                                        <span className="text-xl">💊</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue-800 transition-colors duration-300">Trusted Partner</h3>
                                <p className="text-blue-700 text-sm group-hover:text-navy transition-colors duration-300">
                                    India's most trusted pharmaceutical partner
                                </p>
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20 bg-white" ref={sectionRef}>
                <div className="container mx-auto px-6">


                    {/* Why We Are The Best Section */}
                    <div className="mt-20 mb-12">
                        <div
                            className="relative rounded-xl p-12 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group w-full"
                            style={{ backgroundColor: '#b3e7ff' }}
                        >
                            <h3 className="text-3xl font-bold text-navy mb-8 group-hover:text-blue-800 transition-colors duration-300">Why Are We the Best in India?</h3>
                            <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: '#007ab3' }}></div>

                            <p className="text-blue-700 leading-relaxed text-lg mb-8 group-hover:text-navy transition-colors duration-300">
                                Opstean Healthcare Pvt. Ltd. is one of the leading Pharma company in India. We are popular in the segment for our world class high quality medicines. Our aim is to provide best medicines to our customers at an affordable price with uncompromising quality.
                            </p>
                            <p className="text-blue-700 leading-relaxed text-lg group-hover:text-navy transition-colors duration-300">
                                We offer high quality medicines to our clients which are made with superior quality ingredients which are free from any side effects. Every single product that rolls out of Opstean Healthcare Pvt. Ltd. is made under the supervision of medical experts. We have a well-qualified and knowledgeable team of professionals for each department in our organization.
                            </p>

                            {/* Animated border effect */}
                            <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>

                            {/* Floating particles effect */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                        </div>
                    </div>

                    {/* Company Values Section */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-bold text-navy text-center mb-12">Our Core Values</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div
                                className="relative rounded-xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 group-hover:bg-white transition-all duration-300">
                                        <Award className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors duration-300">Quality First</h4>
                                <p className="text-blue-700 leading-relaxed group-hover:text-navy transition-colors duration-300">
                                    We never compromise on quality and ensure every product meets the highest standards.
                                </p>
                                {/* Animated border effect */}
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                                {/* Floating particles effect */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                            </div>
                            <div
                                className="relative rounded-xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 group-hover:bg-white transition-all duration-300">
                                        <Target className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors duration-300">Innovation</h4>
                                <p className="text-blue-700 leading-relaxed group-hover:text-navy transition-colors duration-300">
                                    Continuously developing new high-tech products to meet customer needs.
                                </p>
                                {/* Animated border effect */}
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                                {/* Floating particles effect */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                            </div>
                            <div
                                className="relative rounded-xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                                style={{ backgroundColor: '#b3e7ff' }}
                            >
                                <div className="flex justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 group-hover:bg-white transition-all duration-300">
                                        <Heart className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-navy mb-4 group-hover:text-blue-800 transition-colors duration-300">Customer Focus</h4>
                                <p className="text-blue-700 leading-relaxed group-hover:text-navy transition-colors duration-300">
                                    Dedicated to complete customer satisfaction with prompt and high-value services.
                                </p>
                                {/* Animated border effect */}
                                <div className="absolute inset-0 rounded-xl border-2 border-blue-200/50 group-hover:border-blue-300/70 transition-all duration-300"></div>
                                {/* Floating particles effect */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Company Timeline */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-bold text-navy text-center mb-12">Our Journey</h3>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Animated timeline line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
                                <div
                                    className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal to-navy origin-top scale-y-0 transition-transform duration-2000 ease-out"
                                    style={{ height: '100%' }}
                                ></div>

                                <div className="space-y-12">
                                    {/* Timeline Item 1 - 2010 */}
                                    <div className="timeline-item flex items-center opacity-0 transform translate-x-8 transition-all duration-800 ease-out group cursor-pointer">
                                        <div className="flex-1 text-right pr-8">
                                            <div className="timeline-content bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-teal group-hover:border-navy">
                                                <h4 className="text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">2010</h4>
                                                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Company establishment and initial operations</p>
                                            </div>
                                        </div>
                                        <div className="timeline-dot w-6 h-6 bg-teal rounded-full relative z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white">
                                            <div className="absolute inset-0 bg-teal rounded-full animate-ping opacity-40"></div>
                                            <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                                        </div>
                                        <div className="flex-1 pl-8"></div>
                                    </div>

                                    {/* Timeline Item 2 - 2021 */}
                                    <div className="timeline-item flex items-center opacity-0 transform -translate-x-8 transition-all duration-800 ease-out group cursor-pointer" style={{ transitionDelay: '400ms' }}>
                                        <div className="flex-1 pr-8"></div>
                                        <div className="timeline-dot w-6 h-6 bg-navy rounded-full relative z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white" style={{ transitionDelay: '600ms' }}>
                                            <div className="absolute inset-0 bg-navy rounded-full animate-ping opacity-40"></div>
                                            <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                                        </div>
                                        <div className="flex-1 text-left pl-8">
                                            <div className="timeline-content bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-r-4 border-navy group-hover:border-teal">
                                                <h4 className="text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">2021</h4>
                                                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Formed into a legal corporation</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Item 3 - Coming Soon */}
                                    <div className="timeline-item flex items-center opacity-0 transform translate-x-8 transition-all duration-800 ease-out group cursor-pointer" style={{ transitionDelay: '800ms' }}>
                                        <div className="flex-1 text-right pr-8">
                                            <div className="timeline-content bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-gradient-to-r border-teal group-hover:from-teal-50 group-hover:to-blue-50">
                                                <h4 className="text-xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors duration-300">Coming Soon</h4>
                                                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">New manufacturing facility '<strong style={{ color: '#008fb3' }}>OPSTEAN LABORATORIES</strong>'</p>
                                            </div>
                                        </div>
                                        <div className="timeline-dot w-6 h-6 bg-gradient-to-r from-teal to-navy rounded-full relative z-10 transform scale-0 transition-all duration-500 ease-out shadow-lg hover:scale-125 border-4 border-white" style={{ transitionDelay: '1000ms' }}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-teal to-navy rounded-full animate-pulse opacity-60"></div>
                                            <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
                                        </div>
                                        <div className="flex-1 pl-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Commitment Section */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-bold text-navy text-center mb-12">Our Commitment to Excellence</h3>
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h4 className="text-2xl font-semibold text-navy mb-6">Quality Assurance</h4>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        Every product that bears the Opstean name undergoes rigorous quality testing and meets international standards. Our manufacturer's WHO and CGMP certifications ensure that we maintain the highest levels of pharmaceutical excellence.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        We work exclusively with certified manufacturers across India, ensuring that our supply chain maintains the same commitment to quality that defines our brand.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
                                    <div className="grid grid-cols-2 gap-6 text-center">
                                        <div>
                                            <div className="text-3xl font-bold text-navy mb-2">84+</div>
                                            <div className="text-sm text-gray-600">Products</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-navy mb-2">13+</div>
                                            <div className="text-sm text-gray-600">Therapeutic Areas</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-navy mb-2">15+</div>
                                            <div className="text-sm text-gray-600">Years Experience</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-navy mb-2">100%</div>
                                            <div className="text-sm text-gray-600">Quality Assured</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future Vision Section */}
                    <div className="mt-20 mb-20">
                        <div className="bg-gradient-to-r from-navy to-teal rounded-2xl p-12 text-white text-center">
                            <h3 className="text-3xl font-bold mb-6">Looking Towards the Future</h3>
                            <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
                                As we prepare to launch our new manufacturing facility 'OPSTEAN LABORATORIES' soon, we remain committed to our founding principles while embracing innovation and growth. Our vision is to become India's most trusted pharmaceutical partner, serving healthcare providers and patients with unwavering dedication.
                            </p>
                            <div className="flex flex-wrap justify-center gap-8 text-lg">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Advanced Manufacturing</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Expanded Product Range</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Enhanced Quality Standards</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
import React, { useEffect, useRef } from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
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

        // Observe all fade-in sections
        const fadeInElements = document.querySelectorAll('.fade-in-section');
        fadeInElements.forEach((element) => {
            observer.observe(element);
        });

        // Fallback: Make all elements visible after a short delay
        const fallbackTimer = setTimeout(() => {
            fadeInElements.forEach((element) => {
                element.classList.add('is-visible');
            });
        }, 500);

        return () => {
            observer.disconnect();
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">About Opstean Healthcare</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Leading the way in pharmaceutical excellence since 2010
                        </p>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                At Opstean Healthcare, we believe that quality healthcare should be accessible to everyone. Our journey began with a simple yet powerful vision: to become India's most trusted pharmaceutical company by delivering world-class medicines that improve lives and bring hope to millions.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                From our humble beginnings in Kolkata to our ambitious plans for expansion, we have remained committed to innovation, quality, and the unwavering belief that every life matters. Today, we stand proud as one of India's fastest-growing pharmaceutical companies, touching lives across the nation.
                            </p>
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
                                Opstean Healthcare Pvt. Ltd. is the leading and best Pharmaceuticals company. We are popular in the segment for our world class high quality medicines. Our aim is to provide best medicines to our customers at an affordable price with uncompromising quality.
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
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal"></div>

                                <div className="space-y-12">
                                    <div className="flex items-center">
                                        <div className="flex-1 text-right pr-8">
                                            <h4 className="text-xl font-semibold text-navy">2010</h4>
                                            <p className="text-gray-600">Company establishment and initial operations</p>
                                        </div>
                                        <div className="w-4 h-4 bg-teal rounded-full relative z-10"></div>
                                        <div className="flex-1 pl-8"></div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-1 pr-8"></div>
                                        <div className="w-4 h-4 bg-navy rounded-full relative z-10"></div>
                                        <div className="flex-1 text-left pl-8">
                                            <h4 className="text-xl font-semibold text-navy">2021</h4>
                                            <p className="text-gray-600">Formed into a legal corporation</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-1 text-right pr-8">
                                            <h4 className="text-xl font-semibold text-navy">Coming Soon</h4>
                                            <p className="text-gray-600">New manufacturing facility 'OPSTEAN LABORATORIES'</p>
                                        </div>
                                        <div className="w-4 h-4 bg-teal rounded-full relative z-10"></div>
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
                                            <div className="text-3xl font-bold text-navy mb-2">85+</div>
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
                                As we prepare to launch our new manufacturing facility 'OPSTEAN LABORATORIES', we remain committed to our founding principles while embracing innovation and growth. Our vision is to become India's most trusted pharmaceutical partner, serving healthcare providers and patients with unwavering dedication.
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
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Users } from 'lucide-react';

// Animated Counter Component with Circular Progress
const StatCard = ({ number, label, suffix = '', color }: {
  number: number;
  label: string;
  suffix?: string;
  color: string;
}) => {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const animateCounter = useCallback(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = number / steps;
    const stepDuration = duration / steps;

    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= number) {
        currentCount = number;
        clearInterval(timer);
      }
      setCount(Math.floor(currentCount));
      setProgress((currentCount / number) * 100);
    }, stepDuration);
  }, [number, setCount, setProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [animateCounter, isVisible]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={cardRef}
      className="rounded-xl p-8 shadow-lg text-center hover-lift transform transition-all duration-300"
      style={{ backgroundColor: '#b3e7ff' }}
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Background Circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#00aeff"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Counter Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: '#007ab3' }}>
            {count}{suffix}
          </span>
        </div>
      </div>

      <h4 className="text-lg font-semibold mb-2" style={{ color: '#007ab3' }}>{label}</h4>
      <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#007ab3' }}></div>
    </div>
  );
};

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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
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
        <img src="/public/quality.jpg" alt="Experienced Team" className="w-16 h-16 object-cover rounded-full" />
      )
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fade-in-section">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">About Opstean Healthcare Pvt. Ltd.</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Opstean Healthcare Pvt. Ltd. is one of the most trusted pharmaceutical companies, marketing a wide range of drugs including Ortho, Gyno, Cardio, Derma, Gastro, Cold Management, Antibiotic, Pain Management and General Segment.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We are Kolkata based one of the fast growing pharmaceutical company in India. We came into existence in 2010, and in 2021, the company was formed into a legal corporation. We are going to start our new manufacturing facility 'OPSTEAN LABORATORIES' very soon.
            </p>

            {/* Minimal Leadership Team Section */}
            <div className="bg-gray-50 rounded-lg p-3 mb-6 border-l-2 border-teal">
              <h3 className="text-base font-semibold text-navy mb-1 flex items-center">
                <Users className="w-4 h-4 text-teal mr-2" />
                Leadership Team
              </h3>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Directors:</span> Mr. Pintu Goswami, Mrs. Mahuya Goswami, Mrs. Nivedita Goswami
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              'OPSTEAN' means 'RISE' in Frisian language. We are focused on our customer's need and necessities, it has resulted into new high-tech products and we are known to give prompt & high value services to our customers. Opstean Healthcare Pvt. Ltd. is committed to achieve and maintain excellence in our products and for the complete satisfaction of our customers.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
              alt="Opstean Healthcare Facility"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-navy text-center mb-8">Why Are We the Best in India?</h3>
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Opstean Healthcare Pvt. Ltd. is the leading and best Pharmaceuticals company. We are popular in the segment for our world class high quality medicines. Our aim is to provide best medicines to our customers at an affordable price with uncompromising quality. We offer high quality medicines to our clients which are made with superior quality ingredients which are free from any side effects. Every single product that rolls out of Opstean Healthcare Pvt. Ltd. is made under the supervision of medical experts. We have a well- qualified and knowledgeable team of professionals for each department in our organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((card, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="relative rounded-xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl fade-in-section group"
              style={{ backgroundColor: '#b3e7ff', animationDelay: `${0.2 * index}s` }}
            >
                             <div className="flex justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                 <div className="rounded-full overflow-hidden">
                   {card.icon}
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
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy text-center mb-8">Our Vision & Mission</h3>
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-gray-700 text-center text-lg leading-relaxed">
              <strong>Vision & Mission:</strong> To establish Opstean Healthcare Pvt. Ltd. as the Pharmaceutical and Pharmaceutical Impurity Company, recognized as the leader in this field by one and all.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy text-center mb-12">
          We Rise in Glory...</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              number={250}
              label="Field of Expertise"
              suffix="+"
              color="teal"
            />
            <StatCard
              number={15}
              label="Years of Experience"
              suffix="+"
              color="blue"
            />
            <StatCard
              number={83}
              label="Products"
              suffix="+"
              color="purple"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

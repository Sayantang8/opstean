import { useEffect, useRef, useState } from 'react';
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
  }, [isVisible]);

  const animateCounter = () => {
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
  };

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl p-8 shadow-lg text-center hover-lift transform transition-all duration-300"
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Background Circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#2D8B9D"
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
          <span className="text-3xl font-bold text-navy">
            {count}{suffix}
          </span>
        </div>
      </div>

      <h4 className="text-lg font-semibold text-navy mb-2">{label}</h4>
      <div className="w-16 h-1 bg-gradient-to-r from-teal to-navy mx-auto rounded-full"></div>
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
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const featureCards = [
    {
      title: 'Certified (WHO, CGMP)',
      description: 'We are collaborated with top manufacturers of India with WHO, CGMP certificate',
      icon: (
        <svg className="w-12 h-12 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Experienced Team',
      description: 'We have experienced and knowledgeable professional.',
      icon: (
        <svg className="w-12 h-12 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Technology Driven',
      description: 'We are technology driven company.',
      icon: (
        <svg className="w-12 h-12 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Quality Maintain',
      description: 'Our strong policies reflects in product quality.',
      icon: (
        <svg className="w-12 h-12 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
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
              className="bg-white rounded-lg p-8 shadow-lg text-center hover-lift fade-in-section"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
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
          <h3 className="text-2xl font-bold text-navy text-center mb-12">Our Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              number={115}
              label="Field of Expertise"
              suffix="+"
              color="teal"
            />
            <StatCard
              number={15}
              label="Years of Excellence"
              suffix="+"
              color="blue"
            />
            <StatCard
              number={120}
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

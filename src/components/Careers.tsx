import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobsQuery } from '@/hooks/useJobsQuery';

const Careers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { data: jobs = [] } = useJobsQuery();
  
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
    
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Competitive Packages",
      description: "Industry-leading salaries and comprehensive benefits"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Opportunities",
      description: "Clear career progression paths and skill development"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Environment",
      description: "Work with passionate professionals making a difference"
    }
  ];
  
  return (
    <section 
      id="careers" 
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6">
        <div className="text-center fade-in-section mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Be part of a team that's making a difference in global healthcare. We offer exciting career opportunities with competitive packages and growth potential.
          </p>
          {jobs.length > 0 && (
            <p className="text-teal font-semibold">
              {jobs.length} position{jobs.length > 1 ? 's' : ''} currently available
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="text-center hover-lift fade-in-section transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="text-teal mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center fade-in-section">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-teal to-navy text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Career Journey?</h3>
              <p className="text-lg mb-6 opacity-90">
                {jobs.length > 0 
                  ? `Explore our ${jobs.length} current job opening${jobs.length > 1 ? 's' : ''} and find the perfect opportunity to grow with us.`
                  : 'Stay tuned for exciting career opportunities to grow with us.'
                }
              </p>
              <Link to="/careers">
                <Button 
                  size="lg"
                  className="bg-white text-navy hover:bg-gray-100 transition-all duration-300 btn-hover-effect flex items-center gap-2 mx-auto"
                >
                  {jobs.length > 0 ? 'View Current Openings' : 'Learn More About Careers'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Careers;

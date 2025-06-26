
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { useJobsQuery, Job } from '@/hooks/useJobsQuery';
import { JobCard } from '@/components/careers/JobCard';
import { JobDetailsDialog } from '@/components/careers/JobDetailsDialog';
import { GeneralApplicationForm } from '@/components/careers/GeneralApplicationForm';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isGeneralApplicationOpen, setIsGeneralApplicationOpen] = useState(false);
  
  const { data: jobs = [], isLoading, error } = useJobsQuery();

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <section className="py-16 bg-gradient-to-br from-navy to-teal text-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Join Our Team
            </h1>
            <p className="text-xl max-w-3xl mx-auto animate-slide-up">
              Explore exciting career opportunities with Opstean Healthcare and be part of a team that's making a difference in global healthcare.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Current Openings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer competitive packages, growth opportunities, and a collaborative work environment.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Loading job openings...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error loading job openings. Please try again later.</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No job openings available at the moment.</p>
                <p className="text-gray-400">Please check back later for new opportunities.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <JobCard job={job} onViewDetails={handleViewJobDetails} />
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-16">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-navy mb-4">Don't see the right position?</h3>
                  <p className="text-gray-700 mb-6">
                    We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
                  </p>
                  <Button 
                    onClick={() => setIsGeneralApplicationOpen(true)}
                    className="bg-navy hover:bg-teal text-white px-8 py-3 transition-all duration-300 btn-hover-effect"
                  >
                    Send General Application
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <JobDetailsDialog
        job={selectedJob}
        isOpen={isJobDialogOpen}
        onOpenChange={setIsJobDialogOpen}
      />

      <GeneralApplicationForm
        isOpen={isGeneralApplicationOpen}
        onOpenChange={setIsGeneralApplicationOpen}
      />

      <Footer />
    </div>
  );
};

export default CareersPage;

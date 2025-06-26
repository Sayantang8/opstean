
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Job } from '@/hooks/useJobsQuery';
import { JobApplicationForm } from './JobApplicationForm';

interface JobDetailsDialogProps {
  job: Job | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({
  job,
  isOpen,
  onOpenChange
}) => {
  if (!job) return null;

  const parseListItems = (text?: string) => {
    if (!text) return [];
    return text.split('\n').filter(item => item.trim().length > 0);
  };

  const requirements = parseListItems(job.requirements);
  const benefits = parseListItems(job.benefits);

  const handleApplicationSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-navy">{job.title}</DialogTitle>
        </DialogHeader>
        
        <CardContent className="pt-6 animate-slide-down">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-navy mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {benefits.length > 0 && (
              <div>
                <h4 className="font-semibold text-navy mb-3">Benefits:</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-navy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Apply for this position
            </h4>
            <JobApplicationForm 
              jobId={job.id}
              jobTitle={job.title}
              onSubmit={handleApplicationSubmit}
            />
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

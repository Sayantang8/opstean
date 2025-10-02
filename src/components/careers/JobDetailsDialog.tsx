
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Job } from '@/hooks/useJobsQuery';
import { JobApplicationForm } from './JobApplicationForm';
import { formatExperienceLevel } from '@/utils/experienceLevel';

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
          {/* Job Description */}
          {job.description && (
            <div className="mb-6">
              <h4 className="font-semibold text-navy mb-3">Job Description</h4>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          )}

          {/* Job Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-navy border-b pb-1">Location Details</h4>
              <div>
                <span className="text-sm font-medium text-gray-600">Job Location:</span>
                <p className="text-sm text-gray-800">{job.location || 'Remote'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Head Quarter:</span>
                <p className="text-sm text-gray-800">{job.head_quarter || 'Not specified'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-navy border-b pb-1">Requirements</h4>
              <div>
                <span className="text-sm font-medium text-gray-600">Experience Level:</span>
                <p className="text-sm text-gray-800">{formatExperienceLevel(job.experience_level)}</p>
              </div>

              {job.age_limit_max && job.age_limit_max > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Maximum Age Limit:</span>
                  <p className="text-sm text-gray-800">{job.age_limit_max} years</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-navy border-b pb-1">Application Details</h4>
              <div>
                <span className="text-sm font-medium text-gray-600">Minimum Gross Salary:</span>
                <p className="text-sm text-gray-800">
                  {job.salary_min && job.salary_min > 0 ? `₹${job.salary_min.toLocaleString()}` : 'Not specified'}
                </p>
              </div>
              {job.apply_before && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Apply Before:</span>
                  <p className="text-sm font-medium text-red-600">
                    {new Date(job.apply_before).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-navy mb-3">Detailed Requirements:</h4>
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
                <h4 className="font-semibold text-navy mb-3">Benefits & Perks:</h4>
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

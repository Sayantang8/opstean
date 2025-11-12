
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/hooks/useJobsQuery';
import { formatExperienceLevel } from '@/utils/experienceLevel';
import { formatDateWithOrdinal } from '@/utils/dateFormat';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `$${min.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  return (
    <Card className="hover-lift transition-all duration-300 hover:shadow-xl border-l-4 border-l-teal">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-navy mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={job.is_active ? 'default' : 'secondary'}>
                {job.is_active ? 'Active' : 'Inactive'}
              </Badge>
              <span className="text-sm text-gray-500">
                Posted: {job.created_at ? formatDateWithOrdinal(job.created_at) : 'Recently'}
              </span>
            </div>
          </div>
          <Button
            onClick={() => onViewDetails(job)}
            className="bg-teal hover:bg-navy text-white transition-all duration-300"
          >
            View Details & Apply
          </Button>
        </div>

        {/* Job Description */}
        {job.description && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
          </div>
        )}

        {/* Job Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 border-b pb-1">Location Details</h4>
            <div>
              <span className="text-sm font-medium text-gray-600">Head Quarter:</span>
              <p className="text-sm text-gray-800">{job.head_quarter || 'Not specified'}</p>
            </div>
            {job.division && (
              <div>
                <span className="text-sm font-medium text-gray-600">Division:</span>
                <p className="text-sm text-gray-800">{job.division}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 border-b pb-1">Requirements</h4>
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
            <h4 className="font-semibold text-gray-900 border-b pb-1">Application Details</h4>
            <div>
              <span className="text-sm font-medium text-gray-600">Minimum Gross Salary:</span>
              <p className="text-sm text-gray-800">
                {job.salary_min && job.salary_min > 0 ? `₹${job.salary_min.toLocaleString()}` : 'Not specified'}
              </p>
            </div>
            {job.apply_before && (() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const deadline = new Date(job.apply_before);
              deadline.setHours(23, 59, 59, 999);
              const diffTime = deadline.getTime() - today.getTime();
              const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <div>
                  <span className="text-sm font-medium text-gray-600">Apply Before:</span>
                  <p className="text-sm font-medium text-red-600">
                    {new Date(job.apply_before).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  {daysRemaining <= 7 && daysRemaining > 0 && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      {daysRemaining === 1 ? 'Last day!' : `${daysRemaining} days left`}
                    </Badge>
                  )}
                  {daysRemaining === 0 && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      Deadline today!
                    </Badge>
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Requirements Section */}
        {job.requirements && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Job Requirements</h4>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
          </div>
        )}

        {/* Benefits Section */}
        {job.benefits && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Benefits & Perks</h4>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{job.benefits}</p>
          </div>
        )}

        {/* Job Status Footer */}
        <div className="border-t pt-3 mt-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Job ID: {job.id}</span>
            <span>Status: {job.is_active ? 'Currently accepting applications' : 'Not accepting applications'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

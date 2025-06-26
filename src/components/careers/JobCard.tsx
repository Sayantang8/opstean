
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Job } from '@/hooks/useJobsQuery';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    if (min) return `₹${min.toLocaleString()}+`;
    return `Up to ₹${max?.toLocaleString()}`;
  };

  return (
    <Card className="hover-lift transition-all duration-300 hover:shadow-xl border-l-4 border-l-teal">
      <CardHeader>
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <CardTitle className="text-xl text-navy mb-2">{job.title}</CardTitle>
            <CardDescription className="text-gray-600 mb-3">
              {job.description || 'Join our team and make a difference in healthcare.'}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mb-3">
              {job.location && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </Badge>
              )}
              {job.experience_level && (
                <Badge variant="secondary" className="flex items-center gap-1 capitalize">
                  <Users className="w-3 h-3" />
                  {job.experience_level} Level
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Full-time
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {formatSalary(job.salary_min, job.salary_max)}
              </Badge>
            </div>
          </div>
          <Button 
            onClick={() => onViewDetails(job)}
            className="bg-teal hover:bg-navy text-white transition-all duration-300"
          >
            View Details & Apply
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

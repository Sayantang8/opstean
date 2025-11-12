
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export interface Job {
  id: number;
  title: string;
  description?: string;
  location?: string;
  head_quarter?: string;
  division?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  age_limit_min?: number;
  age_limit_max?: number;
  apply_before?: string;
  requirements?: string;
  benefits?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useJobsQuery = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('title', { ascending: true });

      if (error) {
        logger.error('Error fetching jobs', error, { component: 'useJobsQuery' });
        throw error;
      }

      // Filter out jobs where apply_before date has passed
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      const activeJobs = (data as Job[]).filter(job => {
        // If no apply_before date is set, keep the job visible
        if (!job.apply_before) {
          return true;
        }

        // Parse the apply_before date and compare with today
        const applyBeforeDate = new Date(job.apply_before);
        applyBeforeDate.setHours(23, 59, 59, 999); // Set to end of day

        // Keep job visible if apply_before date is today or in the future
        return applyBeforeDate >= today;
      });

      return activeJobs;
    }
  });
};

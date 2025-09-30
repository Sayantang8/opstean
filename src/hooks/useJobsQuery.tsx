
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export interface Job {
  id: number;
  title: string;
  description?: string;
  location?: string;
  head_quarter?: string;
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

      return data as Job[];
    }
  });
};

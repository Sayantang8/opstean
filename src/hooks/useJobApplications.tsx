
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface JobApplication {
  id: string;
  job_id: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  date_of_birth?: string;
  years_of_experience?: string;
  cover_letter?: string;
  resume_file_name?: string;
  resume_file_data?: string;
  application_status: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  experience: string;
  coverLetter: string;
  resume: File | null;
}

export const useJobApplications = () => {
  return useQuery({
    queryKey: ['job_applications'],
    queryFn: async () => {
      console.log('🔧 Fetching job applications from Supabase...');

      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          jobs!inner(title, location)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching job applications:', error);
        throw error;
      }

      console.log('✅ Job applications fetched:', data);
      return data;
    }
  });
};

export const useSubmitJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, applicationData }: { jobId: number; applicationData: JobApplicationData }) => {
      console.log('📝 Submitting job application...');

      // Convert file to base64 if present
      let resumeData = null;
      let resumeFileName = null;

      if (applicationData.resume) {
        resumeFileName = applicationData.resume.name;
        const arrayBuffer = await applicationData.resume.arrayBuffer();

        // Use a more efficient method to convert to base64
        const uint8Array = new Uint8Array(arrayBuffer);
        let binaryString = '';
        const chunkSize = 0x8000; // 32KB chunks to avoid stack overflow

        for (let i = 0; i < uint8Array.length; i += chunkSize) {
          const chunk = uint8Array.slice(i, i + chunkSize);
          binaryString += String.fromCharCode.apply(null, Array.from(chunk));
        }

        resumeData = btoa(binaryString);
      }

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          applicant_name: applicationData.name,
          applicant_email: applicationData.email,
          applicant_phone: applicationData.phone,
          date_of_birth: applicationData.dateOfBirth ? applicationData.dateOfBirth.toISOString().split('T')[0] : null,
          years_of_experience: applicationData.experience,
          cover_letter: applicationData.coverLetter,
          resume_file_name: resumeFileName,
          resume_file_data: resumeData,
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error submitting application:', error);
        throw error;
      }

      console.log('✅ Application submitted successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job_applications'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      console.log('🔄 Updating job application status...', { applicationId, status });

      const { data, error } = await supabase
        .from('job_applications')
        .update({
          application_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating job application status:', error);
        throw error;
      }

      console.log('✅ Job application status updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      console.log('🎉 Invalidating queries after successful job application status update');
      queryClient.invalidateQueries({ queryKey: ['job_applications'] });
    },
    onError: (error) => {
      console.error('💥 Failed to update job application status:', error);
    },
  });
};

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationId: string) => {
      console.log('🗑️ Deleting job application...', { applicationId });

      const { data, error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error deleting job application:', error);
        throw error;
      }

      console.log('✅ Job application deleted successfully:', data);
      return data;
    },
    onSuccess: () => {
      console.log('🎉 Invalidating queries after successful job application deletion');
      queryClient.invalidateQueries({ queryKey: ['job_applications'] });
    },
    onError: (error) => {
      console.error('💥 Failed to delete job application:', error);
    },
  });
};

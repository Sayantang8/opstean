
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GeneralApplication {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  job_title?: string;
  years_of_experience?: string;
  cover_letter?: string;
  resume_file_name?: string;
  resume_file_data?: string;
  application_status: string;
  created_at: string;
  updated_at: string;
}

export interface GeneralApplicationData {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
}

export const useGeneralApplications = () => {
  return useQuery({
    queryKey: ['general_applications'],
    queryFn: async () => {
      console.log('🔧 Fetching general applications from Supabase...');
      
      const { data, error } = await supabase
        .from('general_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching general applications:', error);
        throw error;
      }

      console.log('✅ General applications fetched:', data);
      return data;
    }
  });
};

export const useSubmitGeneralApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData: GeneralApplicationData) => {
      console.log('📝 Starting general application submission...');
      console.log('📝 Application data received:', applicationData);

      try {
        // Convert file to base64 if present
        let resumeData = null;
        let resumeFileName = null;
        
        if (applicationData.resume) {
          console.log('📄 Processing resume file:', applicationData.resume.name);
          resumeFileName = applicationData.resume.name;
          
          try {
            // Use FileReader for more reliable base64 conversion
            const base64String = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
                const base64Data = result.split(',')[1];
                resolve(base64Data);
              };
              reader.onerror = () => reject(new Error('Failed to read file'));
              reader.readAsDataURL(applicationData.resume!);
            });
            
            resumeData = base64String;
            console.log('✅ Resume converted to base64 successfully');
          } catch (fileError) {
            console.error('❌ Error converting file to base64:', fileError);
            throw new Error('Failed to process resume file');
          }
        }

        const submissionData = {
          applicant_name: applicationData.name,
          applicant_email: applicationData.email,
          applicant_phone: applicationData.phone,
          job_title: applicationData.jobTitle,
          years_of_experience: applicationData.experience,
          cover_letter: applicationData.coverLetter,
          resume_file_name: resumeFileName,
          resume_file_data: resumeData,
        };

        console.log('📤 Submitting data to Supabase:', {
          ...submissionData,
          resume_file_data: resumeData ? '[BASE64_DATA]' : null
        });

        const { data, error } = await supabase
          .from('general_applications')
          .insert(submissionData)
          .select()
          .single();

        if (error) {
          console.error('❌ Supabase error details:', error);
          throw new Error(`Submission failed: ${error.message}`);
        }

        console.log('✅ General application submitted successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ General application submission error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('🎉 Application submission completed successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['general_applications'] });
    },
    onError: (error) => {
      console.error('💥 Application submission failed:', error);
    },
  });
};

export const useUpdateGeneralApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      console.log('🔄 Updating general application status...', { applicationId, status });

      const { data, error } = await supabase
        .from('general_applications')
        .update({ 
          application_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating general application status:', error);
        throw error;
      }

      console.log('✅ General application status updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      console.log('🎉 Invalidating queries after successful status update');
      queryClient.invalidateQueries({ queryKey: ['general_applications'] });
    },
    onError: (error) => {
      console.error('💥 Failed to update general application status:', error);
    },
  });
};


-- Create job_applications table to store submitted applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id BIGINT NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  years_of_experience TEXT,
  cover_letter TEXT,
  resume_file_name TEXT,
  resume_file_data BYTEA,
  application_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for job applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert applications (public job application)
CREATE POLICY "Anyone can submit job applications" 
  ON public.job_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow viewing applications (you can modify this based on your admin requirements)
CREATE POLICY "Public read access to job applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (true);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- Create a table for general applications (not tied to specific job postings)
CREATE TABLE public.general_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  years_of_experience TEXT,
  cover_letter TEXT,
  resume_file_name TEXT,
  resume_file_data TEXT,
  application_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for general applications
ALTER TABLE public.general_applications ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert general applications (public application)
CREATE POLICY "Anyone can submit general applications" 
  ON public.general_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow viewing general applications (for admin access)
CREATE POLICY "Public read access to general applications" 
  ON public.general_applications 
  FOR SELECT 
  USING (true);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_general_applications_updated_at
  BEFORE UPDATE ON public.general_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create notification trigger for general applications
CREATE OR REPLACE FUNCTION create_general_application_notification()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert notification for admins
    INSERT INTO notifications (
        title,
        message,
        type,
        user_id
    )
    SELECT 
        'New General Application',
        'New general application received from ' || NEW.applicant_name,
        'info',
        p.id
    FROM profiles p 
    WHERE p.role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for general applications
CREATE TRIGGER general_application_notification_trigger
    AFTER INSERT ON general_applications
    FOR EACH ROW
    EXECUTE FUNCTION create_general_application_notification();

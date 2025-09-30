-- Add date_of_birth column to general_applications table
ALTER TABLE general_applications 
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add date_of_birth column to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add comments for documentation
COMMENT ON COLUMN general_applications.date_of_birth IS 'Applicant date of birth';
COMMENT ON COLUMN job_applications.date_of_birth IS 'Applicant date of birth';
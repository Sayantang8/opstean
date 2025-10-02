-- Add new fields to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS religion TEXT,
ADD COLUMN IF NOT EXISTS current_company TEXT;

-- Add comments for documentation
COMMENT ON COLUMN job_applications.gender IS 'Applicant gender';
COMMENT ON COLUMN job_applications.religion IS 'Applicant religion';
COMMENT ON COLUMN job_applications.current_company IS 'Applicant current company name';
-- Add apply_before column to jobs table
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS apply_before DATE;

-- Add comment for documentation
COMMENT ON COLUMN jobs.apply_before IS 'Application deadline date for the job posting';
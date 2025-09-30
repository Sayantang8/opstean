-- Add new columns to jobs table
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS head_quarter TEXT,
ADD COLUMN IF NOT EXISTS age_limit_min INTEGER,
ADD COLUMN IF NOT EXISTS age_limit_max INTEGER;

-- Add comments for documentation
COMMENT ON COLUMN jobs.head_quarter IS 'Job headquarters/office location';
COMMENT ON COLUMN jobs.age_limit_min IS 'Minimum age requirement for the job';
COMMENT ON COLUMN jobs.age_limit_max IS 'Maximum age requirement for the job';
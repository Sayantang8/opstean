-- Add division column to jobs table
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS division TEXT;

-- Add comment for documentation
COMMENT ON COLUMN jobs.division IS 'Job division/department information';
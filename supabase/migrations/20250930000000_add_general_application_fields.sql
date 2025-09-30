-- Add new columns to general_applications table
ALTER TABLE general_applications 
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS religion TEXT,
ADD COLUMN IF NOT EXISTS nationality TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS qualification TEXT,
ADD COLUMN IF NOT EXISTS present_company TEXT,
ADD COLUMN IF NOT EXISTS head_quarter TEXT;

-- Update applicant_phone column to be used for mobile number (if needed for compatibility)
-- The form will now use mobile_number as the primary phone field

-- Add comments for documentation
COMMENT ON COLUMN general_applications.mobile_number IS 'Applicant mobile number (primary contact)';
COMMENT ON COLUMN general_applications.applicant_phone IS 'Applicant phone number (populated with mobile number for compatibility)';
COMMENT ON COLUMN general_applications.gender IS 'Applicant gender';
COMMENT ON COLUMN general_applications.religion IS 'Applicant religion';
COMMENT ON COLUMN general_applications.nationality IS 'Applicant nationality';
COMMENT ON COLUMN general_applications.address IS 'Applicant complete address';
COMMENT ON COLUMN general_applications.qualification IS 'Applicant educational qualification';
COMMENT ON COLUMN general_applications.present_company IS 'Applicant current company name';
COMMENT ON COLUMN general_applications.head_quarter IS 'Preferred headquarters location';
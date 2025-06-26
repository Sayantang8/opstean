
-- Create notifications table if it doesn't exist (it already exists but let's ensure proper structure)
-- Add any missing columns or constraints

-- Create a trigger function to automatically create notifications when job applications are submitted
CREATE OR REPLACE FUNCTION create_job_application_notification()
RETURNS TRIGGER AS $$
DECLARE
    job_title TEXT;
BEGIN
    -- Get the job title for the notification
    SELECT title INTO job_title FROM jobs WHERE id = NEW.job_id;
    
    -- Insert notification for admins (we'll target all admin users)
    INSERT INTO notifications (
        title,
        message,
        type,
        user_id
    )
    SELECT 
        'New Job Application',
        'New application received from ' || NEW.applicant_name || ' for position: ' || COALESCE(job_title, 'Unknown Position'),
        'info',
        p.id
    FROM profiles p 
    WHERE p.role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS job_application_notification_trigger ON job_applications;
CREATE TRIGGER job_application_notification_trigger
    AFTER INSERT ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION create_job_application_notification();

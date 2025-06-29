
-- Create a trigger function to automatically create notifications when contact form is submitted
CREATE OR REPLACE FUNCTION create_contact_notification()
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
        'New Contact Form Submission',
        'New contact message received from ' || NEW.name || ' - Subject: ' || NEW.subject,
        'info',
        p.id
    FROM profiles p 
    WHERE p.role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for contact form submissions
DROP TRIGGER IF EXISTS contact_notification_trigger ON contacts;
CREATE TRIGGER contact_notification_trigger
    AFTER INSERT ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION create_contact_notification();

-- Update the general application notification function to be more descriptive
DROP TRIGGER IF EXISTS general_application_notification_trigger ON general_applications;
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
        'New general application received from ' || NEW.applicant_name || ' (' || NEW.applicant_email || ')',
        'info',
        p.id
    FROM profiles p 
    WHERE p.role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger for general applications
CREATE TRIGGER general_application_notification_trigger
    AFTER INSERT ON general_applications
    FOR EACH ROW
    EXECUTE FUNCTION create_general_application_notification();

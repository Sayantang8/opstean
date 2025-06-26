
-- Add RLS policy to allow admin users to update general applications
CREATE POLICY "Admin users can update general applications" 
  ON public.general_applications 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );


-- Create jobs table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.jobs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  experience_level TEXT DEFAULT 'entry',
  salary_min DECIMAL(10,2) DEFAULT 0,
  salary_max DECIMAL(10,2) DEFAULT 0,
  requirements TEXT,
  benefits TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can manage jobs" ON public.jobs;

-- Create policies for products table (publicly readable, admin manageable)
CREATE POLICY "Anyone can view active products" 
ON public.products FOR SELECT 
USING (status = 'active' OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage products" 
ON public.products FOR ALL 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create policies for jobs table (publicly readable, admin manageable)
CREATE POLICY "Anyone can view active jobs" 
ON public.jobs FOR SELECT 
USING (is_active = true OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage jobs" 
ON public.jobs FOR ALL 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at (drop and recreate to avoid conflicts)
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at 
BEFORE UPDATE ON public.products 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_jobs_updated_at ON public.jobs;
CREATE TRIGGER update_jobs_updated_at 
BEFORE UPDATE ON public.jobs 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

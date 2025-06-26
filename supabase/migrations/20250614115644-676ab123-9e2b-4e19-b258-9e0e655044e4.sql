
-- Remove the problematic trigger that's causing the "updated_at" error
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;

-- Add the missing updated_at column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Recreate the trigger now that the column exists
CREATE TRIGGER update_products_updated_at 
BEFORE UPDATE ON public.products 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Clear the dummy data and keep only real products
DELETE FROM public.products;

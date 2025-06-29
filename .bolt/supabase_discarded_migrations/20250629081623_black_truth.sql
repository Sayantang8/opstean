/*
  # Fix Category Column Array Support

  1. Database Schema Changes
    - Ensure category column is properly converted to text[] array type
    - Handle existing data migration safely
    - Update any constraints or indexes

  2. Data Migration
    - Convert existing string category data to array format
    - Handle null/empty values properly
    - Preserve existing category information

  3. Compatibility
    - Ensure queries work with array operations
    - Support both single and multiple categories per product
*/

-- First, let's check the current column type and handle the conversion safely
DO $$
BEGIN
  -- Check if category column exists and what type it is
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'category' 
    AND data_type = 'text'
  ) THEN
    -- Column exists as text, we need to convert it
    
    -- Add a temporary array column
    ALTER TABLE products ADD COLUMN category_array text[];
    
    -- Migrate existing data: convert single category strings to arrays
    UPDATE products 
    SET category_array = CASE 
      WHEN category IS NULL OR category = '' THEN ARRAY[]::text[]
      ELSE ARRAY[category]
    END;
    
    -- Drop the old text column
    ALTER TABLE products DROP COLUMN category;
    
    -- Rename the array column to category
    ALTER TABLE products RENAME COLUMN category_array TO category;
    
  ELSIF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'category' 
    AND data_type = 'ARRAY'
  ) THEN
    -- Column already exists as array, no conversion needed
    NULL;
    
  ELSE
    -- Column doesn't exist, create it as array
    ALTER TABLE products ADD COLUMN category text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;

-- Ensure the column has a proper default value
ALTER TABLE products ALTER COLUMN category SET DEFAULT ARRAY[]::text[];

-- Add a comment to document the column
COMMENT ON COLUMN products.category IS 'Array of category names that this product belongs to';

-- Create an index on the category array for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category_gin ON products USING GIN (category);

-- Update any existing null values to empty arrays
UPDATE products SET category = ARRAY[]::text[] WHERE category IS NULL;
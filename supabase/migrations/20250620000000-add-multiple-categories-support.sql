-- Migration to support multiple categories per product
-- Change category column from text to text[] (array of categories)

-- First, create a backup of the existing category data
ALTER TABLE products ADD COLUMN categories_backup text;
UPDATE products SET categories_backup = category WHERE category IS NOT NULL;

-- Add new categories column as text array
ALTER TABLE products ADD COLUMN categories text[];

-- Migrate existing single category data to the new array format
UPDATE products 
SET categories = ARRAY[category] 
WHERE category IS NOT NULL AND category != '';

-- Update products with null/empty categories to have empty array
UPDATE products 
SET categories = ARRAY[]::text[] 
WHERE category IS NULL OR category = '';

-- Drop the old category column (keeping backup for now)
ALTER TABLE products DROP COLUMN category;

-- Rename categories to category for consistency
ALTER TABLE products RENAME COLUMN categories TO category;

-- Drop the backup column (uncomment if you're confident about the migration)
-- ALTER TABLE products DROP COLUMN categories_backup;

-- Add a comment to the column
COMMENT ON COLUMN products.category IS 'Array of category names that this product belongs to';

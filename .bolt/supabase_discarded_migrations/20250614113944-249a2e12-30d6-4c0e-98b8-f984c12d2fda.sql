
-- First, let's make sure we delete any existing bucket that might be misconfigured
DELETE FROM storage.buckets WHERE id = 'product-images';

-- Create the storage bucket properly
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Create storage policies for product images
CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Insert the sample product data (corrected column name)
INSERT INTO products (name, category, description, price, image_url, manufacturer, dosage, composition, usage, "sideEffects", precautions, is_prescription, featured) VALUES
('Amoxicillin 500mg', 'Antibiotics', 'Broad-spectrum antibiotic for bacterial infections', 25.50, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 'PharmaCorp', '500mg', 'Amoxicillin trihydrate', 'Take one capsule twice daily with food', 'Nausea, diarrhea, allergic reactions', 'Consult doctor if allergic to penicillin', true, true),
('Paracetamol 650mg', 'General Care', 'Pain reliever and fever reducer', 12.75, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 'MediCore', '650mg', 'Paracetamol', 'Take 1-2 tablets every 4-6 hours as needed', 'Rare: skin rash, liver damage with overdose', 'Do not exceed 8 tablets in 24 hours', false, true),
('Omeprazole 20mg', 'Gastro Care', 'Proton pump inhibitor for acid reflux and ulcers', 45.00, 'https://images.unsplash.com/photo-1550572017-edd951aa8702?w=400', 'Gastro CareMed', '20mg', 'Omeprazole magnesium', 'Take one tablet daily before breakfast', 'Headache, nausea, stomach pain', 'Long-term use may affect bone density', false, true),
('Atenolol 50mg', 'Cardio Care', 'Beta-blocker for high blood pressure and heart conditions', 35.25, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', 'CardioPharm', '50mg', 'Atenolol', 'Take once daily as prescribed by doctor', 'Fatigue, dizziness, cold hands/feet', 'Do not stop suddenly without medical advice', true, true),
('Cetirizine 10mg', 'General Care', 'Antihistamine for allergies and hay fever', 18.50, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', 'AllergyFree', '10mg', 'Cetirizine hydrochloride', 'Take one tablet daily, preferably in the evening', 'Drowsiness, dry mouth, fatigue', 'Avoid alcohol while taking this medication', false, false),
('Metformin 500mg', 'General Care', 'Diabetes medication to control blood sugar', 22.00, 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400', 'DiabetCare', '500mg', 'Metformin hydrochloride', 'Take with meals as prescribed', 'Nausea, stomach upset, metallic taste', 'Monitor blood sugar levels regularly', true, true),
('Eye Drops Refresh', 'Eye Care', 'Lubricating eye drops for dry eyes', 28.75, 'https://images.unsplash.com/photo-1512069772995-ec65c4bf8036?w=400', 'VisionCare', '0.5% solution', 'Carboxymethylcellulose sodium', 'Apply 1-2 drops as needed', 'Temporary blurred vision', 'Remove contact lenses before use', false, true),
('Calcium + Vitamin D3', 'General Care', 'Bone health supplement', 32.50, 'https://images.unsplash.com/photo-1550572017-edd951aa8702?w=400', 'BoneStrong', '500mg + 250 IU', 'Calcium carbonate, Cholecalciferol', 'Take one tablet daily with food', 'Constipation, gas, kidney stones (rare)', 'Consult doctor if history of kidney stones', false, false),
('Prenatal Vitamins', 'Women Care', 'Complete prenatal vitamin supplement', 55.00, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 'MomCare', 'Daily dose', 'Folic acid, Iron, Calcium, DHA', 'Take one tablet daily with food', 'Nausea, constipation', 'Take with plenty of water', false, true),
('Baby Cough Syrup', 'Child Care', 'Gentle cough relief for children', 24.25, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 'KidSafe', '5ml per dose', 'Dextromethorphan (child formula)', 'Give as per age-based dosing chart', 'Drowsiness, upset stomach', 'Do not exceed recommended dose', false, true),
('Ibuprofen 400mg', 'General Care', 'Anti-inflammatory pain reliever', 19.75, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', 'PainRelief Co', '400mg', 'Ibuprofen', 'Take with food, maximum 3 times daily', 'Stomach irritation, heartburn', 'Avoid if allergic to NSAIDs', false, false),
('Losartan 25mg', 'Cardio Care', 'ACE inhibitor for blood pressure management', 41.50, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', 'HeartMed', '25mg', 'Losartan potassium', 'Take once daily, same time each day', 'Dizziness, fatigue, cough', 'Monitor blood pressure regularly', true, false);

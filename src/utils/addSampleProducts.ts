import { supabase } from '@/integrations/supabase/client';

export const addSampleProducts = async () => {
    console.log('🔧 Adding sample products to database...');

    const sampleProducts = [
        {
            name: 'Amoxicillin 500mg',
            description: 'Antibiotic for bacterial infections',
            category: ['Antibiotics'],
            status: 'active',
            featured: true,
            manufacturer: 'Opstean Healthcare',
            is_prescription: true,
            price: 25.99
        },
        {
            name: 'Eye Drops Plus',
            description: 'Lubricating eye drops for dry eyes',
            category: ['Eye Care'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 12.50
        },
        {
            name: 'Children\'s Cough Syrup',
            description: 'Safe cough relief for children',
            category: ['Child Care', 'Cold Care'],
            status: 'active',
            featured: true,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 18.75
        },
        {
            name: 'Heart Health Tablets',
            description: 'Cardiovascular support supplement',
            category: ['Cardio Care'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: true,
            price: 45.00
        },
        {
            name: 'Digestive Aid Capsules',
            description: 'Natural digestive support',
            category: ['Gastro', 'General Segment'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 22.99
        },
        {
            name: 'Pain Relief Gel',
            description: 'Topical pain relief for muscles and joints',
            category: ['Pain Care', 'Ortho Care'],
            status: 'active',
            featured: true,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 16.50
        },
        {
            name: 'Women\'s Health Vitamins',
            description: 'Complete vitamin complex for women',
            category: ['Gyno Care', 'General Segment'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 35.99
        },
        {
            name: 'Brain Boost Supplements',
            description: 'Cognitive enhancement supplements',
            category: ['Neuro Care'],
            status: 'active',
            featured: true,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 42.00
        },
        {
            name: 'Skin Care Cream',
            description: 'Moisturizing cream for healthy skin',
            category: ['Derma Care'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 28.50
        },
        {
            name: 'Urinary Health Support',
            description: 'Natural urinary tract support',
            category: ['Urology Care'],
            status: 'active',
            featured: false,
            manufacturer: 'Opstean Healthcare',
            is_prescription: false,
            price: 31.25
        }
    ];

    try {
        const { data, error } = await supabase
            .from('products')
            .insert(sampleProducts)
            .select();

        if (error) {
            console.error('❌ Error adding sample products:', error);
            return false;
        }

        console.log('✅ Sample products added successfully:', data?.length);
        return true;
    } catch (error) {
        console.error('❌ Exception adding sample products:', error);
        return false;
    }
};
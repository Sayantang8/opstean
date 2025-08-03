import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productCategories } from '@/data/productCategories';
import { useCategoryCounts } from '@/hooks/useCategoryCounts';
import { Pill, Eye, Baby, Heart, Activity, Plus, Zap, Shield, Thermometer, Brain, Sun, Stethoscope, Bone, Droplets, User, Bandage, ArrowRight } from 'lucide-react';

// Custom SVG Icons based on the provided images - Updated
const StomachIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 6c-2.5 0-4 2-4 4.5v5c0 3.5 2 6.5 4.5 7.5 1.5 0.5 3 0.5 4.5 0 2.5-1 4.5-4 4.5-7.5v-5c0-2.5-1.5-4.5-4-4.5-1.5 0-2.5 0.5-3.5 1-1-0.5-2-1-2.5-1z" />
        <path d="M9 12c0 1.2 1 2.2 2.2 2.2" />
        <path d="M13 12c1.2 0 2.2 1 2.2 2.2" />
        <path d="M8 16c1 1.2 2.5 1.2 4 1.2s3-0 4-1.2" />
        <path d="M10 9h4" />
        <circle cx="10" cy="11" r="0.5" />
        <circle cx="14" cy="11" r="0.5" />
    </svg>
);

const KneeIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="8" rx="1" />
        <ellipse cx="12" cy="10.5" rx="4" ry="2" />
        <path d="M8 10.5v3.5c0 1.5 1.5 2.5 3 3" />
        <path d="M16 10.5v3.5c0 1.5-1.5 2.5-3 3" />
        <circle cx="12" cy="16" r="2" />
        <rect x="9" y="18" width="6" height="4" rx="1" />
        <line x1="7" y1="15" x2="17" y2="15" />
        <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" />
    </svg>
);

const FetusIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7.5" r="3" />
        <path d="M12 10.5c-2.5 0-4.5 1.5-4.5 3.5v5.5c0 2 1.5 3 3 3h3c1.5 0 3-1 3-3V14c0-2-2-3.5-4.5-3.5z" />
        <circle cx="10.5" cy="6.8" r="0.4" />
        <circle cx="13.5" cy="6.8" r="0.4" />
        <path d="M12 8.2v1" />
        <path d="M7.5 15c-1.2 0-2 1.2-2 2.5v2" />
        <path d="M16.5 15c1.2 0 2 1.2 2 2.5v2" />
        <path d="M9.5 17.5c0-1.2 1.2-2 2.5-2s2.5 0.8 2.5 2" />
        <path d="M8 13c-0.8 0-1.5 0.8-1.5 1.8" />
        <path d="M16 13c0.8 0 1.5 0.8 1.5 1.8" />
    </svg>
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    pill: Pill,
    eye: Eye,
    baby: Baby,
    heart: Heart,
    activity: Activity,
    plus: Plus,
    zap: Zap,
    shield: Shield,
    thermometer: Thermometer,
    brain: Brain,
    sun: Sun,
    stethoscope: Stethoscope,
    bone: Bone,
    droplets: Droplets,
    user: User,
    bandage: Bandage,
    stomach: StomachIcon,
    knee: KneeIcon,
    fetus: FetusIcon,
};

const ProductCatalog = () => {
    const navigate = useNavigate();
    const { isLoading } = useCategoryCounts();

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    if (isLoading) {
        return (
            <section className="py-6 md:py-8 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">Product Categories</h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-teal to-navy mx-auto rounded-full"></div>
                    </div>

                    {/* Mobile Loading */}
                    <div className="md:hidden">
                        <div className="flex gap-3 overflow-x-auto pb-2 pt-2">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="animate-pulse flex-shrink-0">
                                    <div className="bg-gray-200 rounded-full w-20 h-20"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Loading */}
                    <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                        {[...Array(13)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 rounded-full p-3 h-24 w-24"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-6 md:py-8 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">Explore Our Product Categories</h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-xs md:text-sm">
                        Explore our pharmaceutical products across therapeutic categories
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-teal to-navy mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Mobile: Horizontal scroll, Desktop: Grid */}
                <div className="relative">
                    {/* Mobile Layout - Horizontal Scroll */}
                    <div className="md:hidden">
                        <div className="flex gap-1 overflow-x-auto pb-2 pt-2 scrollbar-hide">
                            {productCategories.map((category) => {
                                const IconComponent = iconMap[category.icon] || Plus;

                                return (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.name)}
                                        className="relative cursor-pointer flex-shrink-0 transform transition-transform hover:scale-110"
                                    >
                                        <div className="bg-white border border-gray-200 rounded-full p-3 text-center w-28 h-28 flex flex-col items-center justify-center" style={{ backgroundColor: '#b3e7ff' }}>
                                            <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>

                                            <h3 className="font-medium text-navy text-sm leading-tight">
                                                {category.name.split(' ').map((word, i) => (
                                                    <div key={i}>{word}</div>
                                                ))}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Scroll indicator */}
                        <div className="text-center mt-2">
                            <div className="text-xs text-gray-400">← Scroll to see more →</div>
                        </div>

                    </div>

                    {/* Desktop Layout - Grid */}
                    <div className="hidden md:flex flex-wrap gap-1 justify-center">
                        {productCategories.map((category) => {
                            const IconComponent = iconMap[category.icon] || Plus;

                            return (
                                <div
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.name)}
                                    className="relative cursor-pointer transform transition-transform hover:scale-110"
                                >
                                    <div className="bg-white border border-gray-200 rounded-full p-4 text-center w-32 h-32 flex flex-col items-center justify-center" style={{ backgroundColor: '#b3e7ff' }}>
                                        <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>

                                        <h3 className="font-semibold text-navy text-sm mb-1 leading-tight">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCatalog;
// Utility function to format experience level for display
export const formatExperienceLevel = (experienceLevel: string | undefined): string => {
    if (!experienceLevel) return 'Not specified';

    const levelMap: { [key: string]: string } = {
        'entry': 'Freshers',
        'Aspiring': 'Aspiring',
        'experienced': 'Experienced',
        'aspiring-experienced': 'Aspiring/Experienced'
    };

    return levelMap[experienceLevel] || experienceLevel;
};
// Utility function to format dates with ordinal suffixes (1st, 2nd, 3rd, etc.)
export const formatDateWithOrdinal = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Get the day with ordinal suffix
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);

    // Format: "October 2nd, 2025"
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).replace(/\d+/, `${day}${suffix}`);
};

// Helper function to get ordinal suffix (st, nd, rd, th)
const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
        return 'th'; // Special case for 11th, 12th, 13th
    }

    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};
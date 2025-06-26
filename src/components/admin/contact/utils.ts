
export const getContactStatusColor = (status: string) => {
  switch (status) {
    case 'unread': return 'bg-blue-100 text-blue-800';
    case 'read': return 'bg-yellow-100 text-yellow-800';
    case 'responded': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatContactDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

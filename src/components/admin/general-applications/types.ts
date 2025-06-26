
export interface GeneralApplicationCardProps {
  application: any;
  onViewApplication: (application: any) => void;
  onStatusChange: (applicationId: string, newStatus: string) => void;
  onDownloadResume: (application: any) => void;
  isUpdating: boolean;
}

export interface GeneralApplicationDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;
  onDownloadResume: (application: any) => void;
}

export interface GeneralApplicationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalApplications: number;
  children: React.ReactNode;
}

export const statusOptions = [
  { value: 'pending', label: 'Pending', icon: 'Clock', color: 'bg-yellow-500' },
  { value: 'reviewed', label: 'Reviewed', icon: 'Eye', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', icon: 'CheckCircle', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', icon: 'XCircle', color: 'bg-red-500' },
];

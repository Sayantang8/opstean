
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  created_at: string;
  updated_at: string;
}

export interface ContactCardProps {
  contact: Contact;
  onViewContact: (contact: Contact) => void;
  onStatusChange: (contactId: string, newStatus: string) => void;
  onSendEmail: (contact: Contact) => void;
  onDeleteContact: (contactId: string) => void;
  isUpdating: boolean;
}

export interface ContactDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onSendEmail: (contact: Contact) => void;
}

export interface ContactFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalContacts: number;
}

export const contactStatusOptions = [
  { value: 'unread', label: 'Unread', icon: 'Mail', color: 'bg-blue-500' },
  { value: 'read', label: 'Read', icon: 'MailOpen', color: 'bg-yellow-500' },
  { value: 'responded', label: 'Responded', icon: 'CheckCircle', color: 'bg-green-500' },
];

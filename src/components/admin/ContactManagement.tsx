
import React, { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContacts, useUpdateContactStatus, useDeleteContact } from '@/hooks/useContacts';
import { Contact } from './contact/types';
import ContactFilters from './contact/ContactFilters';
import ContactCard from './contact/ContactCard';
import ContactDetailDialog from './contact/ContactDetailDialog';

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const { data: contacts = [], isLoading, error } = useContacts();
  const updateStatusMutation = useUpdateContactStatus();
  const deleteContactMutation = useDeleteContact();
  const { toast } = useToast();

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, statusFilter]);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailDialogOpen(true);
    
    // Mark as read if unread
    if (contact.status === 'unread') {
      updateStatusMutation.mutate({ contactId: contact.id, status: 'read' });
    }
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    updateStatusMutation.mutate({ contactId, status: newStatus });
  };

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      deleteContactMutation.mutate(contactId);
    }
  };

  const handleSendEmail = (contact: Contact) => {
    const subject = `Re: ${contact.subject}`;
    const body = `Dear ${contact.name},\n\nThank you for contacting us.\n\nBest regards,\nOpstean Healthcare Team`;
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink, '_blank');
    
    // Mark as responded
    if (contact.status !== 'responded') {
      updateStatusMutation.mutate({ contactId: contact.id, status: 'responded' });
    }
    
    toast({
      title: 'Email Client Opened',
      description: 'Your default email client has been opened to reply to this contact.',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading contacts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Error loading contacts: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContactFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalContacts={contacts.length}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onViewContact={handleViewContact}
              onStatusChange={handleStatusChange}
              onSendEmail={handleSendEmail}
              onDeleteContact={handleDeleteContact}
              isUpdating={updateStatusMutation.isPending || deleteContactMutation.isPending}
            />
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'No contacts match your filters.' 
                : 'No contacts found.'}
            </p>
          </div>
        )}
      </ContactFilters>

      <ContactDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        contact={selectedContact}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
};

export default ContactManagement;

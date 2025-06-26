
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import { ContactDetailDialogProps } from './types';
import { getContactStatusColor, formatContactDate } from './utils';

const ContactDetailDialog: React.FC<ContactDetailDialogProps> = ({
  isOpen,
  onOpenChange,
  contact,
  onSendEmail
}) => {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contact Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <p className="text-sm text-gray-900">{contact.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-sm text-gray-900">{contact.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Subject:</span>
                  <p className="text-sm text-gray-900">{contact.subject}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Status & Timeline</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <Badge className={`ml-2 ${getContactStatusColor(contact.status)}`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Received:</span>
                  <p className="text-sm text-gray-900">{formatContactDate(contact.created_at)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                  <p className="text-sm text-gray-900">{formatContactDate(contact.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Message</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => onSendEmail(contact)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Reply to Contact
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailDialog;

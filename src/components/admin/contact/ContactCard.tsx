
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, MailOpen, CheckCircle, Trash2 } from 'lucide-react';
import { ContactCardProps } from './types';
import { getContactStatusColor, formatContactDate } from './utils';

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onViewContact,
  onStatusChange,
  onSendEmail,
  onDeleteContact,
  isUpdating
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return Mail;
      case 'read': return MailOpen;
      case 'responded': return CheckCircle;
      default: return Mail;
    }
  };

  const StatusIcon = getStatusIcon(contact.status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {contact.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{contact.email}</p>
            <p className="text-sm font-medium text-gray-800 mt-2">{contact.subject}</p>
          </div>
          <Badge className={getContactStatusColor(contact.status)}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {contact.message}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Received: {formatContactDate(contact.created_at)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewContact(contact)}
            className="flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View Details
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onSendEmail(contact)}
            className="flex items-center gap-1"
          >
            <Mail className="w-3 h-3" />
            Reply
          </Button>

          {contact.status === 'unread' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(contact.id, 'read')}
              disabled={isUpdating}
              className="flex items-center gap-1"
            >
              <MailOpen className="w-3 h-3" />
              Mark Read
            </Button>
          )}

          {contact.status === 'read' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(contact.id, 'responded')}
              disabled={isUpdating}
              className="flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              Mark Responded
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteContact(contact.id)}
            disabled={isUpdating}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;

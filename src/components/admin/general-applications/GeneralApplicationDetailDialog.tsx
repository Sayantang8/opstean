
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { GeneralApplicationDetailDialogProps } from './types';
import { getStatusColor } from './utils';

const GeneralApplicationDetailDialog: React.FC<GeneralApplicationDetailDialogProps> = ({
  isOpen,
  onOpenChange,
  application,
  onDownloadResume
}) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Application Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Applicant Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {application.applicant_name}</p>
                <p><strong>Email:</strong> {application.applicant_email}</p>
                <p><strong>Phone:</strong> {application.applicant_phone}</p>
                {application.years_of_experience && (
                  <p><strong>Experience:</strong> {application.years_of_experience} years</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Application Info</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Position Interest:</strong> {application.job_title || 'General Interest'}</p>
                <p><strong>Applied:</strong> {format(new Date(application.created_at), 'MMMM dd, yyyy at hh:mm a')}</p>
                <p><strong>Status:</strong> 
                  <Badge className={`ml-2 ${getStatusColor(application.application_status)}`}>
                    {application.application_status}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
          
          {application.cover_letter && (
            <div>
              <h4 className="font-semibold mb-2">Cover Letter</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{application.cover_letter}</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-4 border-t">
            {application.resume_file_data && (
              <Button
                variant="outline"
                onClick={() => onDownloadResume(application)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume ({application.resume_file_name})
              </Button>
            )}
            <Button
              onClick={() => window.open(`mailto:${application.applicant_email}`)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Applicant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralApplicationDetailDialog;

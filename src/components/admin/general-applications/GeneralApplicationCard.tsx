
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  Download,
  Calendar,
  Mail,
  Phone,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { GeneralApplicationCardProps, statusOptions } from './types';
import { getStatusColor } from './utils';

const GeneralApplicationCard: React.FC<GeneralApplicationCardProps> = ({
  application,
  onViewApplication,
  onStatusChange,
  onDownloadResume,
  onDeleteApplication,
  isUpdating,
  isDeleting
}) => {
  const getIcon = (iconName: string) => {
    const icons = {
      Clock,
      Eye,
      CheckCircle,
      XCircle
    };
    return icons[iconName as keyof typeof icons] || Clock;
  };

  const handleStatusClick = (newStatus: string) => {
    console.log('Status button clicked:', { applicationId: application.id, newStatus });
    onStatusChange(application.id, newStatus);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-navy mb-1">
              {application.applicant_name}
            </h3>
            <p className="text-gray-600 mb-2">{application.job_title || 'General Interest'}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {application.applicant_email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {application.mobile_number || application.applicant_phone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(application.created_at), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 flex-wrap">
              {application.date_of_birth && (
                <span>🎂 {format(new Date(application.date_of_birth), 'MMM dd, yyyy')}</span>
              )}
              {application.gender && (
                <span>👤 {application.gender}</span>
              )}
              {application.nationality && (
                <span>📍 {application.nationality}</span>
              )}
              {application.qualification && (
                <span>🎓 {application.qualification}</span>
              )}
              {application.religion && (
                <span>🕊️ {application.religion}</span>
              )}
              {application.division && (
                <span>🏢 {application.division}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(application.application_status)}>
              {application.application_status}
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {application.years_of_experience && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {application.years_of_experience} years experience
              </span>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Status Change Buttons */}
            <div className="flex gap-1">
              {statusOptions.map((statusOption) => {
                const Icon = getIcon(statusOption.icon);
                const isCurrentStatus = application.application_status === statusOption.value;
                return (
                  <Button
                    key={statusOption.value}
                    variant={isCurrentStatus ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusClick(statusOption.value)}
                    disabled={isCurrentStatus || isUpdating}
                    className={`flex items-center gap-1 ${isCurrentStatus ? statusOption.color + ' text-white' : ''}`}
                  >
                    <Icon className="w-3 h-3" />
                    {statusOption.label}
                  </Button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {application.resume_file_data && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownloadResume(application)}
                  className="flex items-center gap-1"
                  disabled={isDeleting}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </Button>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={() => onViewApplication(application)}
                className="flex items-center gap-1"
                disabled={isDeleting}
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteApplication?.(application.id, application.applicant_name)}
                className="flex items-center gap-1"
                disabled={isDeleting || isUpdating}
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralApplicationCard;

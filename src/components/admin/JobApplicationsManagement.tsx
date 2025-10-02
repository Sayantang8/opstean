
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Download, Mail, Phone, Calendar, User, MapPin, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { useJobApplications, useUpdateApplicationStatus, useDeleteJobApplication } from '@/hooks/useJobApplications';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const JobApplicationsManagement = () => {
  const { data: applications = [], isLoading, error } = useJobApplications();
  const updateStatusMutation = useUpdateApplicationStatus();
  const deleteApplicationMutation = useDeleteJobApplication();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsDetailDialogOpen(true);
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      console.log('Starting job application status update:', { applicationId, newStatus });

      const result = await updateStatusMutation.mutateAsync({
        applicationId,
        status: newStatus
      });

      console.log('Job application status update result:', result);

      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating job application status:', error);
      toast({
        title: "Error",
        description: `Failed to update application status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteApplication = async (applicationId: string, applicantName: string) => {
    if (!window.confirm(`Are you sure you want to delete the application from ${applicantName}? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('Starting job application deletion:', { applicationId, applicantName });

      const result = await deleteApplicationMutation.mutateAsync(applicationId);

      console.log('Job application deletion result:', result);

      toast({
        title: "Application Deleted",
        description: `Application from ${applicantName} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting job application:', error);
      toast({
        title: "Error",
        description: `Failed to delete application: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const downloadResume = (application: any) => {
    if (application.resume_file_data && application.resume_file_name) {
      try {
        const byteCharacters = atob(application.resume_file_data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = application.resume_file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading resume:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-500' },
    { value: 'reviewed', label: 'Reviewed', icon: Eye, color: 'bg-blue-500' },
    { value: 'contacted', label: 'Contacted', icon: CheckCircle, color: 'bg-green-500' },
    { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading job applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading job applications. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-navy">Job Applications</h2>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {applications.length} Total Applications
        </Badge>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No job applications received yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application: unknown) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">
                      {application.applicant_name}
                    </h3>
                    <p className="text-gray-600 mb-2">{application.jobs.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {application.applicant_email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {application.applicant_phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(application.created_at), 'MMM dd, yyyy')}
                      </span>
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
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.jobs.location || 'Remote'}
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {/* Status Change Buttons */}
                    <div className="flex gap-1">
                      {statusOptions.map((statusOption) => {
                        const Icon = statusOption.icon;
                        const isCurrentStatus = application.application_status === statusOption.value;
                        return (
                          <Button
                            key={statusOption.value}
                            variant={isCurrentStatus ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleStatusChange(application.id, statusOption.value)}
                            disabled={isCurrentStatus || updateStatusMutation.isPending}
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
                      {application.resume_file_name && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadResume(application)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Resume
                        </Button>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleViewApplication(application)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteApplication(application.id, application.applicant_name)}
                        disabled={deleteApplicationMutation.isPending}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Application Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Application Details</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Applicant Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedApplication.applicant_name}</p>
                    <p><strong>Email:</strong> {selectedApplication.applicant_email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.applicant_phone}</p>
                    {selectedApplication.date_of_birth && (
                      <p><strong>Date of Birth:</strong> {format(new Date(selectedApplication.date_of_birth), 'MMMM dd, yyyy')}</p>
                    )}
                    {selectedApplication.gender && (
                      <p><strong>Gender:</strong> {selectedApplication.gender}</p>
                    )}
                    {selectedApplication.religion && (
                      <p><strong>Religion:</strong> {selectedApplication.religion}</p>
                    )}
                    {selectedApplication.current_company && (
                      <p><strong>Current Company:</strong> {selectedApplication.current_company}</p>
                    )}
                    {selectedApplication.years_of_experience && (
                      <p><strong>Experience:</strong> {selectedApplication.years_of_experience} years</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Application Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Position:</strong> {selectedApplication.jobs?.title}</p>
                    <p><strong>Location:</strong> {selectedApplication.jobs?.location || 'Remote'}</p>
                    <p><strong>Applied:</strong> {format(new Date(selectedApplication.created_at), 'MMM dd, yyyy')}</p>
                    <p><strong>Status:</strong>
                      <Badge className={`ml-2 ${getStatusColor(selectedApplication.application_status)}`}>
                        {selectedApplication.application_status}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {selectedApplication.cover_letter && (
                <div>
                  <h4 className="font-semibold mb-2">Cover Letter</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                {selectedApplication.resume_file_name && (
                  <Button
                    variant="outline"
                    onClick={() => downloadResume(selectedApplication)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                )}
                <Button
                  onClick={() => window.open(`mailto:${selectedApplication.applicant_email}`)}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Applicant
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteApplication(selectedApplication.id, selectedApplication.applicant_name);
                    setIsDetailDialogOpen(false);
                  }}
                  disabled={deleteApplicationMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Application
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobApplicationsManagement;

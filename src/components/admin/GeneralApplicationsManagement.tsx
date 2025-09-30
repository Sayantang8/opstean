
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { useGeneralApplications, useUpdateGeneralApplicationStatus, useDeleteGeneralApplication } from '@/hooks/useGeneralApplications';
import { useToast } from '@/hooks/use-toast';
import GeneralApplicationCard from '@/components/admin/general-applications/GeneralApplicationCard';
import GeneralApplicationDetailDialog from '@/components/admin/general-applications/GeneralApplicationDetailDialog';
import GeneralApplicationFilters from '@/components/admin/general-applications/GeneralApplicationFilters';
import { downloadResume } from '@/components/admin/general-applications/utils';

const GeneralApplicationsManagement = () => {
  const { data: applications = [], isLoading, error } = useGeneralApplications();
  const updateStatusMutation = useUpdateGeneralApplicationStatus();
  const deleteApplicationMutation = useDeleteGeneralApplication();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsDetailDialogOpen(true);
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      console.log('Starting general application status update:', { applicationId, newStatus });

      const result = await updateStatusMutation.mutateAsync({
        applicationId,
        status: newStatus
      });

      console.log('General application status update result:', result);

      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating general application status:', error);
      toast({
        title: "Error",
        description: `Failed to update application status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) {
      toast({
        title: "No Data",
        description: "No applications to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      'Name', 'Email', 'Mobile Number', 'Date of Birth', 'Gender', 'Religion', 'Nationality',
      'Address', 'Qualification', 'Position Interest', 'Years of Experience',
      'Present Company', 'Preferred HQ', 'Application Status', 'Applied Date'
    ];

    const csvData = applications.map(app => [
      app.applicant_name || '',
      app.applicant_email || '',
      app.mobile_number || app.applicant_phone || '',
      app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : '',
      app.gender || '',
      app.religion || '',
      app.nationality || '',
      app.address || '',
      app.qualification || '',
      app.job_title || '',
      app.years_of_experience || '',
      app.present_company || '',
      app.head_quarter || '',
      app.application_status || '',
      new Date(app.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `general-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${applications.length} applications to CSV.`,
    });
  };

  const handleDeleteApplication = async (applicationId: string, applicantName: string) => {
    if (!confirm(`Are you sure you want to delete the application from ${applicantName}? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('Starting general application deletion:', { applicationId, applicantName });

      await deleteApplicationMutation.mutateAsync(applicationId);

      toast({
        title: "Application Deleted",
        description: `Application from ${applicantName} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting general application:', error);
      toast({
        title: "Deletion Failed",
        description: `Failed to delete application: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app =>
    app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.job_title && app.job_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.nationality && app.nationality.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.qualification && app.qualification.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.present_company && app.present_company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading general applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading general applications. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-navy">General Applications</h2>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {applications.length} Total Applications
          </Badge>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="flex items-center gap-2"
            disabled={applications.length === 0}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <GeneralApplicationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalApplications={applications.length}
      >
        {filteredApplications.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              {searchTerm ? 'No applications found matching your search.' : 'No general applications received yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application: any) => (
              <GeneralApplicationCard
                key={application.id}
                application={application}
                onViewApplication={handleViewApplication}
                onStatusChange={handleStatusChange}
                onDownloadResume={downloadResume}
                onDeleteApplication={handleDeleteApplication}
                isUpdating={updateStatusMutation.isPending}
                isDeleting={deleteApplicationMutation.isPending}
              />
            ))}
          </div>
        )}
      </GeneralApplicationFilters>

      <GeneralApplicationDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        application={selectedApplication}
        onDownloadResume={downloadResume}
        onDeleteApplication={handleDeleteApplication}
        isDeleting={deleteApplicationMutation.isPending}
      />
    </div>
  );
};

export default GeneralApplicationsManagement;

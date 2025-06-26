
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useGeneralApplications, useUpdateGeneralApplicationStatus } from '@/hooks/useGeneralApplications';
import { useToast } from '@/hooks/use-toast';
import GeneralApplicationCard from '@/components/admin/general-applications/GeneralApplicationCard';
import GeneralApplicationDetailDialog from '@/components/admin/general-applications/GeneralApplicationDetailDialog';
import GeneralApplicationFilters from '@/components/admin/general-applications/GeneralApplicationFilters';
import { downloadResume } from '@/components/admin/general-applications/utils';

const GeneralApplicationsManagement = () => {
  const { data: applications = [], isLoading, error } = useGeneralApplications();
  const updateStatusMutation = useUpdateGeneralApplicationStatus();
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

  // Filter applications based on search term
  const filteredApplications = applications.filter(app =>
    app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.job_title && app.job_title.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <Badge variant="outline" className="text-lg px-3 py-1">
          {applications.length} Total Applications
        </Badge>
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
                isUpdating={updateStatusMutation.isPending}
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
      />
    </div>
  );
};

export default GeneralApplicationsManagement;

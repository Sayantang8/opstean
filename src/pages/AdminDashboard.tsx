
import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { ProductsManagement } from '@/components/admin/ProductsManagement';
import { UsersManagement } from '@/components/admin/UsersManagement';
import { JobsManagement } from '@/components/admin/JobsManagement';
import { NotificationCenter } from '@/components/admin/NotificationCenter';
import JobApplicationsManagement from '@/components/admin/JobApplicationsManagement';
import GeneralApplicationsManagement from '@/components/admin/GeneralApplicationsManagement';
import ContactManagement from '@/components/admin/ContactManagement';

type ActiveView = 'products' | 'users' | 'jobs' | 'notifications' | 'job-applications' | 'general-applications' | 'contacts';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<ActiveView>('products');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNotificationClick = () => {
    setActiveView('notifications');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'products':
        return <ProductsManagement />;
      case 'users':
        return <UsersManagement />;
      case 'jobs':
        return <JobsManagement />;
      case 'job-applications':
        return <JobApplicationsManagement />;
      case 'general-applications':
        return <GeneralApplicationsManagement />;
      case 'contacts':
        return <ContactManagement />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <ProductsManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <AdminSidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <AdminTopBar onNotificationClick={handleNotificationClick} />
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

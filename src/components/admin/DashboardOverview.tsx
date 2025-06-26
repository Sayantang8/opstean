
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, CheckCircle, FileText, Bell } from 'lucide-react';

export const DashboardOverview = () => {
  const healthcareMetrics = {
    inventory: {
      lowStock: 12,
      expiringSoon: 5,
      popular: ['Aspirin', 'Vitamins', 'Antibiotics']
    },
    users: {
      pendingVerification: 8,
      activeHealthcarePros: 234,
      newRegistrations: 15
    },
    jobs: {
      activePostings: 22,
      newApplications: 47,
      matchedCandidates: 12
    }
  };

  const recentActivity = [
    { id: 1, action: 'New product added', item: 'Vitamin D3 Supplements', time: '5 min ago', type: 'product' },
    { id: 2, action: 'User verified', item: 'Dr. Sarah Johnson', time: '15 min ago', type: 'user' },
    { id: 3, action: 'Job application received', item: 'Pharmacist Position', time: '30 min ago', type: 'job' },
    { id: 4, action: 'Stock alert triggered', item: 'Aspirin - Low Stock', time: '1 hour ago', type: 'alert' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Inventory levels critical for 12 products', priority: 'high' },
    { id: 2, type: 'info', message: '8 healthcare professionals pending verification', priority: 'medium' },
    { id: 3, type: 'success', message: '47 new job applications this week', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <Button>Generate Report</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">{healthcareMetrics.inventory.lowStock} low stock</span> • 
              <span className="text-orange-500 ml-1">{healthcareMetrics.inventory.expiringSoon} expiring</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthcare Professionals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthcareMetrics.users.activeHealthcarePros}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-500">{healthcareMetrics.users.pendingVerification} pending verification</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Postings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthcareMetrics.jobs.activePostings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{healthcareMetrics.jobs.newApplications} new applications</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.priority === 'high').length} high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'product' ? 'bg-blue-500' :
                      activity.type === 'user' ? 'bg-green-500' :
                      activity.type === 'job' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.item}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      alert.priority === 'high' ? 'destructive' :
                      alert.priority === 'medium' ? 'secondary' : 'default'
                    }>
                      {alert.priority}
                    </Badge>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

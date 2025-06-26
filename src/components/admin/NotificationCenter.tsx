
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export const NotificationCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notifications from Supabase with auto-refresh
  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      console.log('🔔 Fetching notifications...');
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error fetching notifications:', error);
        throw error;
      }
      
      console.log('✅ Notifications fetched:', data);
      return data as Notification[];
    },
    enabled: !!user,
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  });

  // Mark notification as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      console.log('📖 Marking notification as read:', notificationId);
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      if (error) {
        console.error('❌ Error marking notification as read:', error);
        throw error;
      }
      console.log('✅ Notification marked as read successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      console.log('📖 Marking all notifications as read...');
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);
      
      if (error) {
        console.error('❌ Error marking all as read:', error);
        throw error;
      }
      console.log('✅ All notifications marked as read successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: (error) => {
      console.error('💥 Failed to mark all as read:', error);
      toast({
        title: "Error",
        description: `Failed to mark all as read: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      console.log('🗑️ Deleting notification:', notificationId);
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) {
        console.error('❌ Error deleting notification:', error);
        throw error;
      }
      console.log('✅ Notification deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "Notification deleted successfully",
      });
    },
    onError: (error) => {
      console.error('💥 Failed to delete notification:', error);
      toast({
        title: "Error",
        description: `Failed to delete notification: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  // Delete all notifications mutation
  const deleteAllNotificationsMutation = useMutation({
    mutationFn: async () => {
      console.log('🗑️ Deleting all notifications...');
      const { error } = await supabase
        .from('notifications')
        .delete()
        .gte('created_at', '1970-01-01'); // Delete all notifications
      
      if (error) {
        console.error('❌ Error deleting all notifications:', error);
        throw error;
      }
      console.log('✅ All notifications deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "All notifications deleted successfully",
      });
    },
    onError: (error) => {
      console.error('💥 Failed to delete all notifications:', error);
      toast({
        title: "Error",
        description: `Failed to delete all notifications: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  const markAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const deleteNotification = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      deleteNotificationMutation.mutate(id);
    }
  };

  const deleteAllNotifications = () => {
    if (window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      deleteAllNotificationsMutation.mutate();
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const highPriorityCount = notifications.filter(n => n.type === 'error' && !n.is_read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading notifications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading notifications: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['notifications'] })} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={markAllAsReadMutation.isPending || unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button 
            variant="destructive" 
            onClick={deleteAllNotifications}
            disabled={deleteAllNotificationsMutation.isPending || notifications.length === 0}
          >
            <X className="h-4 w-4 mr-2" />
            Delete All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-sm text-gray-500">Total Notifications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold text-red-500">{highPriorityCount}</div>
              <p className="text-sm text-gray-500">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Check className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-sm text-gray-500">Unread</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${!notification.is_read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <Badge
                          variant={
                            notification.type === 'error' ? 'destructive' :
                            notification.type === 'warning' ? 'secondary' : 'default'
                          }
                          className="text-xs"
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!notification.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                        disabled={markAsReadMutation.isPending}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                      disabled={deleteNotificationMutation.isPending}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {notifications.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      )}
    </div>
  );
};

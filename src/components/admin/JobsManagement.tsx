
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: number;
  title: string;
  description?: string;
  location?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  requirements?: string;
  benefits?: string;
  is_active?: boolean;
  created_at?: string;
}

export const JobsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    experience_level: 'entry',
    salary_min: 0,
    salary_max: 0,
    requirements: '',
    benefits: '',
    is_active: true
  });

  // Fetch jobs
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', searchQuery],
    queryFn: async () => {
      let query = supabase.from('jobs').select('*');
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Job[];
    }
  });

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: async (jobData: typeof newJob) => {
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsAddDialogOpen(false);
      setNewJob({
        title: '',
        description: '',
        location: '',
        experience_level: 'entry',
        salary_min: 0,
        salary_max: 0,
        requirements: '',
        benefits: '',
        is_active: true
      });
      toast({
        title: "Success",
        description: "Job created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create job",
        variant: "destructive",
      });
    }
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: number }) => {
      const { error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsEditDialogOpen(false);
      setEditingJob(null);
      toast({
        title: "Success",
        description: "Job updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update job",
        variant: "destructive",
      });
    }
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job",
        variant: "destructive",
      });
    }
  });

  const handleCreateJob = () => {
    if (!newJob.title) {
      toast({
        title: "Error",
        description: "Job title is required",
        variant: "destructive",
      });
      return;
    }
    createJobMutation.mutate(newJob);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsEditDialogOpen(true);
  };

  const handleUpdateJob = () => {
    if (!editingJob || !editingJob.title) {
      toast({
        title: "Error",
        description: "Job title is required",
        variant: "destructive",
      });
      return;
    }
    updateJobMutation.mutate(editingJob);
  };

  const handleDeleteJob = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJobMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading jobs: {error.message}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['jobs'] })} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  placeholder="Job title"
                />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  placeholder="Job description"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    placeholder="Job location"
                  />
                </div>
                <div>
                  <Label>Experience Level</Label>
                  <Select value={newJob.experience_level} onValueChange={(value) => setNewJob({...newJob, experience_level: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Salary</Label>
                  <Input
                    type="number"
                    value={newJob.salary_min}
                    onChange={(e) => setNewJob({...newJob, salary_min: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    value={newJob.salary_max}
                    onChange={(e) => setNewJob({...newJob, salary_max: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label>Requirements</Label>
                <Textarea
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                  placeholder="Job requirements"
                  rows={3}
                />
              </div>

              <div>
                <Label>Benefits</Label>
                <Textarea
                  value={newJob.benefits}
                  onChange={(e) => setNewJob({...newJob, benefits: e.target.value})}
                  placeholder="Job benefits"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newJob.is_active}
                  onCheckedChange={(checked) => setNewJob({...newJob, is_active: checked})}
                />
                <Label>Active Job Posting</Label>
              </div>

              <Button 
                onClick={handleCreateJob}
                disabled={createJobMutation.isPending}
                className="w-full"
              >
                {createJobMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Job'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Salary Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="font-medium">{job.title}</div>
                  </TableCell>
                  <TableCell>{job.location || 'Remote'}</TableCell>
                  <TableCell className="capitalize">{job.experience_level}</TableCell>
                  <TableCell>
                    {job.salary_min && job.salary_max ? 
                      `$${job.salary_min?.toLocaleString()} - $${job.salary_max?.toLocaleString()}` : 
                      'Not specified'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.is_active ? 'default' : 'secondary'}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditJob(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          {editingJob && (
            <div className="space-y-4 py-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingJob.description || ''}
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={editingJob.location || ''}
                    onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Experience Level</Label>
                  <Select 
                    value={editingJob.experience_level || 'entry'} 
                    onValueChange={(value) => setEditingJob({...editingJob, experience_level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Salary</Label>
                  <Input
                    type="number"
                    value={editingJob.salary_min || 0}
                    onChange={(e) => setEditingJob({...editingJob, salary_min: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    value={editingJob.salary_max || 0}
                    onChange={(e) => setEditingJob({...editingJob, salary_max: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingJob.is_active || false}
                  onCheckedChange={(checked) => setEditingJob({...editingJob, is_active: checked})}
                />
                <Label>Active Job Posting</Label>
              </div>

              <Button 
                onClick={handleUpdateJob}
                disabled={updateJobMutation.isPending}
                className="w-full"
              >
                {updateJobMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Job'
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {jobs.length === 0 && !isLoading && (
        <div className="text-center p-8">
          <p className="text-gray-500">No jobs found. Create your first job posting!</p>
        </div>
      )}
    </div>
  );
};

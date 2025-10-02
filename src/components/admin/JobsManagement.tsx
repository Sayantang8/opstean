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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Loader2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BirthDatePicker } from '@/components/ui/birth-date-picker';
import { formatExperienceLevel } from '@/utils/experienceLevel';

interface Job {
  id: number;
  title: string;
  description?: string;
  location?: string;
  head_quarter?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  age_limit_min?: number;
  age_limit_max?: number;
  apply_before?: string;
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
    head_quarter: '',
    experience_level: 'entry',
    salary_min: 0,
    salary_max: 0,
    age_limit_min: 0,
    age_limit_max: 0,
    apply_before: '',
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
        head_quarter: '',
        experience_level: 'entry',
        salary_min: 0,
        salary_max: 0,
        age_limit_min: 0,
        age_limit_max: 0,
        apply_before: '',
        requirements: '',
        benefits: '',
        is_active: true
      });
      toast({
        title: "Success",
        description: "Job created successfully",
      });
    },
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Job description"
                  rows={4}
                />
              </div>

              <div>
                <Label>Head Quarter</Label>
                <Input
                  value={newJob.head_quarter}
                  onChange={(e) => setNewJob({ ...newJob, head_quarter: e.target.value })}
                  placeholder="Headquarters location"
                />
              </div>

              <div>
                <Label>Experience Level</Label>
                <Select value={newJob.experience_level} onValueChange={(value) => setNewJob({ ...newJob, experience_level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Freshers</SelectItem>
                    <SelectItem value="Aspiring">Aspiring</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="aspiring-experienced">Aspiring/Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Gross Salary</Label>
                  <Input
                    type="number"
                    value={newJob.salary_min}
                    onChange={(e) => setNewJob({ ...newJob, salary_min: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    value={newJob.salary_max}
                    onChange={(e) => setNewJob({ ...newJob, salary_max: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Age Limit</Label>
                  <Input
                    type="number"
                    value={newJob.age_limit_min}
                    onChange={(e) => setNewJob({ ...newJob, age_limit_min: parseInt(e.target.value) || 0 })}
                    placeholder="18"
                  />
                </div>
                <div>
                  <Label>Maximum Age Limit</Label>
                  <Input
                    type="number"
                    value={newJob.age_limit_max}
                    onChange={(e) => setNewJob({ ...newJob, age_limit_max: parseInt(e.target.value) || 0 })}
                    placeholder="65"
                  />
                </div>
              </div>

              <div>
                <Label>Apply Before Date</Label>
                <Input
                  type="date"
                  value={newJob.apply_before}
                  onChange={(e) => setNewJob({ ...newJob, apply_before: e.target.value })}
                  placeholder="Select application deadline"
                  className="w-full"
                />
              </div>

              <div>
                <Label>Requirements</Label>
                <Textarea
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                  placeholder="Job requirements"
                  rows={3}
                />
              </div>

              <div>
                <Label>Benefits</Label>
                <Textarea
                  value={newJob.benefits}
                  onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
                  placeholder="Job benefits"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newJob.is_active}
                  onCheckedChange={(checked) => setNewJob({ ...newJob, is_active: checked })}
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

      {/* Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Jobs ({jobs.length})</h2>
        </div>

        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">{job.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={job.is_active ? 'default' : 'secondary'}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Created: {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditJob(job)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Job Description */}
              {job.description && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                </div>
              )}

              {/* Job Details Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-1">Location Details</h4>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Head Quarter:</span>
                    <p className="text-sm text-gray-800">{job.head_quarter || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-1">Requirements</h4>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Experience Level:</span>
                    <p className="text-sm text-gray-800">{formatExperienceLevel(job.experience_level)}</p>
                  </div>
                  {job.age_limit_min && job.age_limit_min > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Minimum Age:</span>
                      <p className="text-sm text-gray-800">{job.age_limit_min} years</p>
                    </div>
                  )}
                  {job.age_limit_max && job.age_limit_max > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Maximum Age:</span>
                      <p className="text-sm text-gray-800">{job.age_limit_max} years</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-1">Application Details</h4>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Minimum Gross Salary:</span>
                    <p className="text-sm text-gray-800">
                      {job.salary_min && job.salary_min > 0 ? `₹${job.salary_min.toLocaleString()}` : 'Not specified'}
                    </p>
                  </div>
                  {job.apply_before && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Apply Before:</span>
                      <p className="text-sm text-gray-800">
                        {new Date(job.apply_before).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements Section */}
              {job.requirements && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Job Requirements</h4>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
                </div>
              )}

              {/* Benefits Section */}
              {job.benefits && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits & Perks</h4>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{job.benefits}</p>
                </div>
              )}

              {/* Job Status Footer */}
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Job ID: {job.id}</span>
                  <span>Status: {job.is_active ? 'Currently accepting applications' : 'Not accepting applications'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingJob.description || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label>Head Quarter</Label>
                <Input
                  value={editingJob.head_quarter || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, head_quarter: e.target.value })}
                />
              </div>

              <div>
                <Label>Experience Level</Label>
                <Select
                  value={editingJob.experience_level || 'entry'}
                  onValueChange={(value) => setEditingJob({ ...editingJob, experience_level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Freshers</SelectItem>
                    <SelectItem value="Aspiring">Aspiring</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="aspiring-experienced">Aspiring/Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Gross Salary</Label>
                  <Input
                    type="number"
                    value={editingJob.salary_min || 0}
                    onChange={(e) => setEditingJob({ ...editingJob, salary_min: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    value={editingJob.salary_max || 0}
                    onChange={(e) => setEditingJob({ ...editingJob, salary_max: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Age Limit</Label>
                  <Input
                    type="number"
                    value={editingJob.age_limit_min || 0}
                    onChange={(e) => setEditingJob({ ...editingJob, age_limit_min: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Maximum Age Limit</Label>
                  <Input
                    type="number"
                    value={editingJob.age_limit_max || 0}
                    onChange={(e) => setEditingJob({ ...editingJob, age_limit_max: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label>Apply Before Date</Label>
                <Input
                  type="date"
                  value={editingJob.apply_before || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, apply_before: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Requirements</Label>
                <Textarea
                  value={editingJob.requirements || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, requirements: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Benefits</Label>
                <Textarea
                  value={editingJob.benefits || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, benefits: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingJob.is_active || false}
                  onCheckedChange={(checked) => setEditingJob({ ...editingJob, is_active: checked })}
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
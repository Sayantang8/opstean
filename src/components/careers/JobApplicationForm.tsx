
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { useSubmitJobApplication } from '@/hooks/useJobApplications';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationFormProps {
  jobId: number;
  jobTitle: string;
  onSubmit: () => void;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onSubmit }) => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });

  const { mutate: submitApplication, isPending } = useSubmitJobApplication();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitApplication(
      { jobId, applicationData },
      {
        onSuccess: () => {
          toast({
            title: "Application Submitted!",
            description: "Thank you for your application. We'll review it and get back to you soon.",
          });
          setApplicationData({
            name: '',
            email: '',
            phone: '',
            experience: '',
            coverLetter: '',
            resume: null
          });
          onSubmit();
        },
        onError: (error: any) => {
          toast({
            title: "Submission Failed",
            description: "There was an error submitting your application. Please try again.",
            variant: "destructive",
          });
          console.error('Application submission error:', error);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={applicationData.name}
            onChange={handleInputChange}
            required
            className="mt-1"
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={applicationData.email}
            onChange={handleInputChange}
            required
            className="mt-1"
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            value={applicationData.phone}
            onChange={handleInputChange}
            required
            className="mt-1"
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            name="experience"
            value={applicationData.experience}
            onChange={handleInputChange}
            className="mt-1"
            disabled={isPending}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="resume">Resume (PDF) *</Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          className="mt-1"
          disabled={isPending}
        />
      </div>
      <div>
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          value={applicationData.coverLetter}
          onChange={handleInputChange}
          placeholder={`Tell us why you're interested in the ${jobTitle} position...`}
          className="mt-1 min-h-[100px]"
          disabled={isPending}
        />
      </div>
      <Button 
        type="submit" 
        className="bg-teal hover:bg-navy text-white px-8 py-2 transition-all duration-300 btn-hover-effect flex items-center gap-2"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {isPending ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
};

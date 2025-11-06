
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, X } from 'lucide-react';
import { useSubmitGeneralApplication, GeneralApplicationData } from '@/hooks/useGeneralApplications';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { JobInfoSection } from './form-sections/JobInfoSection';
import { ResumeUploadSection } from './form-sections/ResumeUploadSection';
import { CoverLetterSection } from './form-sections/CoverLetterSection';
import { formSchema, FormData } from './form-sections/types';

interface GeneralApplicationFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GeneralApplicationForm = ({ isOpen, onOpenChange }: GeneralApplicationFormProps) => {
  const [resume, setResume] = useState<File | null>(null);

  const { mutate: submitApplication, isPending } = useSubmitGeneralApplication();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('🚀 Form submission started');
    console.log('📋 Form data:', data);
    console.log('📄 Resume file:', resume);

    // Validate required fields
    const requiredFields = [
      'name', 'email', 'dateOfBirth', 'mobileNumber', 'gender', 'religion',
      'nationality', 'address', 'qualification', 'jobTitle', 'experience',
      'headQuarter', 'coverLetter'
    ];

    const missingFields = requiredFields.filter(field => !data[field as keyof FormData]);

    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const applicationData: GeneralApplicationData = {
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      mobileNumber: data.mobileNumber,
      gender: data.gender,
      religion: data.religion,
      nationality: data.nationality,
      address: data.address,
      qualification: data.qualification,
      jobTitle: data.jobTitle,
      experience: data.experience,
      presentCompany: data.presentCompany,
      division: data.division,
      headQuarter: data.headQuarter,
      coverLetter: data.coverLetter,
      resume,
    };

    console.log('📤 Submitting application data:', applicationData);

    submitApplication(applicationData, {
      onSuccess: () => {
        console.log('🎉 Submission successful!');
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll review your application and get back to you soon.",
        });
        reset();
        setResume(null);
        onOpenChange(false);
      },
      onError: (error) => {
        console.error('💥 Submission failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        toast({
          title: "Submission Failed",
          description: `There was an error submitting your application: ${errorMessage}. Please try again.`,
          variant: "destructive",
        });
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>General Application</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600">
            Submit your information and we'll keep you in mind for future opportunities.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoSection register={register} errors={errors} control={control} />
            <JobInfoSection register={register} errors={errors} />
            <CoverLetterSection register={register} errors={errors} />
            <ResumeUploadSection resume={resume} setResume={setResume} />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-navy hover:bg-teal"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

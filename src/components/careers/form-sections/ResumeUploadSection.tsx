
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import { logger } from '@/utils/logger';

interface ResumeUploadSectionProps {
  resume: File | null;
  setResume: (file: File | null) => void;
}

export const ResumeUploadSection = ({ resume, setResume }: ResumeUploadSectionProps) => {
  // Enhanced file validation
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 5MB' };
    }

    // File type validation
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return { isValid: false, error: 'Please upload a PDF, DOC, or DOCX file' };
    }

    // File name validation
    if (file.name.length > 255) {
      return { isValid: false, error: 'File name is too long' };
    }

    // Check for potentially malicious file names
    const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (dangerousChars.test(file.name)) {
      return { isValid: false, error: 'File name contains invalid characters' };
    }

    return { isValid: true };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      
      // Reset file input
      event.target.value = '';
      logger.security('Invalid file upload attempt', { 
        component: 'ResumeUploadSection',
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        error: validation.error
      });
      return;
    }
    
    setResume(file);
    logger.info('Resume file uploaded successfully', { 
      component: 'ResumeUploadSection',
      fileName: file.name,
      fileSize: file.size 
    });
  };

  const removeResume = () => {
    setResume(null);
    // Reset file input
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Label htmlFor="resume">Resume/CV</Label>
      <div className="mt-2">
        {resume ? (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border">
            <div className="flex-1">
              <span className="text-sm font-medium block">{resume.name}</span>
              <span className="text-xs text-gray-500">{formatFileSize(resume.size)}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeResume}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-400 transition-colors hover:bg-gray-50"
            onClick={triggerFileInput}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 block mb-1">
              Click to upload your resume
            </span>
            <p className="text-xs text-gray-500">
              PDF, DOC, or DOCX (max 5MB)
            </p>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

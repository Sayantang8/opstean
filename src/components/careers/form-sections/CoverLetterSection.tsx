
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from './types';

interface CoverLetterSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const CoverLetterSection = ({ register, errors }: CoverLetterSectionProps) => {
  return (
    <div>
      <Label htmlFor="coverLetter">Cover Letter *</Label>
      <Textarea
        id="coverLetter"
        {...register('coverLetter')}
        placeholder="Tell us about yourself, your experience, and why you'd like to work with us..."
        className="min-h-[120px]"
      />
      {errors.coverLetter && (
        <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
      )}
    </div>
  );
};

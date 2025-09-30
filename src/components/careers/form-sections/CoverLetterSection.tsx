
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Cover Letter</h3>
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
    </div>
  );
};


import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from './types';

interface JobInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const JobInfoSection = ({ register, errors }: JobInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="jobTitle">Position of Interest *</Label>
        <Input
          id="jobTitle"
          {...register('jobTitle')}
          placeholder="e.g., Software Developer, Sales Manager"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="experience">Years of Experience *</Label>
        <Input
          id="experience"
          {...register('experience')}
          placeholder="e.g., 5 years"
        />
        {errors.experience && (
          <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
        )}
      </div>
    </div>
  );
};

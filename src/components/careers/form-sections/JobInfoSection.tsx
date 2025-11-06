
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobTitle">Position of Interest *</Label>
          <Input
            id="jobTitle"
            {...register('jobTitle')}
            placeholder="e.g., Area Business Manager, MR"
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

        <div>
          <Label htmlFor="presentCompany">Present Company Name</Label>
          <Input
            id="presentCompany"
            {...register('presentCompany')}
            placeholder="Current company (if any)"
          />
          {errors.presentCompany && (
            <p className="text-red-500 text-sm mt-1">{errors.presentCompany.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="division">Division</Label>
          <Input
            id="division"
            {...register('division')}
            placeholder="e.g., Sales, Marketing, Operations"
          />
          {errors.division && (
            <p className="text-red-500 text-sm mt-1">{errors.division.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="headQuarter">Preferred Head Quarter *</Label>
          <Input
            id="headQuarter"
            {...register('headQuarter')}
            placeholder="e.g., Kolkata, Burdwan, Siliguri"
          />
          {errors.headQuarter && (
            <p className="text-red-500 text-sm mt-1">{errors.headQuarter.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

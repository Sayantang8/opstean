
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BirthDatePicker } from '@/components/ui/birth-date-picker';
import { FieldErrors, UseFormRegister, Controller, Control } from 'react-hook-form';
import { FormData } from './types';

interface PersonalInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

export const PersonalInfoSection = ({ register, errors, control }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <BirthDatePicker
                date={field.value}
                onDateChange={field.onChange}
                placeholder="Select your date of birth"
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>



        <div>
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <Input
            id="mobileNumber"
            {...register('mobileNumber')}
            placeholder="Your mobile number"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="religion">Religion *</Label>
          <Input
            id="religion"
            {...register('religion')}
            placeholder="Your religion"
          />
          {errors.religion && (
            <p className="text-red-500 text-sm mt-1">{errors.religion.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="nationality">Nationality *</Label>
          <Input
            id="nationality"
            {...register('nationality')}
            placeholder="Your nationality"
          />
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="qualification">Qualification *</Label>
          <Input
            id="qualification"
            {...register('qualification')}
            placeholder="e.g., B.S / B.A. / B.Com"
          />
          {errors.qualification && (
            <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          {...register('address')}
          placeholder="Your complete address"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>
    </div>
  );
};

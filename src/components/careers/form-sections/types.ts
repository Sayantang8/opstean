
import * as z from 'zod';

const formSchema = z.object({
  // Personal Information
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  dateOfBirth: z.date({
    required_error: 'Please select your date of birth',
  }),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 characters'),
  gender: z.string().min(1, 'Please select your gender'),
  religion: z.string().min(1, 'Please specify your religion'),
  nationality: z.string().min(2, 'Please specify your nationality'),
  address: z.string().min(10, 'Please provide your complete address'),

  // Professional Information
  qualification: z.string().min(2, 'Please specify your qualification'),
  jobTitle: z.string().min(2, 'Please specify the position you are interested in'),
  experience: z.string().min(1, 'Please specify your years of experience'),
  presentCompany: z.string().optional(),
  division: z.string().optional(),
  headQuarter: z.string().min(2, 'Please specify your preferred headquarters location'),

  // Application Details
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
});

export { formSchema };
export type FormData = z.infer<typeof formSchema>;

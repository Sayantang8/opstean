
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  jobTitle: z.string().min(2, 'Please specify the position you are interested in'),
  experience: z.string().min(1, 'Please specify your years of experience'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
});

export { formSchema };
export type FormData = z.infer<typeof formSchema>;

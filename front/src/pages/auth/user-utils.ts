import * as z from 'zod';

export const userSchemaZod = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type User = z.infer<typeof userSchemaZod>;

export const userInitialValues: User = {
  email: '',
  password: '',
};

import * as z from 'zod';
import { validate } from '../middlewares/validate';

export const userSchemaZod = z.object({
  userName: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, {
      message: 'Name must be at least 3 characters long',
    }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type User = z.infer<typeof userSchemaZod>;

export type UserCreateDto = z.infer<typeof userSchemaZod>;

export const userUpdateSchema = userSchemaZod.partial().omit({
  email: true,
});

export type UserUpdateDto = z.infer<typeof userUpdateSchema>;

export const validateUserCreate = validate(userSchemaZod);
export const validateUserUpdate = validate(userUpdateSchema);

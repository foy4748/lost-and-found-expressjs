import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().nonempty('Username cannot be empty'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Minimum 8 character long password is required')
    .max(16, 'Maximum 16 character is allowed for password.'),
  profile: z.object({
    bio: z.string(),
    age: z.number(),
  }),
});

export const userLoginValidationSchema = z.object({
  username: z.string().nonempty('Username cannot be empty'),
  password: z
    .string()
    .min(8, 'Minimum 8 character long password is required')
    .max(16, 'Maximum 16 character is allowed for password.'),
});

export const userPasswordUpdateValidationSchema = z.object({
  currentPassword: z
    .string()
    .max(16, 'Maximum 16 character is allowed for password.'),
  newPassword: z
    .string()
    .max(16, 'Maximum 16 character is allowed for password.'),
});

export default userValidationSchema;

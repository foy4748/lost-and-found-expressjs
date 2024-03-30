import { z } from 'zod';

export const updateProfilePayloadValidation = z.object({
  bio: z.string().optional(),
  age: z.number().optional(),
});

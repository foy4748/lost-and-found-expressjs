import { z } from 'zod';

export const updateProfilePayloadValidation = z.object({
  name: z.string().optional(),
  profile: z
    .object({
      bio: z.string().optional(),
      age: z.number().optional(),
    })
    .optional(),
});

import { z } from 'zod';

const claimCreationValidation = z.object({
  foundById: z.string(),
  distinguishingFeatures: z.string(),
  lostDate: z.coerce.date(),
});

export const claimUpdatePayloadValidation = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});

export default claimCreationValidation;

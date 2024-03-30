import { z } from 'zod';

const claimCreationValidation = z.object({
  foundItemId: z.string(),
  distinguishingFeatures: z.string(),
  lostDate: z.string(),
});

export const claimUpdatePayloadValidation = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});

export default claimCreationValidation;

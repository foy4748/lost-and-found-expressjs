import { z } from 'zod';

const claimCreationValidation = z.object({
  foundItemId: z.string(),
  distinguishingFeatures: z.string(),
  lostDate: z.string(),
});

export default claimCreationValidation;

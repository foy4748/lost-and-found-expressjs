import { z } from 'zod';

const foundItemValidation = z.object({
  categoryId: z.string(),
  foundItemName: z.string(),
  description: z.string(),
  location: z.string(),
  isItemFound: z.boolean().optional(),
  photoUrl: z.string().optional(),
});

export const foundByValidation = z.object({
  foundItemId: z.string(),
});
export default foundItemValidation;

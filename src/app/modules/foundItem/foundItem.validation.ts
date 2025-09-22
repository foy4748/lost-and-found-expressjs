import { z } from 'zod';

const foundItemValidation = z.object({
  categoryId: z.string().min(1),
  foundItemName: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  isItemFound: z.boolean().optional(),
  photoUrl: z.string().optional(),
});

export const foundItemUpdatePayloadValidation = z.object({
  id: z.string(),
  categoryId: z.string().min(1).optional(),
  foundItemName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  isItemFound: z.boolean().optional(),
  photoUrl: z.string().min(1).optional(),
});

export const foundByValidation = z.object({
  foundItemId: z.string().min(1),
});
export default foundItemValidation;

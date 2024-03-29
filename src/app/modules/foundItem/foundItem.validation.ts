import { z } from 'zod';

const foundItemValidation = z.object({
  categoryId: z.string(),
  foundItemName: z.string(),
  description: z.string(),
  location: z.string(),
});
export default foundItemValidation;

import { z } from 'zod';

const foundItemCategoryValidation = z.object({
  name: z.string(),
});

export default foundItemCategoryValidation;

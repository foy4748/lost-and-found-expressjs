import { PrismaClient } from '@prisma/client';
import { TCreateCategoryPayload } from './foundItemCategory.interface';
const prisma = new PrismaClient();

export async function ScreateFoundItemCategory(
  payload: TCreateCategoryPayload,
) {
  const newCategory = await prisma.foundItemCategories.create({
    data: payload,
  });
  return newCategory;
}

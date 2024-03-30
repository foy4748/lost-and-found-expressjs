import { PrismaClient } from '@prisma/client';
import { TfoundItemPayload } from './foundItem.interface';
import allowedUserFields from '../user/user.constant';
import { JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();

export const SreportFoundItem = async (
  payload: TfoundItemPayload,
  decoded: JwtPayload,
) => {
  const reportedFoundItem = await prisma.foundItems.create({
    data: {
      ...payload,
      userId: decoded.id,
    },
    include: {
      category: true,
      user: {
        select: allowedUserFields,
      },
    },
  });
  return reportedFoundItem;
};

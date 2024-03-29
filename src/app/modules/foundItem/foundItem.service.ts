import { PrismaClient } from '@prisma/client';
import { TfoundItemPayload } from './foundItem.interface';
import { TDecodedJWT } from '../../middlewares/authentication';
import allowedUserFields from '../user/user.constant';
const prisma = new PrismaClient();

export const SreportFoundItem = async (
  payload: TfoundItemPayload,
  decoded: TDecodedJWT,
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

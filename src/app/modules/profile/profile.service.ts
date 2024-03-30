import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import allowedUserFields from '../user/user.constant';
const prisma = new PrismaClient();

export async function SgetProfile(decoded: JwtPayload) {
  const profile = await prisma.userProfiles.findUnique({
    where: {
      userId: decoded.id,
    },
    include: {
      user: {
        select: allowedUserFields,
      },
    },
  });
  return profile;
}

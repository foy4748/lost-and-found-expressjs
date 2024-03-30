import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import allowedUserFields from '../user/user.constant';
import { TUpdateProfilePayload } from './profile.interface';
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

export async function SupdateProfile(
  payload: TUpdateProfilePayload,
  decoded: JwtPayload,
) {
  const profile = await prisma.userProfiles.update({
    where: {
      userId: decoded.id,
    },
    data: payload,
    include: {
      user: {
        select: allowedUserFields,
      },
    },
  });
  return profile;
}

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
  let flag1 = false;
  let flag2 = false;
  return prisma.$transaction(async (tx) => {
    if (payload.name) {
      await tx.users.update({
        where: {
          id: decoded.id,
        },
        data: { name: String(payload.name) },
      });

      flag1 = true;
    }
    if (payload.profile) {
      await tx.userProfiles.update({
        where: {
          userId: decoded.id,
        },
        data: payload.profile,
      });
      flag2 = true;
    }
    if (flag1 || flag2) {
      return await tx.userProfiles.findUnique({
        where: { userId: decoded.id },
        include: {
          user: {
            select: allowedUserFields,
          },
        },
      });
    } else {
      return null;
    }
  });
}

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { TUserAndUserProfilePayLoad } from './user.interface';
const prisma = new PrismaClient();

export async function ScreateUserAndProfile(
  payload: TUserAndUserProfilePayLoad,
) {
  const { profile, ...user } = payload;
  const hashedPassword = await bcrypt.hash(
    user.password as string,
    Number(config?.bcrypt_salt_rounds),
  );

  const newUser = await prisma.users.create({
    data: {
      ...user,
      password: hashedPassword,
      profile: {
        create: profile,
      },
    },
    include: {
      profile: true,
    },
  });
  return newUser;
}

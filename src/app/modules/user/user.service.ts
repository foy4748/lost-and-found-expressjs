import { PrismaClient, UserProfiles, Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { TUserAndUserProfilePayLoad } from './user.interface';
const prisma = new PrismaClient();

export function ScreateUserAndProfile(payload: TUserAndUserProfilePayLoad) {
  return prisma.$transaction(async (tx) => {
    const { profile, ...user } = payload;

    const hashedPassword = await bcrypt.hash(
      user.password as string,
      Number(config?.bcrypt_salt_rounds),
    );

    const userData = {
      ...user,
      password: hashedPassword,
    } as Users;

    const userCreated = await tx.users.create({
      data: userData,
    });

    const profileData = {
      ...profile,
      userId: userCreated.id,
    } as UserProfiles;

    const userProfileCreated = await tx.userProfiles.create({
      data: profileData,
    });

    return { userCreated, userProfileCreated };
  });
}

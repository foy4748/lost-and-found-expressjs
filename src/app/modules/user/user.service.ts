import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../config';
import {
  TUserAndUserProfilePayLoad,
  TUserLoginPayLoad,
} from './user.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
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

export async function SloginUser(payload: TUserLoginPayLoad) {
  const givenPassword = payload?.password;

  const foundUser = await prisma.users.findUnique({
    where: {
      email: String(payload?.email),
    },
  });

  const isPasswordMatched = bcrypt.compare(
    givenPassword,
    String(foundUser?.password),
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Email or Password is wrong');
  }

  return foundUser;
}

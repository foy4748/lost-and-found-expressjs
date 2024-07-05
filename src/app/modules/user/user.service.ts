import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../config';
import {
  TPasswordReplacement,
  TUserAndUserProfilePayLoad,
  TUserLoginPayLoad,
} from './user.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import allowedUserFields from './user.constant';
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

export async function SgetSingleUser(decoded: JwtPayload) {
  const foundUser = await prisma.users.findUnique({
    where: {
      id: decoded.id,
    },
    select: { ...allowedUserFields, profile: true },
  });

  return foundUser;
}

export async function SchangeUserPassword(
  decoded: JwtPayload,
  payload: TPasswordReplacement,
) {
  const foundUser = await prisma.users.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (foundUser) {
    const { password } = foundUser;
    const isPasswordMatched = await bcrypt.compare(
      payload.currentPassword,
      password,
    );
    if (isPasswordMatched) {
      await prisma.users.update({
        where: {
          id: decoded.id,
        },
        data: {
          password: payload.newPassword,
        },
      });
      return true;
    } else {
      new AppError(httpStatus.FORBIDDEN, 'Password mismatched');
      return false;
    }
  } else {
    new AppError(httpStatus.BAD_REQUEST, 'User not found');
    return false;
  }
}

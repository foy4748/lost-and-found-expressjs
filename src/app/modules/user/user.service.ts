import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../config';
import {
  TPasswordReplacement,
  TUserAndUserProfilePayLoad,
  TUserLoginPayLoad,
  TpaginationControlObject,
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

  const isPasswordMatched = await bcrypt.compare(
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
    const isPasswordMatched = await bcrypt.compare(
      payload.currentPassword,
      String(foundUser.password),
    );
    if (isPasswordMatched) {
      const hashedPassword = await bcrypt.hash(
        payload.newPassword as string,
        Number(config?.bcrypt_salt_rounds),
      );
      await prisma.users.update({
        where: {
          id: decoded.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return true;
    } else {
      throw new AppError(httpStatus.FORBIDDEN, 'Password mismatched');
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
}

export async function SdeleteUser(payload: {
  isDeleted: boolean;
  userId: string;
}) {
  const result = await prisma.users.update({
    where: {
      id: payload.userId,
    },
    data: {
      isDeleted: payload.isDeleted,
    },
  });
  return !!result || false;
}

export async function SgetAllUsers(
  paginationControlObject: TpaginationControlObject,
) {
  const { limit, page } = paginationControlObject;
  const skip = ((Number(page) || 1) - 1) * (Number(limit) || 10);
  const result = await prisma.users.findMany({
    select: { ...allowedUserFields, profile: true },
    skip,
    take: Number(limit) || 10,
  });
  return result;
}

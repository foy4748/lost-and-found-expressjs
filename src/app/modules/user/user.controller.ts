import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import jwt from 'jsonwebtoken';
import type { Users, UserProfiles } from '@prisma/client';

import {
  SchangeUserPassword,
  ScreateUserAndProfile,
  SdeleteUser,
  SgetAllUsers,
  SgetSingleUser,
  SloginUser,
} from './user.service';
import config from '../../config';

type cookieSameSite = boolean | 'none' | 'strict' | 'lax' | undefined;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: (process.env.NODE_ENV === 'production'
    ? 'none'
    : 'strict') as cookieSameSite,
};

export const CcreateUser = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await ScreateUserAndProfile(body);
  const { password, ...restData } = data;

  const { id, email, isDeleted, isAdmin } = data;
  const token = jwt.sign(
    {
      id,
      email,
    },
    String(config?.jwt_access_token),
    { expiresIn: 60 * 60 },
  );
  type TuserInfoWithToken<T> = Partial<T> & { token: string };
  const responseObj: TResponse<TuserInfoWithToken<typeof data>> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { ...restData, token },
  };
  res.setHeader('token', token);
  res.cookie('token', token, cookieOptions);
  sendResponse<TuserInfoWithToken<typeof data>>(res, responseObj);
});

export const CloginUser = catchAsyncError(async (req, res) => {
  const { body } = req;
  const userInfo = (await SloginUser(body)) as Users;
  const { id, email, isDeleted, isAdmin } = userInfo;
  /* eslint no-unused-vars: "off" */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...restData } = userInfo;
  const token = jwt.sign(
    {
      id,
      email,
      isDeleted,
      isAdmin,
    },
    String(config?.jwt_access_token),
    { expiresIn: 60 * 60 },
  );

  type TuserInfoWithToken<T> = Partial<T> & { token: string };

  const responseObj: TResponse<TuserInfoWithToken<typeof userInfo>> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { ...restData, token },
  };
  res.cookie('token', token, cookieOptions);
  sendResponse<TuserInfoWithToken<typeof userInfo>>(res, responseObj);
});

export const CgetSingleUser = catchAsyncError(async (req, res) => {
  const foundUser = await SgetSingleUser(req.decoded);
  const responseObj: TResponse<typeof foundUser> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User data retrieved successfully',
    data: foundUser,
  };
  sendResponse<typeof foundUser>(res, responseObj);
});

export const CgetAllUsers = catchAsyncError(async (req, res) => {
  const { limit, page } = req.params;
  const _limit = Number(limit ?? 10);
  const _page = Number(page ?? 1);
  const foundUsers = await SgetAllUsers({ limit: _limit, page: _page });
  const responseObj: TResponse<typeof foundUsers> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users data retrieved successfully',
    data: foundUsers,
  };
  sendResponse<typeof foundUsers>(res, responseObj);
});

export const CchangeUserPassword = catchAsyncError(async (req, res) => {
  const isSuccess = await SchangeUserPassword(req.decoded, req.body);
  const responseObj: TResponse<typeof isSuccess> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Changed password successfully',
    data: isSuccess,
  };
  sendResponse(res, responseObj);
});

export const CdeleteUser = catchAsyncError(async (req, res) => {
  const { isDeleted } = req.body;
  const { id: userId } = req.params;
  const isSuccess = await SdeleteUser({ isDeleted, userId });
  const responseObj: TResponse<typeof isSuccess> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: isSuccess,
  };
  sendResponse(res, responseObj);
});

export const ClogoutUser = catchAsyncError(async (_, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  const responseObj: TResponse<boolean> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged out successfully',
    data: true,
  };
  sendResponse(res, responseObj);
});

import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import jwt from 'jsonwebtoken';
import type { Users, UserProfiles } from '@prisma/client';

import { ScreateUserAndProfile, SloginUser } from './user.service';
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

  const { id, email } = data;
  const token = jwt.sign(
    {
      id,
      email,
    },
    String(config?.jwt_access_token),
    { expiresIn: 60 * 60 },
  );
  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: restData as typeof data,
  };
  res.setHeader('token', token);
  res.cookie('token', token, cookieOptions);
  sendResponse<typeof data>(res, responseObj);
});

export const CloginUser = catchAsyncError(async (req, res) => {
  const { body } = req;
  const userInfo = (await SloginUser(body)) as Users;
  const { id, email } = userInfo;
  const { password, createdAt, updatedAt, ...restData } = userInfo;
  const token = jwt.sign(
    {
      id,
      email,
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

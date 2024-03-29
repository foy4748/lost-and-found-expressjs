import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import jwt from 'jsonwebtoken';
import type { Users, UserProfiles } from '@prisma/client';

import { ScreateUserAndProfile } from './user.service';
import config from '../../config';
import { TUserAndUserProfileResponse } from './user.interface';

type cookieSameSite = boolean | 'none' | 'strict' | 'lax' | undefined;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: (process.env.NODE_ENV === 'production'
    ? 'none'
    : 'strict') as cookieSameSite,
};

export const CcreateUser = catchAsyncError(async (req, res, _) => {
  const { body } = req;
  const data = await ScreateUserAndProfile(body);

  const { id, email } = data.userCreated;
  const token = jwt.sign(
    {
      id,
      email,
    },
    String(config?.jwt_access_token),
    { expiresIn: 60 * 60 },
  );

  res.cookie('token', token, cookieOptions);
  //sendResponse<payloadType>(res, responseObj);
  res.send({ success: true });
});

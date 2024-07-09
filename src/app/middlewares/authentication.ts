import { RequestHandler } from 'express';
//import { TuserRole } from '../modules/user/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index';
import AppError from '../error/AppError';
import catchAsyncError from '../utils/catchAsyncError';

export type TDecodedJWT = {
  id: string;
  email: string;
  isAdmin: boolean;
  isDeleted: boolean;
  iat: number;
  exp: number;
};

const authentication = (shouldBeAnAdmin?: boolean): RequestHandler => {
  return catchAsyncError((req, _, next) => {
    const { token } = req.cookies;
    //console.log(authorization);
    let decoded;
    try {
      decoded = jwt.verify(
        String(token),
        String(config?.jwt_access_token),
      ) as TDecodedJWT;
    } catch (error) {
      throw new AppError(403, 'Unauthorized Access 1');
    }
    if (shouldBeAnAdmin && shouldBeAnAdmin != Boolean(decoded.isAdmin)) {
      throw new AppError(403, 'Unauthorized Access 11');
    }
    if (decoded.isDeleted) {
      throw new AppError(403, 'User is inactivated by admin. No longer Access');
    }
    if (decoded) {
      // JWT Expiry: The provided JWT (JSON Web Token) has expired.
      req.decoded = decoded as JwtPayload;
      next();
    } else {
      // Undefined JWT: No JWT is provided in the request headers.
      // Invalid JWT: The JWT provided is invalid or malformed.
      throw new AppError(403, 'Unauthorized Access 2');
    }
  });
};

export default authentication;

import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import { SgetProfile, SupdateProfile } from './profile.service';

export const CgetProfile = catchAsyncError(async (req, res) => {
  const { decoded } = req;
  const data = await SgetProfile(decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CupdateProfile = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const data = await SupdateProfile(body, decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile updated successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

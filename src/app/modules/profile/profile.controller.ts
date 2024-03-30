import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import { SgetProfile } from './profile.service';

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

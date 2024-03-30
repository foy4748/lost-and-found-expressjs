import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';

import { ScreateClaim } from './claim.service';

export const CcreateClaim = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const data = await ScreateClaim(body, decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Claim created successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

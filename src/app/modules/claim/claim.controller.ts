import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';

import { ScreateClaim, SgetClaims, SupdateClaim } from './claim.service';

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

export const CgetClaims = catchAsyncError(async (_, res) => {
  const data = await SgetClaims();

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claims retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CupdateClaim = catchAsyncError(async (req, res) => {
  const { claimid } = req.params;
  const data = await SupdateClaim(String(claimid), req.body);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claims updated successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';

import {
  ScreateClaim,
  SgetClaimByFoundById,
  SgetClaimByUserId,
  SgetClaims,
  SgetClaimsCount,
  SupdateClaim,
} from './claim.service';

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

export const CgetClaimByFoundById = catchAsyncError(async (req, res) => {
  const { foundById } = req.params;
  const data = await SgetClaimByFoundById(String(foundById));

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claims retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CgetClaimByUserId = catchAsyncError(async (req, res) => {
  const { id } = req.decoded;
  const data = await SgetClaimByUserId(String(id));

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claims retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CgetClaimsCount = catchAsyncError(async (_, res) => {
  const data = await SgetClaimsCount();
  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claims Analytics were retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

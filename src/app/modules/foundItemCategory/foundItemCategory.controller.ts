import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';

import {
  ScreateFoundItemCategory,
  SgetFoundItemCategories,
} from './foundItemCategory.service';

export const CcreateFoundItemCategory = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await ScreateFoundItemCategory(body);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Found item category created successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CgetFoundItemCategories = catchAsyncError(async (_req, res) => {
  const data = await SgetFoundItemCategories();

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Found item categories successfully retrieved',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

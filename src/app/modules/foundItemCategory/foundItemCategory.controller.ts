import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';

import { ScreateFoundItemCategory } from './foundItemCategory.service';

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

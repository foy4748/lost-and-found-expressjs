import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import { SreportFoundItem } from './foundItem.service';

export const CreportFoundItem = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await SreportFoundItem(body, req.decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Found item category created successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

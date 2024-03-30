import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import {
  SpaginatedAndFilteredFoundItems,
  SreportFoundItem,
} from './foundItem.service';
import pick from '../../utils/pick';
import {
  foundItemsFilterableFields,
  paginationRelatedFields,
} from './foundItem.constant';

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

export const CgetFoundItems = catchAsyncError(async (req, res) => {
  const filterFields = pick(req.query, foundItemsFilterableFields);
  const paginationFields = pick(req.query, paginationRelatedFields);
  const data = await SpaginatedAndFilteredFoundItems(
    filterFields,
    paginationFields,
  );

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Found items retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

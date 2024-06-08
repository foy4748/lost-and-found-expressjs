import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import {
  SgetFoundBy,
  SgetSingleFoundItem,
  SgetUserSpecificFoundItems,
  SpaginatedAndFilteredFoundItems,
  SreportFoundBy,
  SreportFoundItem,
  //SreportFoundItem,
  SreportLostItem,
} from './foundItem.service';
import pick from '../../utils/pick';
import {
  foundItemsFilterableFields,
  paginationRelatedFields,
} from './foundItem.constant';

export const CreportLostItem = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await SreportLostItem(body, req.decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Lost item  created successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});
export const CreportFoundItem = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await SreportFoundItem(body, req.decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Found item  created successfully',
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

  const responseObj: TResponse<typeof data.result> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Found items retrieved successfully',
    meta: data.meta,
    data: data.result,
  };
  sendResponse<typeof data.result>(res, responseObj);
});

export const CgetSingleFoundItem = catchAsyncError(async (req, res) => {
  const id: string = String(req.params.id);
  const data = await SgetSingleFoundItem(id);
  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Found item data retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CreportFoundBy = catchAsyncError(async (req, res) => {
  const { body } = req;
  const data = await SreportFoundBy(body, req.decoded);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Reported item is Found successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CgetUserSpecificFoundItems = catchAsyncError(async (req, res) => {
  const { isItemFound } = req.query;
  const data = await SgetUserSpecificFoundItems(
    req.decoded,
    Boolean(isItemFound),
  );
  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FoundItems data retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

export const CgetFoundBy = catchAsyncError(async (req, res) => {
  const { foundItemId } = req.params;
  const data = await SgetFoundBy(foundItemId);

  const responseObj: TResponse<typeof data> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FoundBy data retrieved successfully',
    data,
  };
  sendResponse<typeof data>(res, responseObj);
});

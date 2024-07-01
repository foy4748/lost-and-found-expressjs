import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import {
  SdeleteFoundItem,
  SgetFoundBy,
  SgetSingleFoundItem,
  SgetUserSpecificFoundItems,
  SpaginatedAndFilteredFoundItems,
  SreportFoundBy,
  SreportFoundItem,
  //SreportFoundItem,
  SreportLostItem,
  SupdateFoundItem,
} from './foundItem.service';
import pick from '../../utils/pick';
import {
  foundItemsFilterableFields,
  paginationRelatedFields,
} from './foundItem.constant';
import AppError from '../../error/AppError';

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
  const { isItemFound, page, limit } = req.query;
  const data = await SgetUserSpecificFoundItems(
    req.decoded,
    String(isItemFound),
    String(page),
    String(limit),
  );
  const responseObj: TResponse<typeof data.result> = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FoundItems data retrieved successfully',
    meta: data.meta,
    data: data.result,
  };
  sendResponse<typeof data.result>(res, responseObj);
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

export const CupdateFoundItem = catchAsyncError(async (req, res) => {
  const toBeUpdated = await SgetSingleFoundItem(req.body.id);
  if (toBeUpdated?.userId == req.decoded.id) {
    const data = await SupdateFoundItem(req.body);

    const responseObj: TResponse<typeof data> = {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Found Item was updated successfully',
      data,
    };
    sendResponse<typeof data>(res, responseObj);
  } else {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can't update someone else's item",
    );
  }
});

export const CdeleteFoundItem = catchAsyncError(async (req, res) => {
  const { foundItemId } = req.params;
  const toBeDeleted = await SgetSingleFoundItem(foundItemId);
  if (toBeDeleted?.userId == req.decoded.id) {
    const data = await SdeleteFoundItem(foundItemId);

    const responseObj: TResponse<typeof data> = {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Found Item was deleted successfully',
      data,
    };
    sendResponse<typeof data>(res, responseObj);
  } else {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can't delete someone else's item",
    );
  }
});

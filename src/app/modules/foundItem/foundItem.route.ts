import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemValidation, {
  foundByValidation,
  foundItemUpdatePayloadValidation,
} from './foundItem.validation';

import {
  CdeleteFoundItem,
  CfoundItemCounts,
  CgetFoundBy,
  CgetFoundItems,
  CgetSingleFoundItem,
  CgetUserSpecificFoundItems,
  CreportFoundBy,
  CreportFoundItem,
  CreportLostItem,
  CupdateFoundItem,
} from './foundItem.controller';
import authentication from '../../middlewares/authentication';

const shouldBeAnAdmin = true;
const router = express.Router();

router.post(
  '/report-lost',
  authentication(),
  validateRequest(foundItemValidation),
  CreportLostItem,
);

router.post(
  '/report-found',
  authentication(),
  validateRequest(foundItemValidation),
  CreportFoundItem,
);

router.post(
  '/found-by',
  authentication(),
  validateRequest(foundByValidation),
  CreportFoundBy,
);

router.get('/', CgetFoundItems);
router.get('/analytics', authentication(shouldBeAnAdmin), CfoundItemCounts);
router.get('/by-user', authentication(), CgetUserSpecificFoundItems);
router.get('/found-by/:foundItemId', CgetFoundBy);
router.get('/:id', CgetSingleFoundItem);

router.patch(
  '/',
  authentication(),
  validateRequest(foundItemUpdatePayloadValidation),
  CupdateFoundItem,
);

router.delete('/:foundItemId', authentication(), CdeleteFoundItem);

export default router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemValidation, { foundByValidation } from './foundItem.validation';

import {
  CdeleteFoundItem,
  CgetFoundBy,
  CgetFoundItems,
  CgetSingleFoundItem,
  CgetUserSpecificFoundItems,
  CreportFoundBy,
  CreportFoundItem,
  CreportLostItem,
} from './foundItem.controller';
import authentication from '../../middlewares/authentication';

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
router.get('/by-user', authentication(), CgetUserSpecificFoundItems);
router.get('/found-by/:foundItemId', CgetFoundBy);
router.get('/:id', CgetSingleFoundItem);
router.delete('/:foundItemId', authentication(), CdeleteFoundItem);

export default router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemValidation, { foundByValidation } from './foundItem.validation';

import {
  CgetFoundBy,
  CgetFoundItems,
  CgetSingleFoundItem,
  CreportFoundBy,
  CreportFoundItem,
} from './foundItem.controller';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post(
  '/',
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
router.get('/:id', CgetSingleFoundItem);
router.get('/found-by/:foundItemId', CgetFoundBy);

export default router;

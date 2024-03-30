import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemValidation from './foundItem.validation';

import { CgetFoundItems, CreportFoundItem } from './foundItem.controller';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post(
  '/',
  authentication(),
  validateRequest(foundItemValidation),
  CreportFoundItem,
);

router.get('/', CgetFoundItems);

export default router;

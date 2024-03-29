import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemValidation from './foundItem.validation';

import { CreportFoundItem } from './foundItem.controller';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post(
  '/',
  authentication(),
  validateRequest(foundItemValidation),
  CreportFoundItem,
);

export default router;

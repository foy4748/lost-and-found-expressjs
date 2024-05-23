import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import foundItemCategoryValidation from './foundItemCategory.validation';

import {
  CcreateFoundItemCategory,
  CgetFoundItemCategories,
} from './foundItemCategory.controller';
import authentication from '../../middlewares/authentication';
//import authentication from '../../middlewares/authentication';

const router = express.Router();

router.get('/', CgetFoundItemCategories);

router.post(
  '/',
  authentication(),
  validateRequest(foundItemCategoryValidation),
  CcreateFoundItemCategory,
);

export default router;

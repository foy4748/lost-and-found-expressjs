import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import claimCreationValidation from './claim.validation';

import authentication from '../../middlewares/authentication';
import { CcreateClaim } from './claim.controller';

const router = express.Router();

router.post(
  '/',
  authentication(),
  validateRequest(claimCreationValidation),
  CcreateClaim,
);

export default router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import claimCreationValidation, {
  claimUpdatePayloadValidation,
} from './claim.validation';

import authentication from '../../middlewares/authentication';
import { CcreateClaim, CgetClaims, CupdateClaim } from './claim.controller';

const router = express.Router();

router.post(
  '/',
  authentication(),
  validateRequest(claimCreationValidation),
  CcreateClaim,
);

router.get('/', authentication(), CgetClaims);

router.put(
  '/:claimid',
  authentication(),
  validateRequest(claimUpdatePayloadValidation),
  CupdateClaim,
);

export default router;

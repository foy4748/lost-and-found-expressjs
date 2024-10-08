import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import claimCreationValidation, {
  claimUpdatePayloadValidation,
} from './claim.validation';

import authentication from '../../middlewares/authentication';
import {
  CcreateClaim,
  CgetClaimByFoundById,
  CgetClaimByUserId,
  CgetClaims,
  CgetClaimsCount,
  CupdateClaim,
} from './claim.controller';

const router = express.Router();
const shouldBeAnAdmin = true;

router.post(
  '/',
  authentication(),
  validateRequest(claimCreationValidation),
  CcreateClaim,
);

router.get('/', authentication(), CgetClaims);
router.get('/analytics', authentication(shouldBeAnAdmin), CgetClaimsCount);
router.get('/by-user', authentication(), CgetClaimByUserId);
router.get('/:foundById', authentication(), CgetClaimByFoundById);

router.put(
  '/:claimid',
  authentication(),
  validateRequest(claimUpdatePayloadValidation),
  CupdateClaim,
);

export default router;

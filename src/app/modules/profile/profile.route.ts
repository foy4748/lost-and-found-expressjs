import express from 'express';
//import validateRequest from '../../middlewares/validateRequests';
import { CgetProfile, CupdateProfile } from './profile.controller';

import authentication from '../../middlewares/authentication';
import validateRequest from '../../middlewares/validateRequests';
import { updateProfilePayloadValidation } from './profile.validation';

const router = express.Router();

router.get('/', authentication(), CgetProfile);
router.patch(
  '/',
  authentication(),
  validateRequest(updateProfilePayloadValidation),
  CupdateProfile,
);

export default router;

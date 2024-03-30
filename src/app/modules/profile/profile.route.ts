import express from 'express';
//import validateRequest from '../../middlewares/validateRequests';
import { CgetProfile } from './profile.controller';

import authentication from '../../middlewares/authentication';

const router = express.Router();

router.get('/', authentication(), CgetProfile);

export default router;

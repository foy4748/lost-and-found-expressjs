import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import userValidationSchema from './user.validation';

import { CcreateUser } from './user.controller';
//import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post('/register', validateRequest(userValidationSchema), CcreateUser);
//router.post('/login', validateRequest(userLoginValidationSchema), CloginUser);

export default router;

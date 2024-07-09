import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import userValidationSchema, {
  userDeleteValidationSchema,
  userLoginValidationSchema,
  userPasswordUpdateValidationSchema,
} from './user.validation';

import {
  CchangeUserPassword,
  CcreateUser,
  CdeleteUser,
  CgetAllUsers,
  CgetSingleUser,
  CloginUser,
  ClogoutUser,
} from './user.controller';
import authentication from '../../middlewares/authentication';
//import authentication from '../../middlewares/authentication';

const router = express.Router();

const shouldBeAnAdmin = true;

router.post('/log-out', ClogoutUser);
router.get('/user', authentication(), CgetSingleUser);
// REQUIRES ADMIN ACCESS
router.get('/users/all', authentication(shouldBeAnAdmin), CgetAllUsers);

router.post('/register', validateRequest(userValidationSchema), CcreateUser);
router.post('/login', validateRequest(userLoginValidationSchema), CloginUser);

router.patch(
  '/change-password',
  authentication(),
  validateRequest(userPasswordUpdateValidationSchema),
  CchangeUserPassword,
);

router.patch(
  '/delete-user/:id',
  authentication(),
  validateRequest(userDeleteValidationSchema),
  CdeleteUser,
);

export default router;

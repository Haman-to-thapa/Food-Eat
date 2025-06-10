import express from 'express';
import { checkAuth, forgetPassword, login, logout, resetPassword, signup, updatedProfile, verifyEamil } from '../controller/userController';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.route('/check-auth').get(isAuthenticated, checkAuth);
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/verify-email').post(verifyEamil);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password/:token').post(resetPassword);
router.route('/profile/update').put(isAuthenticated,updatedProfile);


export default router;
import express from 'express';
import CompanyUserController from '../../controller/company.user.controller.js';

const companyUserRouter = express.Router();
const companyUserController = new CompanyUserController();

companyUserRouter.post('/register', (req, res, next) => companyUserController.registerUser(req, res, next));

companyUserRouter.post('/login', (req, res, next) => companyUserController.loginUser(req, res, next));

companyUserRouter.post('/resend-otp', (req, res, next) => companyUserController.resendOtp(req, res, next));

companyUserRouter.post('/forget-password', (req, res, next) => companyUserController.forgetPassword(req, res, next));

companyUserRouter.post('/reset-password', (req, res, next) => companyUserController.resetPassword(req, res, next));


companyUserRouter.post('/verify-otp', (req, res, next) => companyUserController.verifyOtp(req, res, next));


export default companyUserRouter;
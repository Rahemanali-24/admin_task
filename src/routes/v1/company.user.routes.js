import express from 'express';
import CompanyUserController from '../../controller/company.user.controller.js';

const companyUserRouter = express.Router();
const companyUserController = new CompanyUserController();

companyUserRouter.post('/register', (req, res, next) => companyUserController.registerUser(req, res, next));

companyUserRouter.post('/login', (req, res, next) => companyUserController.loginUser(req, res, next));

export default companyUserRouter;
// routes/companyProfile.routes.js
import express from 'express';
import CompanyProfileController from '../../controller/company.profile.controller.js'; // Correctly importing the default export
import upload from '../../utils/fileUpload.js';
const companyProfileRouter = express.Router();
const companyProfileController = new CompanyProfileController();



companyProfileRouter.post('/register', upload.single('companyLogo'), (req, res, next) => {
  companyProfileController.createCompanyProfile(req, res, next);
});
export default companyProfileRouter;

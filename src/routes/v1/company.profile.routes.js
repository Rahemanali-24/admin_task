// routes/companyProfile.routes.js
import express from 'express';
import {
  createCompanyProfile,
  getAllCompanyProfiles,
  getCompanyProfileById,
} from '../../controller/company.profile.controller.js';

const companyProfileRouter = express.Router();

companyProfileRouter.post('/', createCompanyProfile);
companyProfileRouter.get('/', getAllCompanyProfiles);
companyProfileRouter.get('/:id', getCompanyProfileById);

export default companyProfileRouter;

import { StatusCodes } from 'http-status-codes';
import CompanyProfileService from '../services/company.profile.service.js';


const companyProfileService = new CompanyProfileService();


export async function createCompanyProfile(req, res, next) {
    try {
      const profile = await companyProfileService.createCompanyProfile(req.body);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Company profile created successfully",
        data: profile,
      });
    } catch (err) {
      next(err);
    }
  }
  
  export async function getAllCompanyProfiles(req, res, next) {
    try {
      const profiles = await companyProfileService.getAllCompanyProfiles();
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Company profiles fetched successfully",
        data: profiles,
      });
    } catch (err) {
      next(err);
    }
  }
  
  export async function getCompanyProfileById(req, res, next) {
    try {
      const profile = await companyProfileService.getCompanyProfileById(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Company profile fetched successfully",
        data: profile,
      });
    } catch (err) {
      next(err);
    }
  }


  
  

// controller/company.profile.controller.js
import { StatusCodes } from 'http-status-codes';
import CompanyProfileService from '../services/company.profile.service.js';

class CompanyProfileController {
    constructor() {
        this.companyProfileService = new CompanyProfileService();
    }

    async createCompanyProfile(req, res, next) {
        try {
            const profile = await this.companyProfileService.createCompanyProfile(req.body);
            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Company profile created successfully",
                data: profile,
            });
        } catch (err) {
            next(err); // Pass the error to the error handler
        }
    }

    async getAllCompanyProfiles(req, res, next) {
        try {
            const profiles = await this.companyProfileService.getAllCompanyProfiles();
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Company profiles fetched successfully",
                data: profiles,
            });
        } catch (err) {
            next(err); // Pass the error to the error handler
        }
    }

    async getCompanyProfileById(req, res, next) {
        try {
            const profile = await this.companyProfileService.getCompanyProfileById(req.params.id);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Company profile fetched successfully",
                data: profile,
            });
        } catch (err) {
            next(err); // Pass the error to the error handler
        }
    }
}

export default CompanyProfileController; // Default export

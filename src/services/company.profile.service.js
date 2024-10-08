import CompanyProfileRepository from "../repository/company.profile.repository.js";

class CompanyProfileService {
  constructor() {
    this.companyProfileRepository = new CompanyProfileRepository();
  }

  async createCompanyProfile(profileData) {
    try {
        const profile = await this.companyProfileRepository.createCompanyProfile(profileData);
        logger.info(`New company profile created: ${profile._id}`);
        return profile;
      } catch (error) {
        logger.error('Error creating company profile', { 
          error: error.message, 
          stack: error.stack, 
          profileData
      });
        throw error;
      }
  }

  async getCompanyProfileById(id) {
    return this.companyProfileRepository.getCompanyProfileById(id);
  }

  async getAllCompanyProfiles() {
    return this.companyProfileRepository.getAllCompanyProfiles();
  }
}


export default CompanyProfileService;
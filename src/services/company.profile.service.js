import CompanyProfileRepository from "../repository/company.profile.repository.js";

class CompanyProfileService {
  constructor() {
    this.companyProfileRepository = new CompanyProfileRepository();
  }

  async createCompanyProfile(profileData) {
    return this.companyProfileRepository.createCompanyProfile(profileData);
  }

  async getCompanyProfileById(id) {
    return this.companyProfileRepository.getCompanyProfileById(id);
  }

  async getAllCompanyProfiles() {
    return this.companyProfileRepository.getAllCompanyProfiles();
  }
}


export default CompanyProfileService;
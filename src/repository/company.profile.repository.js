import CompanyProfile from "../models/company.profile.model.js";
import NotFound from "../errors/notfound.error.js";

class CompanyProfileRepository {
  async createCompanyProfile(profileData) {
    try {
      const companyProfile = await CompanyProfile.create(profileData);
      return companyProfile;
    } catch (err) {
      throw err;
    }
  }

  async getCompanyProfileById(id) {
    try {
      const companyProfile = await CompanyProfile.findById(id);
      if (!companyProfile) {
        throw new NotFound("CompanyProfile", id);
      }
      return companyProfile;
    } catch (error) {
      throw error;
    }
  }

  async getAllCompanyProfiles() {
    try {
      const companyProfiles = await CompanyProfile.find({});
      return companyProfiles;
    } catch (error) {
      throw error;
    }
  }
}


export default CompanyProfileRepository;

import CompanyUser from "../models/company.user.model.js";

class CompanyUserRepository {
    async createCompanyUser(userData){
        try{
            const companyUser = await CompanyUser.create(userData);
            return companyUser;
            

        }catch(err){
            throw err;
        }
    }

    async getCompanyUserByEmail(email){
        try{
            const companyUser = await CompanyUser.findOne({email});
            return companyUser;
        }catch(err){
            throw err;
        }
    }

    async getCompanyUserByEmailPassword(email){
        try{
            const companyUser = await CompanyUser.findOne({email}).select('+password');
            return companyUser;
        }catch(err){
            throw err;
        }
    }

    async getCompanyUserCount(){
        try{
            const count = await CompanyUser.countDocuments({});
            return count;
        }catch(err){
            throw err;
        }
    }

  }
  
  
  export default CompanyUserRepository;
  
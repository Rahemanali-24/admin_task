import CompanyUserRepository from "../repository/company.user.repository.js";
import logger from "../config/logger.config.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
class CompanyUserService {
  constructor() {
    this.companyUserRepository = new CompanyUserRepository();
  }

  async companyUserRegister(request) {
    try {
      const existingUser =
        await this.companyUserRepository.getCompanyUserByEmail(request.email);
      const userCount = await this.companyUserRepository.getCompanyUserCount();

      if (existingUser) {
        throw new Error("User With This Email Already Exists");
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
      const role = userCount ? request.role || "user" : "admin";

      const user = await this.companyUserRepository.createCompanyUser({
        ...request,
        otp,
        role,
      });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // logger.info(`New company user registered: ${user._id}`);
      logger.info(`New company user registered: ${request}`);
      logger.info(`Using email: ${process.env.EMAIL}`);

      return { user, otp, token };
    } catch (error) {
      // logger.error('Error registering company user', {
      //     error: error.message,
      //     stack: error.stack,
      //     requestBody: request, // Optionally log the request body for debugging
      // });
      logger.error("error", error);
      logger.error("Error during registration", {
        error: err.message,
        stack: err.stack,
        email: process.env.EMAIL, // Log the email to ensure it's correct
      });
      throw error;
    }
  }

  async companyUserLogin(email, password) {
    const user = await this.companyUserRepository.getCompanyUserByEmailPassword(
      email
    );

    if (!user) {
      throw new Error("User Not Found");
    }

    if (!user.password) {
      throw new Error("User Password Not Found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Incorrect Password');
    }


    const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
    );

    return { token, user };
  }
}

export default CompanyUserService;

import CompanyUserRepository from "../repository/company.user.repository.js";
import logger from "../config/logger.config.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from "../config/server.config.js";
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


  async resendOtp(email) {
    const user = await this.companyUserRepository.getCompanyUserByEmail(email);
    if (!user) {
      throw new Error('User Not Found');
    }

    if (user.isVerified) {
      throw new Error('OTP Has Already Been Verified');
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    await this.companyUserRepository.updateUser(user._id, { otp: otp.toString() });

    const htmlFilePath = path.join(process.cwd(), 'src/email-templates', 'otp.html');
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8').replace(/<h1>[\s\d]*<\/h1>/g, `<h1>${otp}</h1>`).replace(/usingyourmail@gmail\.com/g, user.email);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Verify your email',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }


  async sendForgotPasswordEmail(email, origin) {
    const user = await companyUserRepository.getCompanyUserByEmail(email);
    if (!user) {
      throw new Error('User Not Found');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const resetPasswordLink = `${origin}/auth/reset-password/${token}`;
    const htmlFilePath = path.join(process.cwd(), 'src/email-templates', 'forget.html');
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8').replace(/href="javascript:void\(0\);"/g, `href="${resetPasswordLink}"`);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass:EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Reset Password',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return token;
  }


  async verifyOtp(email, otp) {
    const user = await this.companyUserRepository.getCompanyUserByEmail(email);
    if (!user) {
      throw new Error('User Not Found');
    }

    if (user.isVerified) {
      throw new Error('OTP Has Already Been Verified');
    }

    if (otp === user.otp) {
      user.isVerified = true;
      await user.save();
      return 'OTP Verified Successfully';
    } else {
      throw new Error('Invalid OTP');
    }
  }


  async resetPassword(token, newPassword) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid Or Expired Token. Please Request A New One.');
    }

    const user = await this.companyUserRepository.findById(decoded._id);
    if (!user) {
      throw new Error('User Not Found');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new Error('New Password Must Be Different From The Old Password.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await  this.companyUserRepository.updateUser(user._id, { password: hashedPassword });
    return user;
  }
}

export default CompanyUserService;

import CompanyUserService from "../services/company.user.service.js";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config/server.config.js";
import {
	StatusCodes,
} from 'http-status-codes';
class CompanyUserController {
  constructor() {
    this.companyUserService = new CompanyUserService();
  }

  async registerUser(req, res, next) {
    try {
      const { user, otp, token } =
        await this.companyUserService.companyUserRegister(req.body);

      //email sending logic for register

      const htmlFilePath = path.join(
        process.cwd(),
        "src/email-templates",
        "otp.html"
      );
      let htmlContent = fs.readFileSync(htmlFilePath, "utf8");
      htmlContent = htmlContent.replace(
        /<h1>[\s\d]*<\/h1>/g,
        `<h1>${otp}</h1>`
      );
      htmlContent = htmlContent.replace(
        /usingyouremail@gmail\.com/g,
        user.email
      );

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, 
        },
      });

      let mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Verify your email",
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Created User Successfully",
        otp,
        token,
        user,
      });
    } catch (err) {
        next(err);
    }
  }


  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.companyUserService.companyUserLogin(email,password);

      return res.status(200).json({
        success: true,
        message: 'Login Successfully',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}


export default CompanyUserController;
import express from "express";
import companyProfileRouter from "./company.profile.routes";

const v1Router = express.Router();


//example 
// v1Router.use('/problems',problemRouter);(make problem router inside whatever api you have call them)

v1Router.use('/company-profile',companyProfileRouter)

export default v1Router;
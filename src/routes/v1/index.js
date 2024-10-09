import express from "express";
import companyProfileRouter from "./company.profile.routes.js";
import companyUserRouter from "./company.user.routes.js";

const v1Router = express.Router();


//example 
// v1Router.use('/problems',problemRouter);(make problem router inside whatever api you have call them)

v1Router.use('/company',companyProfileRouter)
v1Router.use('/user',companyUserRouter)

export default v1Router;
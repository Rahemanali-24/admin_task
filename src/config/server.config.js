import dotenv from 'dotenv';
dotenv.config();



export const PORT = process.env.PORT || 3000;
export const ATLAS_DB_URL = process.env.ATLAS_DB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const LOG_DB_URL = process.env.LOG_DB_URL;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;



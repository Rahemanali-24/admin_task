import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  websiteAddress: {
    type: String,
  },
  numberOfUsers: {
    type: Number,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanyProfile = mongoose.model('CompanyProfile',companyProfileSchema);
export default CompanyProfile;

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please enter a password'],
      minlength: 8,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a Phone Number.'],
      maxlength: [10, 'Phone cannot be more than 10 characters.'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    //   required: true,
    },
    lastOtpSentAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const CompanyUser = mongoose.models.User || mongoose.model('User', UserSchema);
export default CompanyUser;
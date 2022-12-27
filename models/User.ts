import crypto from "crypto";
import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  stripeId: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  phone: { type: String },
  password: { type: String },
  hash: String,
  salt: String,
  admin: { type: Boolean, default: false },
  terms: { type: Boolean, default: true },
});

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password: string) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};
// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

type Address = {
  line1: string;
  line2?: string;
  postal_code: string;
  city: string;
  country: string;
};

export type UserDocument = {
  name: string;
  email: string;
  address: Address;
  password: string;
  phone?: string;
  hash?: string;
  salt?: string;
  _id?: Types.ObjectId;
  stripeId?: string;
  terms?: boolean;
  admin?: boolean;
  setPassword: (password: string) => void;
  validPassword: (password: string) => boolean;
};

export default module.exports =
  mongoose.models.User || mongoose.model("User", UserSchema);

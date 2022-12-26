import crypto from "crypto";
import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema<UserDocument>({
  email: String,
  password: String,
  hash: String,
  salt: String,
  admin: { type: Boolean, default: false },
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

export type UserDocument = {
  email: string;
  password: string;
  admin: boolean;
  hash: string;
  salt: string;
  _id?: Types.ObjectId;
};

export default module.exports =
  mongoose.models.User || mongoose.model("User", UserSchema);

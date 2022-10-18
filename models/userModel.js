import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//This model handles creating new users
const userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
}, {
	timestapms: true
});

//This method compares the hashed password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

export const Users = mongoose.model("Users", userSchema);

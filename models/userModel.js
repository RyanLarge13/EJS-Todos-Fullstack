import mongoose from "mongoose";

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

export const Users = mongoose.model("Users", userSchema);

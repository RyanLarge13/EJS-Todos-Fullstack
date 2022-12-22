import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You have succesfully connected to the database.");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

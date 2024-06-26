import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const HOST = process.env.MONGODB_HOST;
const OPTIONS = process.env.MONGODB_OPTIONS;

const mongodbURL = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/?${OPTIONS}`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

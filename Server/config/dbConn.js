import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;

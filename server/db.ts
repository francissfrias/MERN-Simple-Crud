import mongoose from 'mongoose';

const DBUrl = process.env.DB!;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DBUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

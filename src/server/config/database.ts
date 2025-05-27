import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://akshay:akshay5152@cluster0.jlcz370.mongodb.net/';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB Atlas successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please check your MongoDB Atlas connection string and make sure your IP is whitelisted');
    return false;
  }
  return true;
}; 
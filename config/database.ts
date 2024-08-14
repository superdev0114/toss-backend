import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGOURL || 'mongodb://0.0.0.0:27017/tossgaem';
    mongoose.set('strictQuery', false);
    await connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;

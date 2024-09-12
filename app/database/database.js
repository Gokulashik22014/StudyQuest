import mongoose from "mongoose";
// track the connection
let isConnected = false;
export const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
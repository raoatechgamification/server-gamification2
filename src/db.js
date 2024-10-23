const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
  try {
    
    const mongoURI = process.env.MONGO_URI

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
  }
}

module.exports = { connectDB }
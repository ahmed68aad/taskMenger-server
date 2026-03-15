const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://ahmed68aad_db_user:2yBaJZYeGO5OuRQa@buildify-dev.jecbjhh.mongodb.net/Tasks-man?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

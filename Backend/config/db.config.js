import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async (retries = 5) => {
  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGO_URI, options);
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) {
        console.error("All connection attempts failed");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDB;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import todoRoute from "./routes/todo.route.js";
import { NODE_ENV, PORT } from "./config/config.js";
import connectDB from "./config/db.config.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://authentication-system-ivory.vercel.app"],
    credentials: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

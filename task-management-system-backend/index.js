import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import taskRoute from "./Routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "./config.env" });
const app = express();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3001", // Frontend origin
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.listen(3000, () => {
  connect();
  console.log("server started!!!");
});

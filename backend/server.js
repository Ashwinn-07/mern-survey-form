import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
// import surveyRoutes from "./routes/surveyRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Connect Database
await connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/surveys", surveyRoutes);
// app.use("/api/admin", adminRoutes);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up!`));

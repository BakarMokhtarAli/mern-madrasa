import express from "express";
import cors from "cors";
import connect from "./backend/config/connection.js";
import globalErrorHandler from "./backend/controllers/errorController.js";

import classRoutes from "./backend/routes/classRoutes.js";
import studentRoutes from "./backend/routes/studentRoutes.js";
import adminRoutes from "./backend/routes/adminRoutes.js";
import authRoutes from "./backend/routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("*", (req, res, next) => {
  const message = `Can't find ${req.originalUrl}. Please make sure you're using the correct API endpoint.`;
  res.status(404).json(message);
});

app.use(globalErrorHandler);
export default app;

import express, { type Express } from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import cookieParser from "cookie-parser";
import farmerRoutes from "./modules/farmer/farmerRoutes.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Consumer Platform Backend" });
});

app.use("/api/farmer", farmerRoutes);

export default app;

import express, { type Express } from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";
import farmerRoutes from "./modules/farmer/farmerRoutes.js";
import productRoutes from "./modules/product/productRoutes.js";

const app: Express = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Consumer Platform Backend" });
});

app.use("/api/farmer", farmerRoutes);

app.use("/api/product", productRoutes);

export default app;

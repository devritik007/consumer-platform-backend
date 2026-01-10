import express, { type Express } from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";
import farmerRoutes from "./modules/farmer/farmerRoutes.js";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const allowedOrigins =
  env.ALLOWED_ORIGINS
    ?.split(",")
    .map(o => o.trim()) || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Consumer Platform Backend" });
});

app.use("/api/farmer", farmerRoutes);

export default app;

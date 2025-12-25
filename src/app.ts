import express, { type Express } from "express";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Consumer Platform Backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

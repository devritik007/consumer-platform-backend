import dotenv from "dotenv";
dotenv.config();
import { env } from "./config/env.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

export function startServer() {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

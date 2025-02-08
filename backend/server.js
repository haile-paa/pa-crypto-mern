import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/db.js";
import { verifyToken } from "./middleware/middleware.js";
import userRouter from "./routes/userRoute.js";
import cryptoRouter from "./routes/cryptoRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://pa-crypto.vercel.app",
];

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    allowedOrigins.includes(req.headers.origin) ? req.headers.origin : ""
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight request
  }

  next();
});

// Middlewares
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API endpoints
app.use("/user", userRouter);
app.use("/crypto", verifyToken, cryptoRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));

// Export for Vercel
export default app;

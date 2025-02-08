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

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://pa-crypto.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

// API endpoints
app.use("/user", userRouter);
app.use("/crypto", verifyToken, cryptoRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));

// Export for Vercel
export default app;

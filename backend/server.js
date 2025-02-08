const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/db.js");
const {
  registerHandler,
  loginHandler,
  cryptoHandler,
} = require("../handlers/handlers.js");
const { verifyToken } = require("../middleware/middleware.js");

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://pa-crypto.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

// Routes
app.post("/register", registerHandler);
app.post("/login", loginHandler);
app.get("/crypto", verifyToken, cryptoHandler);

// Vercel serverless function exports
module.exports = app;

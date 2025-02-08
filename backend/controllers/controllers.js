// controllers/controllers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const axios = require("axios");

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password matches
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Fetch crypto data from CoinGecko API
const fetchCryptoData = async () => {
  try {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

    // Use the API key from the environment
    const apiKey = process.env.COINGECKO_API_KEY;

    const response = await axios.get(url, {
      headers: {
        "x-cg-demo-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching crypto data");
  }
};

// Get crypto data
const getCryptoData = async (req, res) => {
  try {
    const data = await fetchCryptoData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getCryptoData };

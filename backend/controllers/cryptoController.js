import axios from "axios";
import Crypto from "../models/crypto.js";

export const fetchCryptoData = async (req, res) => {
  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Missing API Key" });

    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const response = await axios.get(url, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
      headers: {
        "x-cg-demo-api-key": apiKey,
      },
    });

    await Crypto.deleteMany();
    await Crypto.insertMany(response.data);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching crypto data" });
  }
};

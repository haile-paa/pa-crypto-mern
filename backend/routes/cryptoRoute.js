import express from "express";
import { fetchCryptoData } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", fetchCryptoData);

export default router;

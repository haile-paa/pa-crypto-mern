import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;

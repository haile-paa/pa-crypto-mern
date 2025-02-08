// handlers/handlers.js
const {
  registerUser,
  loginUser,
  getCryptoData,
} = require("./controllers/controllers.js");

const registerHandler = (req, res) => {
  registerUser(req, res);
};

const loginHandler = (req, res) => {
  loginUser(req, res);
};

const cryptoHandler = (req, res) => {
  getCryptoData(req, res);
};

module.exports = { registerHandler, loginHandler, cryptoHandler };

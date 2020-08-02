const { Router } = require("express");
const AuthController = require("../controllers/authController");

module.exports = () => {
  const api = Router();

  api.post("/Register", AuthController.register);

  return api;
};

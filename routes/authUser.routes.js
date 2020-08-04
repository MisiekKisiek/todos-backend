const { Router } = require("express");
const AuthController = require("../controllers/authController");
const passport = require("passport");

module.exports = () => {
  const api = Router();

  api.post("/Register", AuthController.register);

  api.post('/Login', passport.authenticate('local', { session: false }), AuthController.login)

  return api;
};

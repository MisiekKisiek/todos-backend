const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { login, email, password } = req.body;

  const user = new User({ login, email });

  await User.register(user, password, (err) => {
    if (err) {
      if (err.code === 11000) {
        console.log(err);
        res.json("Email is already in use");
      } else {
        console.log(err);
        res.json(err.message);
      }
    } else {
      console.log("User has been registered successfully");
      res.json("User has been registered successfully");
    }
  });
}

async function login(req, res, next) {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: 100000,
  });
  const user = req.user.login;
  const email = req.user.email;
  res.send({ token, user, email });
}

module.exports = { register, login };
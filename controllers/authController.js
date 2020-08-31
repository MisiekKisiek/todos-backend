const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { login, email, password } = req.body;
  console.log(req.body);

  const user = new User({ login, email });

  await User.register(user, password, (err) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("User has been added successfully.");
    }
  });
  res.json("Użytkownik został zarejestrowany");
  next();
}

async function login(req, res, next) {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: 10000,
  });
  res.send({ token });
}

module.exports = { register, login };

const User = require("../models/user.model");

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

module.exports = { register };

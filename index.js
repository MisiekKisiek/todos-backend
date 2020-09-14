const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const dbConfig = require("./config/database.config");

//MIDDLEWARES
const jwtAuth = require("./middlewares/auth.middleware");

//STRATEGY
const passport = require("./config/passport.config");
passport();

//ROUTES
const authRoutes = require("./routes/authUser.routes");
const taskRoutes = require("./routes/task.routes");

mongoose.connect(dbConfig.mongoURL, dbConfig.settings);
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database");
  process.exit();
});

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "front", "build")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes());

app.use("/tasks", jwtAuth, taskRoutes());

app.listen(8000, (err) => {
  if (err) {
    console.log("Jakiś błąd", err);
  } else {
    console.log("Serwer działa.");
  }
});

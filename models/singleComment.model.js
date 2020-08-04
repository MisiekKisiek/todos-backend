const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const SingleTaskSchema = new mongoose.Schema({
  task: String,
  deadline: String,
});

module.exports = mongoose.model("SingleTask", SingleTaskSchema);

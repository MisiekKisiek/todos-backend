const mongoose = require("mongoose");

const SingleTaskSchema = new mongoose.Schema({
  task: String,
  deadline: String,
  checked: Boolean
});

module.exports = mongoose.model("SingleTask", SingleTaskSchema);

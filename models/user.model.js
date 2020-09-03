const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const SingleTaskSchema = new mongoose.Schema({
  task: String,
  deadline: String,
  checked: Boolean
});

const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true, lowercase: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  tasks: [SingleTaskSchema],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "login" });

module.exports = mongoose.model("UserToDo", UserSchema);

// module.exports = mongoose.model("SingleTask", SingleTaskSchema);

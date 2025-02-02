const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema(
  {
    Name: { type: String, required: true},
    Email: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);
const User=mongoose.model("User", users);
module.exports = {user:User}
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminShcema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", adminShcema);
module.exports = Admin;

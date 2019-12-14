const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 4
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 4
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    },
    cart: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Shirt" },
        count: Number,
        price: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

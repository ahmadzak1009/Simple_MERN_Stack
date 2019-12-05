const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shirtSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colors: Array,
    sizes: Array,
    img: { type: String, default: "default.jpg" },
    stock: Number
  },
  {
    timestamps: true
  }
);

const Shirt = mongoose.model("Shirt", shirtSchema);

module.exports = Shirt;

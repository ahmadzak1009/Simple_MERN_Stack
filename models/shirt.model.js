const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shirtSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: Array,
  size: Array,
  img: { type: String, default: "default.jpg" }
});

const Shirt = mongoose.model("Shirt", shirtSchema);

module.exports = Shirt;

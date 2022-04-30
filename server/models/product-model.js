const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 10 },
});

module.exports = mongoose.model("products", Product);

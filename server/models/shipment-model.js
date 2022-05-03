const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shipment = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    products: {
      type: [
        {
          product_id: { type: Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, minimum: 0 },
          product_name: String,
        },
      ],
      required: true,
      validate: (p) => Array.isArray(p) && p.length > 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shipments", Shipment);

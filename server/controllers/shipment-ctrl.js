const Shipment = require("../models/shipment-model");
const Product = require("../models/product-model");

const createShipment = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a shipment",
    });
  }

  for (var i = 0; i < body.products.length; i++) {
    if (body.products.at(i).product_id == "NONE") {
      body.products.splice(i, 1);
    }
  }
  const shipment = new Shipment(body);

  if (!shipment) {
    return res.status(400).json({ success: false, error: err });
  }

  shipment
    .save()
    .then(() => {
      for (let i = 0; i < body.products.length; i++) {
        Product.findOne({ _id: body.products.at(i).product_id }, (err, product) => {
          if (err) {
            return res.status(404).json({
              err,
              message: "Product not found!",
            });
          }
          product.quantity -= body.products.at(i).quantity;
          product.save().catch((error) => {
            console.log(error);
          });
        });
      }
      return res.status(201).json({
        success: true,
        id: shipment._id,
        message: "Shipment created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Shipment not created!",
      });
    });
};

const deleteShipment = async (req, res) => {
  await Shipment.findOneAndDelete({ _id: req.params.id })
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).json({ success: false, error: `Shipment not found` });
      }

      return res.status(200).json({ success: true, data: shipment });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    });
};

const getShipmentById = async (req, res) => {
  await Shipment.findOne({ _id: req.params.id })
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).json({ success: false, error: `Shipment not found` });
      }

      return res.status(200).json({ success: true, data: shipment });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    });
};

const getShipments = async (req, res) => {
  await Shipment.find({})
    .then((shipments) => {
      if (!shipments.length) {
        return res.status(404).json({ success: false, error: `Shipment not found` });
      }

      return res.status(200).json({ success: true, data: shipments });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  createShipment,
  deleteShipment,
  getShipments,
  getShipmentById,
};

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Add product router
const productRouter = require("./routes/product-router");
app.use("/api", productRouter);

// Add shipment router
const shipmentRouter = require("./routes/shipment-router");
app.use("/api", shipmentRouter);

module.exports = app;

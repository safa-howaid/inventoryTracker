const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Required express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Add product router
const productRouter = require("./routes/product-router");
app.use("/api", productRouter);

// Add shipment router
const shipmentRouter = require("./routes/shipment-router");
app.use("/api", shipmentRouter);

// React production build static hosting
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const productRouter = require("./routes/product-router");
const shipmentRouter = require("./routes/shipment-router");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", productRouter);
app.use("/api", shipmentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

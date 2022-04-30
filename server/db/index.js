const mongoose = require("mongoose");
require("dotenv").config();

const DB_NAME = "onlineStore";

const uri =
  "mongodb+srv://" +
  process.env["MONGO_PASSWORD"] +
  ":" +
  process.env["MONGO_PASSWORD"] +
  "@inventorytracker.brkbr.mongodb.net/" +
  DB_NAME +
  "?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;

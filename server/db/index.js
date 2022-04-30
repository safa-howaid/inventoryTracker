const mongoose = require("mongoose");
const DB_NAME = "onlineStore";

mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;

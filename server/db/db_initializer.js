const mongoose = require("mongoose");
const faker = require("@faker-js/faker").faker;
const Product = require("../models/product-model");
const DB_NAME = "onlineStore";

const numOfProducts = 5;

mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log("database is connected successfully");
});
db.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
db.on("error", console.error.bind(console, "connection error:"));

function createProducts() {
  products = [];
  for (var i = 0; i < numOfProducts; i++) {
    let productObject = new Product({
      name: faker.commerce.productName(),
      department: faker.commerce.department(),
      color: faker.commerce.color(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      quantity: faker.datatype.number({ min: 10, max: 100 }),
    });
    products.push(productObject);
  }

  return products;
}

db.once("open", function () {
  db.dropDatabase(async function (err, result) {
    if (err) {
      console.log("Error dropping database:");
      console.log(err);
      return;
    }
    console.log("Dropped database. Starting re-creation.");

    //Add all of the product documents to the database
    await Product.insertMany(createProducts())
      .catch((err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
      .then((result) => {
        console.log("All " + result.length + " products were added.");
        db.close();
      });
  });
});

// console.log(faker.commerce.productName());
// console.log(faker.commerce.department());
// console.log(faker.commerce.color());
// console.log(faker.commerce.productDescription());
// console.log(faker.commerce.price())

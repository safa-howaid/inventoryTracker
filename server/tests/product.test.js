const app = require("../app.js");
const request = require("supertest");
const mongoose = require("mongoose");
const DB_NAME = "test";
require("dotenv").config();
const Product = require("../models/product-model");

const sampleProduct = {
  name: "Tote Bag",
  department: "Accessories",
  color: "Brown",
  price: 40,
  description: "The coolest tote bag ever",
  quantity: 10,
};

const sampleInvalidProduct1 = {
  name: "High Heels",
  department: "Shoes",
  price: 50,
  description: "The coolest heels ever",
  quantity: 10,
};

const sampleProductChanged = {
  name: "Tote Bag",
  department: "Accessories",
  color: "Green",
  price: 40,
  description: "The coolest tote bag ever",
  quantity: 10,
};

beforeAll(async () => {
  const uri =
    "mongodb+srv://" +
    process.env["MONGO_USERNAME"] +
    ":" +
    process.env["MONGO_PASSWORD"] +
    "@inventorytracker.brkbr.mongodb.net/" +
    DB_NAME +
    "?retryWrites=true&w=majority";
  await mongoose.connect(uri, { useNewUrlParser: true });
});

describe("POST /product", () => {
  describe("when passed invalid product details", () => {
    test("should not save the product in the database", async () => {
      const response = await request(app).post("/api/product").send(sampleInvalidProduct1);
      const product = await Product.findOne({ name: sampleInvalidProduct1.name });
      expect(product).toBeFalsy();
    });

    test("should respond with a 400 status code", async () => {
      const response = await request(app).post("/api/product").send(sampleInvalidProduct1);
      expect(response.statusCode).toBe(400);
    });

    test("should respond with a json object that contains an error message", async () => {
      const response = await request(app).post("/api/product").send(sampleInvalidProduct1);
      expect(response.body.message).toBe("Product not created!");
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).post("/api/product").send(sampleInvalidProduct1);
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });

  describe("when passed valid product details", () => {
    test("should save the product in the database", async () => {
      const response = await request(app).post("/api/product").send(sampleProduct);
      const product = await Product.findOne({ name: sampleProduct.name });
      expect(product.name).toBeTruthy();
      expect(product.department).toBeTruthy();
      expect(product.color).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.quantity).toBeTruthy();
    });

    test("should respond with a 201 status code", async () => {
      const response = await request(app).post("/api/product").send(sampleProduct);
      expect(response.statusCode).toBe(201);
    });

    test("should respond with a json object that contains the id from the database", async () => {
      const response = await request(app).post("/api/product").send(sampleProduct);
      expect(response.body.id).toBeTruthy();
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).post("/api/product").send(sampleProduct);
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });

  describe("when passed empty body", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).post("/api/product").send();
      expect(response.statusCode).toBe(400);
    });

    test("should respond with a json object that contains an error message", async () => {
      const response = await request(app).post("/api/product").send();
      expect(response.body.message).toBe("Product not created!");
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).post("/api/product").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});

describe("GET /products", () => {
  describe("when inventory contains products", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/products").send();
      expect(response.statusCode).toBe(200);
    });

    test("should respond with a json object that contains a list of products", async () => {
      const response = await request(app).get("/api/products").send();
      expect(response.body.data).toBeTruthy();
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).get("/api/products").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});

describe("GET /product:id", () => {
  describe("when the product with the specified id exists", () => {
    test("should respond with a 200 status code", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .get("/api/product/" + product._id.toString())
        .send();
      expect(response.statusCode).toBe(200);
    });

    test("should respond with a json object that contains product with the specified id", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .get("/api/product/" + product._id.toString())
        .send();
      expect(response.body.data.name).toEqual(sampleProduct.name);
      expect(response.body.data.department).toEqual(sampleProduct.department);
      expect(response.body.data.color).toEqual(sampleProduct.color);
      expect(response.body.data.price).toEqual(sampleProduct.price);
      expect(response.body.data.quantity).toEqual(sampleProduct.quantity);
    });

    test("should specify json as the content type in the http header", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .get("/api/product/" + product._id.toString())
        .send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });

  describe("when the product with the specified id does not exist", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request(app).get("/api/product/626faa77e898b740c402eb23").send();
      expect(response.statusCode).toBe(404);
    });

    test("should respond with a json object that contains an error message", async () => {
      const response = await request(app).get("/api/product/626faa77e898b740c402eb23").send();
      expect(response.body.error).toBe("Product not found");
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).get("/api/product/626faa77e898b740c402eb23").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});

describe("PUT /product:id", () => {
  describe("when the product with the specified id exists", () => {
    test("should reflect the change in the database", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .put("/api/product/" + product._id.toString())
        .send(sampleProductChanged);

      const changedProduct = await Product.findOne({ _id: product._id.toString() });
      expect(changedProduct.color).toBe(sampleProductChanged.color);
    });

    test("should respond with a 200 status code", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .put("/api/product/" + product._id.toString())
        .send(sampleProductChanged);
      expect(response.statusCode).toBe(200);
    });

    test("should respond with a json object that contains the product id and a success message", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .put("/api/product/" + product._id.toString())
        .send(sampleProductChanged);
      expect(response.body.message).toBe("Product updated!");
      expect(response.body.id).toBe(product._id.toString());
    });

    test("should specify json as the content type in the http header", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .put("/api/product/" + product._id.toString())
        .send(sampleProductChanged);
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });

  describe("when the product with the specified id does not exist", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request(app).put("/api/product/626faa77e898b740c402eb23").send(sampleProductChanged);
      expect(response.statusCode).toBe(404);
    });

    test("should respond with a json object that contains an error message", async () => {
      const response = await request(app).put("/api/product/626faa77e898b740c402eb23").send();
      expect(response.body.message).toBe("Product not found!");
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).put("/api/product/626faa77e898b740c402eb23").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});

describe("DELETE /product:id", () => {
  describe("when the product with the specified id exists", () => {
    test("should be removed from the database", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .delete("/api/product/" + product._id.toString())
        .send();
      const deleted_product = await Product.findOne({ _id: product._id.toString() });
      expect(deleted_product).toBeFalsy();
    });

    test("should respond with a 200 status code", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .delete("/api/product/" + product._id.toString())
        .send();
      expect(response.statusCode).toBe(200);
    });

    test("should respond with a json object that contains product with the specified id", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .delete("/api/product/" + product._id.toString())
        .send();
      expect(response.body.data._id).toEqual(product._id.toString());
    });

    test("should specify json as the content type in the http header", async () => {
      const product = await Product.findOne({ name: sampleProduct.name });
      const response = await request(app)
        .delete("/api/product/" + product._id.toString())
        .send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });

  describe("when the product with the specified id does not exist", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request(app).delete("/api/product/626faa77e898b740c402eb23").send();
      expect(response.statusCode).toBe(404);
    });

    test("should respond with a json object that contains an error message", async () => {
      const response = await request(app).delete("/api/product/626faa77e898b740c402eb23").send();
      expect(response.body.error).toBe("Product not found");
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app).delete("/api/product/626faa77e898b740c402eb23").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});

afterAll(async () => {
  await Product.deleteMany();
  mongoose.connection.close();
});

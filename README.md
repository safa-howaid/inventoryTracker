# InventoryTracker

Hello! Thank you for taking the time to look through my submission for Shopify's Fall 2022 Backend Challenge.

This web applicaiton was built with a NodeJS and Express backend using a MongoDB database along with a React frontend.

## To Run Locally

Run the following to start the server:

- `cd server`
- `npm run start`

Type in [localhost:8000](http://localhost:8000/) into a browser to view the application.

## To Run Rests

Some tests were developed for the backend server using Jest and Supertest.
Use `npm run test` to run the tests and view the results.

## API Documentation

| Method |     Endpoint      |                                  Purpose                                  |
| :----: | :---------------: | :-----------------------------------------------------------------------: |
|  GET   |   /api/products   |                    Retrieves all products in inventory                    |
|  GET   | /api/product/:id  |                Retrieves the product with the specified id                |
|  POST  |   /api/product    |                             Creates a product                             |
| DELETE | /api/product/:id  |                 Deletes the product with the specified id                 |
|  PUT   | /api/product/:id  |                 Updates the product with the specified id                 |
|        |                   |                                                                           |
|  GET   |  /api/shipments   |                    Retrieves all shipment information                     |
|  GET   | /api/shipment/:id |               Retrieves the shipment with the specified id                |
|  POST  |   /api/shipment   | Creates a shipment and updates quantities of products within the shipment |
| DELETE | /api/shipment/:id |                Deletes the shipment with the specified id                 |

# InventoryTracker

Hello! Thank you for taking the time to look through my submission for Shopify's Fall 2022 Backend Challenge!

This web applicaiton was built with a NodeJs and Express backend with MongoDB for the database. I also used React for the frontend.

Check out [this Replit link](https://25f9ce7e-58ed-462c-ac6d-0d4bc9040465.id.repl.co) to view the web app in action.

## To Run Locally

**Note**: Ensure that you have the latest version of [Node.js](https://nodejs.org/en/download/) and NPM installed (I'm using v16.14.0).

- Run the following to install server dependencies:

  - `cd server`
  - `npm install`

- Run the following to start the server:

  - `cd server`
  - `npm run start`

Type in [localhost:8000](http://localhost:8000/) into a browser to view the application.

## To Run Tests

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


## Source Tree
```
.
├── README.md
├── babel.config.js
├── client                                 (Directory containing all client-related code)
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── api                            (Exported functions for client API calls via Axios)
│       │   └── index.js
│       ├── app                            (Web application route<->page connections using the react-router-dom library)
│       │   └── index.js
│       ├── components                     (Custom React JSX Components for front-end)
│       │   ├── Links.jsx
│       │   ├── NavBar.jsx
│       │   ├── ProductCard.jsx
│       │   ├── ShipmentCard.jsx
│       │   └── index.js
│       ├── index.js
│       └── pages                          (React class components for the different UI views of the web app)
│           ├── Main.jsx
│           ├── ProductsInsert.jsx
│           ├── ProductsList.jsx
│           ├── ProductsUpdate.jsx
│           ├── ShipmentsInsert.jsx
│           ├── ShipmentsList.jsx
│           └── index.js
│
├── jest.config.js
├── package-lock.json
├── package.json
└── server                                  (Directory containing all server-related code)
    ├── app.js
    ├── build                               (React client production build for static serving)
    ├── controllers
    │   ├── product-ctrl.js
    │   └── shipment-ctrl.js
    ├── db
    │   ├── db_initializer.js               (Script to initialize database with sample product data)
    │   └── index.js
    ├── index.js
    ├── models                              (Mongoose Schemas for Data Models)
    │   ├── product-model.js
    │   └── shipment-model.js
    ├── routes
    │   ├── product-router.js
    │   └── shipment-router.js
    └── tests                               (Jest/Supertest API tests)
        └── product.test.js
```

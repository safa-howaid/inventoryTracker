# InventoryTracker

Hello! Thank you for taking the time to look through my submission for Shopify's Fall 2022 Backend Challenge!

This web applicaiton was built with a NodeJs and Express backend with MongoDB for the database. I also used React for the frontend.

Check out [this Replit link](https://25f9ce7e-58ed-462c-ac6d-0d4bc9040465.id.repl.co) to view the web app in action.

## To Run Locally

**Notes**: 
- Ensure that you have the latest version of [Node.js](https://nodejs.org/en/download/) and NPM installed (I'm using v16.14.0).
- The project is split into client and server applications, so for development, the React server and the Node.js Backend server can be ran separately.
  - To do that open two terminals and do the following:
    - Run `cd server`, `npm install`, then `npm run start` to start the backend server in one terminal. 
    - Run `cd client`, `npm install`, then `npm run start` to start the React server in another terminal. 
    - Type [localhost:3000](http://localhost:3000/) into a browser to view the application.
 - For the above to work, ensure that line 4 in `client/api` points to `http://localhost:8000/api` AND the proxy setting in `client/package.json` points to `http://localhost:8000`


To create a production build of the React application so that it can be statically served by the Node.js Backend server (from root directory of the repository):
  - `cd client`
  - `npm install`
  - `npm run build`
  - `mv build ../server/build`
  - `cd ../server`
  - `npm install`
  - `npm run start`
  - Type [localhost:8000](http://localhost:8000/) into a browser to view the application.
 
See https://create-react-app.dev/docs/deployment/ for more details on React deployment.

## To Run Tests

Some tests were developed for the backend server using Jest and Supertest.

Use `npm run test` to run the tests and view the results after cloning the repository.

OR (Easier way)

- Use [this replit link](https://replit.com/join/ortomulerk-safahowaid) to get access to the machine hosting the server. 
- Click on the shell and run `npm run test` to execute the jest test suite.

| Shell to run test in |     Sample Test Run      |
| :----: | :---------------: | 
|  <img width="588" alt="Screen Shot 2022-05-02 at 5 15 47 PM" src="https://user-images.githubusercontent.com/58123610/166329032-7383f46a-a09e-413d-864b-20429d24b393.png">   |   <img width="588" alt="Screen Shot 2022-05-02 at 5 16 35 PM" src="https://user-images.githubusercontent.com/58123610/166329147-b97502f0-f5de-4d77-a443-d711c8540a36.png">  |



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
    ├── app.js                              (Main server logic)
    ├── build                               (React client production build for static serving)
    ├── controllers                         (Controller functions to get the requested data from the models and return the appropriate response)
    │   ├── product-ctrl.js
    │   └── shipment-ctrl.js
    ├── db
    │   ├── db_initializer.js               (Script to initialize database with sample product data)
    │   └── index.js                        (MongoDB connection handler functions)
    ├── index.js  
    ├── models                              (Mongoose Schemas for Data Models)
    │   ├── product-model.js
    │   └── shipment-model.js
    ├── routes                              (Routers that forward the supported requests to the appropriate controller functions)
    │   ├── product-router.js
    │   └── shipment-router.js
    └── tests                               (Jest/Supertest API tests)
        └── product.test.js
```

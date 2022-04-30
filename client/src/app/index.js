import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "../components";
import { ProductsList, ProductsInsert, ProductsUpdate, ShipmentsList, ShipmentsInsert } from "../pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/products/" exact element={<ProductsList />} />
        <Route path="/products/create" exact element={<ProductsInsert />} />
        <Route path="/products/update/:id" exact element={<ProductsUpdate />} />
        <Route path="/shipments/" exact element={<ShipmentsList />} />
        <Route path="/shipments/create" exact element={<ShipmentsInsert />} />
      </Routes>
    </Router>
  );
}

export default App;

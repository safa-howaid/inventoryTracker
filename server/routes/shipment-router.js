const express = require("express");

const ShipmentCtrl = require("../controllers/shipment-ctrl");

const router = express.Router();

router.post("/shipment", ShipmentCtrl.createShipment);
router.put("/shipment/:id", ShipmentCtrl.updateShipment);
router.delete("/shipment/:id", ShipmentCtrl.deleteShipment);
router.get("/shipment/:id", ShipmentCtrl.getShipmentById);
router.get("/shipments", ShipmentCtrl.getShipments);

module.exports = router;

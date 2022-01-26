const express = require("express");
const router = express.Router();
const facetsController = require("../controllers/facetsController")

router.get("/cities", facetsController.getCities);

router.get("/types", facetsController.getTypes);

router.get("/amenities", facetsController.getAmenities);

module.exports = router;
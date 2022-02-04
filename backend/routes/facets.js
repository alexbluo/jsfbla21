const express = require("express");
const router = express.Router();
const facetsController = require("../controllers/facetsController");

router.get("/region", facetsController.getRegions);

router.get("/city", facetsController.getCities);

router.get("/category", facetsController.getCategories);

router.get("/amenity", facetsController.getAmenities);

module.exports = router;

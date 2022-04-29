const express = require("express");
const router = express.Router();
const filtersController = require("../controllers/filtersController");

router.get("/region", filtersController.getRegions);

router.get("/city", filtersController.getCities);

router.get("/category", filtersController.getCategories);

router.get("/amenity", filtersController.getAmenities);

module.exports = router;

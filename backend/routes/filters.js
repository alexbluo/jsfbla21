const express = require("express");
const filtersController = require("../controllers/filtersController");

const router = express.Router();

router.get("/region", filtersController.getRegions);

router.get("/city", filtersController.getCities);

router.get("/category", filtersController.getCategories);

router.get("/amenities", filtersController.getAmenities);

module.exports = router;

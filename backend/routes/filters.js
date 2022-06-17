const express = require("express");
const {
  getRegions,
  getCities,
  getCategories,
  getAmenities,
} = require("../controllers/filtersController");

const router = express.Router();

router.get("/region", getRegions);

router.get("/city", getCities);

router.get("/category", getCategories);

router.get("/amenities", getAmenities);

module.exports = router;

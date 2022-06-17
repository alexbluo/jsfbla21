const express = require("express");
const {
  getByFilter,
  getByDistance,
  getByID,
} = require("../controllers/attractionsController");

const router = express.Router();

router.get("/", getByFilter);

router.get("/near", getByDistance);

// this route is dynamic so it has to be last for the others to work
router.get("/:id", getByID);

module.exports = router;

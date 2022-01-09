const express = require("express");
const router = express.Router;
const detailsController = require("../controllers/detailsController");

router.get("/api/attractions", (req, res, next) =>
  detailsController.getAll(req, res)
);

// currently not being used... too many errors
module.exports = router;

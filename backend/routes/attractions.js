const express = require("express");
const router = express.Router();
const attractionsController = require("../controllers/attractionsController");

router.get("/", attractionsController.getOrMatchAll);

router.get("/:id", attractionsController.getOne);

router.get("/near", attractionsController.getNear);

module.exports = router;

const express = require("express");
const router = express.Router();
const attractionsController = require("../controllers/attractionsController");

router.get("/", attractionsController.getOrMatchAll);

router.get("/near", attractionsController.getNear);

router.get("/:id", attractionsController.getOne);

module.exports = router;

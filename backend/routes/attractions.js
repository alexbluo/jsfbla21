const express = require("express");
const attractionsController = require("../controllers/attractionsController");

const router = express.Router();

router.get("/", attractionsController.getByFilter);

router.get("/near", attractionsController.getByDistance);

// this route has to be last for the others to work
router.get("/:id", attractionsController.getByID);

module.exports = router;

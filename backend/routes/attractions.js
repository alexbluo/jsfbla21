const express = require("express");
const router = express.Router();
const attractionsController = require("../controllers/attractionsController");

router.get("/", attractionsController.getByFilter);

router.get("/search", attractionsController.getBySearch);

router.get("/near", attractionsController.getByDistance);

// this route has to be last for the others to work
router.get("/:id", attractionsController.getByID);

module.exports = router;

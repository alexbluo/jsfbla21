const express = require("express");
const router = express.Router();
const attractionsController = require("../controllers/attractionsController");

router.get("/", attractionsController.matchAll);

router.get("/near", attractionsController.getNear);

router.get("/search", attractionsController.search);

// this route has to be last for the others to work
router.get("/:id", attractionsController.getOne);


module.exports = router;

const express = require("express");
const app = express();

const detailsController = require("./controllers/detailsController");

app.get("/api/attractions", (req, res) => detailsController.getAll(req, res));
app.get("/api/attractions/:id", (req, res) => detailsController.getOne(req, res));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

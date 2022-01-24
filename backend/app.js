const express = require("express");
const app = express();
const detailsModel = require("./models/detailsModel");

app.get("/api/attractions", (req, res) =>
  detailsModel.getAll((data) => res.send(data))
);
app.get("/api/attractions/:id", (req, res) =>
  detailsModel.getOne(req.params.id, (data) => res.send(data))
);

app.get("/api/facets/city", (req, res) =>
  detailsModel.getCities((data) => res.send(data))
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

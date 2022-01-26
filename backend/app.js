const express = require("express");
const app = express();
const { getAll, getOne } = require("./models/attractionsModel");
const { getCities, getTypes, getAmenities } = require("./models/facetsModel");

app.get("/api/attractions", (req, res) => getAll((data) => res.send(data)));

app.get("/api/attractions/:id", (req, res) =>
  getOne(req.params.id, (data) => res.send(data))
);


// app.get("/api/attractions", (req, res) => 
// is this needed or can i just use query params on first get
// prob not, need to search up
// );

app.get("/api/facets/cities", (req, res) =>
  getCities((data) => res.send(data))
);

app.get("/api/facets/types", (req, res) => getTypes((data) => res.send(data)));

app.get("/api/facets/amenities", (req, res) =>
  getAmenities((data) => res.send(data))
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

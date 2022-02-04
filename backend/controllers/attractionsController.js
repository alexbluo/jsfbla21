const attractionsModel = require("../models/attractionsModel");

exports.getOrMatchAll = (req, res) => {
  if (checkQuery(req.query)) {
    attractionsModel.matchAll(req.query, (data) => res.send(data))
  } else {
    attractionsModel.getAll((data) => res.send(data));
  }
  console.log(req.query)  
};

exports.getOne = (req, res) => {
  attractionsModel.getOne(req.params.id, (data) => res.send(data));
};

function checkQuery(query) {
  const validValueSet = new Set(["regions", "cities", "types", "amenities"]);
  const values = Object.values(query);
  return values.some(value => validValueSet.has(value));
}

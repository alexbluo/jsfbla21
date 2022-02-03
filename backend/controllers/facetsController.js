const facetsModel = require("../models/facetsModel");

exports.getRegions = (req, res) => {
  res.send({
    regions: [
      "Capital Region",
      "Central Maryland",
      "Eastern Shore",
      "Southern Maryland",
      "Western Maryland",
    ],
  });
}

exports.getCities = (req, res) => {
  facetsModel.getCities((data) => res.send(data));
};

exports.getTypes = (req, res) => {
  facetsModel.getTypes((data) => res.send(data));
};

exports.getAmenities = (req, res) => {
  facetsModel.getAmenities((data) => res.send(data));
};

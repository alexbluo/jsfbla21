const filtersModel = require("../models/filtersModel");

exports.getRegions = (req, res) => {
  res.send({
    region: [
      "Capital Region",
      "Central Maryland",
      "Eastern Shore",
      "Southern Maryland",
      "Western Maryland",
    ],
  });
};

exports.getCities = (req, res) => {
  filtersModel.getCities((data) => res.send(data));
};

exports.getCategories = (req, res) => {
  filtersModel.getCategories((data) => res.send(data));
};

exports.getAmenities = (req, res) => {
  filtersModel.getAmenities((data) => res.send(data));
};

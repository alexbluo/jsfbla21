const facetsModel = require("../models/facetsModel");

exports.getCities = (req, res) => {
  facetsModel.getCities((data) => res.send(data));
};

exports.getTypes = (req, res) => {
  facetsModel.getTypes((data) => res.send(data));
};

exports.getAmenities = (req, res) => {
  facetsModel.getAmenities((data) => res.send(data));
};

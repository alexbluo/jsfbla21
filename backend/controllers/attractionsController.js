const attractionsModel = require("../models/attractionsModel")

exports.getOrMatchAll = (req, res) => { // change function name to getAllorMatch and only query once instead of getting all and filtering
  attractionsModel.getAll((data) => res.send(data));
  // res.send(data);
}

exports.getOne = (req, res) => {
  attractionsModel.getOne(req.params.id, (data) => res.send(data));
}
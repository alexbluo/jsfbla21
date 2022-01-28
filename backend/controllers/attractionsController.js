const attractionsModel = require("../models/attractionsModel")

exports.getAll = (req, res) => {
  console.log(req.query.test);
  attractionsModel.getAll((data) => res.send(data));
}

exports.getOne = (req, res) => {
  attractionsModel.getOne(req.params.id, (data) => res.send(data));
}
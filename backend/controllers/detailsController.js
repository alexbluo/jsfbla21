const detailsModel = require("../models/detailsModel");

function getAll(req, res) {
  // detailsModel.getAll((data) => console.log(data))
  detailsModel.getAll((data) => res.send(data));
}

function getOne(req, res) {
  detailsModel.getOne(req.params.id, (data) => res.send(data));
}

module.exports = {
  getAll,
  getOne,
};

const detailsModel = require("../models/detailsModel")

function getAll(req, res) {
  detailsModel.getAll((data) => console.log(data))
  detailsModel.getAll((data) => res.send(data))
}

function getOne(req, res) {
  res.send(detailsModel.getOne(req.params.id))
}
module.exports = {
  getAll,
  getOne,
}

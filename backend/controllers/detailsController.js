const detailsModel = require("../models/detailsModel")

function getAll(req, res) {
  res.send(detailsModel.getAll())
}

function getOne(req, res) {
  res.send(detailsModel.getOne(req.params.id))
}
module.exports = {
  getAll,
  getOne,
}

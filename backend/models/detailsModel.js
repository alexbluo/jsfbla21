const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

function getAll(callback) {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find()
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
}

function getOne(id) {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .findOne({ attraction_id: id })
      .then((doc) => data.push(doc));
    client.close();
    callback(data);
  });
  return data;
}

module.exports = {
  getAll,
  getOne,
};

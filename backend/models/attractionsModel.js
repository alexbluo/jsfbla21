const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.matchAll = (query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find(query)
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
};

exports.getAll = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find()
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
};

exports.getOne = (id, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const data = await db
      .collection("attractions")
      .findOne({ attraction_id: id });
    client.close();
    callback(data);
  });
};

exports.getNear = (query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find({
        coordinates: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(query.lng), parseFloat(query.lat)],
            },
            $maxDistance: parseInt(query.searchRadius),
          },
        },
      })
      .forEach((doc) => data.push(doc));
      console.log(data.length)
    client.close();
    callback(data);
  });
};

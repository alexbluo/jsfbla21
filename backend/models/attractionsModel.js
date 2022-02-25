const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const nPerPage = 8;

exports.matchAll = (pageNumber, query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find(query)
      .sort({ attraction_name: 1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .forEach((doc) => data.push(doc));
    if (data.length === 0) data = null;
    client.close();
    callback(data);
  });
};

exports.getAll = (pageNumber, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find()
      .sort({ attraction_name : 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage)
      .forEach((doc) => data.push(doc));
    if (data.length === 0) data = null;
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
    client.close();
    callback(data);
  });
};

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const nPerPage = 8;

exports.matchAll = (pageNumber, query, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find(query)
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage)
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
};

exports.getAll = (pageNumber, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [], totalPageCount: null };
    const db = await client.db("attractionsDB");
    const collection = await db.collection("attractions");
    const cursor = await collection.find();
    await cursor
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage)
      .forEach((doc) => data.previewData.push(doc));
    data.totalPageCount = await db.collection("attractions").countDocuments();
    client.close();
    callback(data);
  });
};

exports.getOne = (id, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const data = await db
      .collection("attractions")
      .findOne({ attraction_id: id });
    client.close();
    callback(data);
  });
};

exports.getNear = (query, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
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

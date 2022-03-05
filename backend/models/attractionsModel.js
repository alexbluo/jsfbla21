const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.matchAll = (pageNumber, query, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [] };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection
      .find(query)
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage);
    
    await cursor.forEach((doc) => data.previewData.push(doc));
    data.hasNext = await cursor.hasNext();

    console.log(await cursor.hasNext())

    client.close();
    callback(data);
  });
};

exports.getAll = (pageNumber, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [] };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection
      .find()
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage);
    await cursor.forEach((doc) => data.previewData.push(doc));
    data.hasNext = await cursor.hasNext();

    client.close();
    callback(data);
  });
};

exports.getOne = (id, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const data = await collection.findOne({ attraction_id: id });

    client.close();
    callback(data);
  });
};

exports.getNear = (query, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(query.lng), parseFloat(query.lat)],
          },
          $maxDistance: parseInt(query.searchRadius),
        },
      },
    });
    await cursor.forEach((doc) => data.push(doc));

    client.close();
    callback(data);
  });
};

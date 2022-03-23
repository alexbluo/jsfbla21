const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.matchAll = (pageNumber, query, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [], nextPage: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection
      .find(query)
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage + 1); // 1 more than needed to test if there is more on next page
    await cursor.forEach((doc) => data.previewData.push(doc));
    // check if there are more attractions on the next page and adjust
    if (data.previewData.length > nPerPage) {
      data.nextPage = parseInt(pageNumber) + 1;
      data.previewData = data.previewData.slice(0, nPerPage);
    }

    client.close();
    callback(data);
  });
};

exports.getAll = (pageNumber, callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [], nextPage: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");
    const cursor = collection
      .find()
      .sort({ attraction_name: 1 })
      .skip(pageNumber * nPerPage)
      .limit(nPerPage + 1); // 1 more than needed to test if there is more on next page
    await cursor.forEach((doc) => data.previewData.push(doc));
    // check if there are more attractions on the next page and adjust
    if (data.previewData.length > nPerPage) {
      data.nextPage = parseInt(pageNumber) + 1;
      data.previewData = data.previewData.slice(0, nPerPage);
    }

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

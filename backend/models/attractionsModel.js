const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.matchAll = (query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find({
        facets: {
          $all: [
            { $elemMatch: { type: "category", val: "Attraction" } },
            { $elemMatch: { type: "region", val: "Weste Maryland" } },
            {
              $elemMatch: {
                $or: [
                  { type: "city", val: "Annapolis" },
                  // { type: "city", val: "Ellicott City" },
                ],
              },
            },
          ],
        },
      })
      .forEach((doc) => data.push(doc));
      console.log(data)
    client.close();
    callback(data);
  });
};

exports.getAll = (callback) => {
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

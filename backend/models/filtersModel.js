const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.getCities = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("filters");

    const filters = await collection.find().next();
    const cities = { city: filters.cities };

    client.close();
    callback(cities);
  });
};

exports.getCategories = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const filters = await collection.distinct("facets");
    const categories = {
      category: filters
        .filter((obj) => obj.type === "category")
        .map((obj) => obj.val),
    };

    client.close();
    callback(categories);
  });
};

exports.getAmenities = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("filters");

    const filters = await collection.find().next();
    const amenities = { amenity: filters.amenities };

    client.close();
    callback(amenities);
  });
};

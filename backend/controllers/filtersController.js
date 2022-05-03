const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.getRegions = (req, res) => {
  res.json({
    region: [
      "Capital Region",
      "Central Maryland",
      "Eastern Shore",
      "Southern Maryland",
      "Western Maryland",
    ],
  });
};

exports.getCities = (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("filters");

    const filters = await collection.find().next();
    const cities = { city: filters.cities };

    client.close();
    res.json(cities);
  });
};

exports.getCategories = (req, res) => {
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
    res.json(categories);
  });
};

exports.getAmenities = (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("filters");

    const filters = await collection.find().next();
    const amenities = { amenity: filters.amenities };

    client.close();
    res.json(amenities);
  });
};

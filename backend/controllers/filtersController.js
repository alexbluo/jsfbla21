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
    res.status(200).json(cities);
  });
};

exports.getCategories = (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const categories = await collection.distinct("category");

    client.close();
    res.status(200).json({ category: categories });
  });
};

exports.getAmenities = (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("filters");

    const filters = await collection.find().next();
    const amenities = { amenities: filters.amenities };

    client.close();
    res.status(200).json(amenities);
  });
};

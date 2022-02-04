const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.getCities = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("facets")
      .find()
      .next();
    const cities = { city: facets.cities };

    client.close();
    callback(cities);
  });
}

exports.getCategories = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("attractions")
      .distinct("facets");
    const categories = {
      category: facets
        .filter((obj) => obj.type === "category")
        .map((obj) => obj.val),
    };

    client.close();
    callback(categories);
  });
}

exports.getAmenities = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("facets")
      .find()
      .next();
    const amenities = { amenity: facets.amenities };

    client.close();
    callback(amenities);
  });
}

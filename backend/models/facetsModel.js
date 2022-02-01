const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.getCities = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("facets")
      .find()
      .next();
    const cities = { cities: facets.cities };

    client.close();
    callback(cities);
  });
}

exports.getTypes = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("attractions")
      .distinct("facets");
    const types = {
      types: facets
        .filter((obj) => obj.type === "category")
        .map((obj) => obj.val),
    };

    client.close();
    callback(types);
  });
}

exports.getAmenities = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const facets = await client
      .db("attractionsDB")
      .collection("facets")
      .find()
      .next();
    const amenities = { amenities: facets.amenities };

    client.close();
    callback(amenities);
  });
}
